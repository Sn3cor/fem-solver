import { quadrature } from "./gauss";
import type { Interval, Elementary } from "./types"
import { lusolve } from "mathjs";

export class Solver {
    private n: number;
    private domain: Interval
    private h: number
    private elements: Interval[]
    private B: number[][]
    private L: number[]
    private elementaryFunctions: Elementary[]

    constructor(elementsNumber: number, domain: Interval = [0, 2]) {
        this.n = elementsNumber + 1 // n is number of nodes
        this.domain = domain
        this.h = (this.domain[1] - this.domain[0]) / (this.n - 1)
        this.B = [...Array(this.n)].map(_ => Array(this.n).fill(0))
        this.L = new Array(this.n).fill(0)
        this.elements = this.initElements()
        this.elementaryFunctions = Array.from({ length: this.n }, () => [(_: number) => 0, (_: number) => 0]);

        this.evalBMatrix()
        this.evalLMatrix()
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

    private evalBMatrix = (): void => {
        this.B[0][0] = 1

        this.elements.forEach(([a, b], idx) => {
            const e = [
                (x: number) => (b - x) / this.h,
                (x: number) => (x - a) / this.h
            ]
            const de = [
                (_: number) => -1 / this.h,
                (_: number) => 1 / this.h
            ]
            this.elementaryFunctions[idx][1] = e[0]
            this.elementaryFunctions[idx + 1][0] = e[1]

            for (let i = 0; i < 2; i++) {
                const I = idx + i
                if (I == 0) continue //Dirichlet
                for (let j = 0; j < 2; j++) {
                    const J = idx + j
                    if (J == 0) continue //Dirichlet
                    const toIntegrate = (x: number) => de[i](x) * de[j](x) - e[i](x) * e[j](x)
                    this.B[I][J] += quadrature([a, b], toIntegrate)
                }
            }
        })

        this.B[this.n - 1][this.n - 1] -= 1

    }

    private evalLMatrix = (): void => {
        this.L[0] = 0

        this.elements.forEach(([a, b], idx) => {
            const e = [
                (x: number) => (b - x) / this.h,
                (x: number) => (x - a) / this.h
            ]

            for (let i = 0; i < 2; i++) {
                const I = idx + i
                if (I === 0) continue
                const toIntegrate = (x: number) => (Math.sin(x) + x + 1) * e[i](x)
                this.L[I] += quadrature([a, b], toIntegrate)
            }


        })
        this.L[this.n - 1] += 7
    }

    public solve = () => {
        console.log(this.B)
        console.log(this.L)
        const matrix = lusolve(this.B, this.L) as number[][]
        const solution = matrix.map(row => row[0])
        return {
            solutionVector: solution,
            h: this.h,
            elements: this.elements,
            eFunctions: this.elementaryFunctions
        }

    }
}
export default Solver