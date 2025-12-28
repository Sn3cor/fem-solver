import { quadrature } from "./gauss";
import type { Interval, Elementary } from "./types"

export class Solver {
    private n: number;
    private domain: Interval
    private h: number
    private elements: Interval[]
    private B: number[][]
    private L: number[]
    private elementaryFunctions: Elementary[]
    private elementaryFunctionsDerivative: Elementary[]

    constructor(elementsNumber: number, domain: Interval = [0, 2]) {
        this.n = elementsNumber + 1 // n is number of nodes
        this.domain = domain
        this.h = (this.domain[1] - this.domain[0]) / (this.n - 1)
        this.B = [...Array(this.n)].map(_ => Array(this.n).fill(0))
        this.L = new Array(this.n)
        this.elements = this.initElements()
        this.elementaryFunctions = this.initElemFunctions();
        this.elementaryFunctionsDerivative = this.initDerivatives()
    }

    private e = (index: number): Elementary => {
        return [(x: number) => x / this.h - index + 1, (x: number) => index + 1 - x / this.h]
    }

    private initElements = (): Interval[] => {
        const elements = new Array<Interval>(this.n - 1)
        for (let i = 0; i < this.n - 1; i++) {
            const a = this.domain[0] + i * this.h
            const b = a + this.h
            elements[i] = [a, b]
        }
        return elements
    }

    private initElemFunctions = (): Elementary[] => {
        const E = new Array<Elementary>(this.n)
        const first: Elementary = [(x: number) => 0, (x: number) => 1 - x / this.h]
        const last: Elementary = [(x: number) => (this.n - 1 - x) / this.h, (x: number) => 0]
        E[0] = first
        E[this.n - 1] = last

        for (let i = 1; i < this.n - 1; i++) {
            E[i] = this.e(i)
        }

        return E
    }

    private initDerivatives = (): Elementary[] => {
        const D = new Array<Elementary>(this.n)
        const first: Elementary = [(x: number) => 0, (x: number) => -1 / this.h]
        const last: Elementary = [(x: number) => -1 / this.h, (x: number) => 1 / this.h]
        D[0] = first
        D[this.n - 1] = last

        for (let i = 1; i < this.n - 1; i++) {
            D[i] = [(x: number) => 1 / this.h, (x: number) => -1 / this.h]
        }
        return D
    }

    private evalBMatrix = () => {
        this.B[0][0] = 1

        for (let el = 0; el < this.elements.length; el++) {
            const [a, b] = this.elements[el]


            for (let i = 0; i < 2; i++) {
                const I = el + i
                if (I === 0) continue  // <--- pomijamy Dirichlet
                const ei = this.elementaryFunctions[I][i]
                const dei = this.elementaryFunctionsDerivative[I][i]

                for (let j = 0; j < 2; j++) {
                    const J = el + j
                    if (J === 0) continue  // <--- pomijamy Dirichlet
                    const ej = this.elementaryFunctions[J][j]
                    const dej = this.elementaryFunctionsDerivative[J][j]

                    const toIntegrate = (x: number) => dei(x) * dej(x) - ei(x) * ej(x)
                    const value = quadrature([a, b], toIntegrate)
                    this.B[I][J] += value
                    this.B[J][I] += value
                }

            }
        }

        this.B[this.n - 1][this.n - 1] -= 1
    }

    private evalLMatrix = () => {
        this.L[0] = 0

        for (let el = 0; el < this.elements.length; el++) {
            const [a, b] = this.elements[el]
            for (let i = 0; i < 2; i++) {
                const I = el + i
                if (I === 0) continue  // <--- pomijamy Dirichlet
                const ej = this.elementaryFunctions[I][i]

                const toIntegrate = (x: number) => (Math.sin(x) + x + 1) * ej(x)
                this.L[I] += quadrature([a, b], toIntegrate)


            }
        }
        this.L[this.n - 1] -= 7
    }

    private solve = () => {

    }
}