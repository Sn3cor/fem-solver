import { quadrature } from "./gauss";
import type { Interval, Elementary } from "./types"
import { lusolve } from "mathjs";
import { luSolve } from "./matrix-math";

export class Solver {
    private n: number;
    private domain: Interval
    private h: number
    private elements: Interval[]
    private B: number[][]
    private L: number[]
    private k: (x: number) => number
    private elementaryFunctions: Elementary[]

    constructor(elementsNumber: number, domain: Interval = [0, 2]) {
        this.n = elementsNumber + 1 // n is number of nodes
        this.domain = domain
        this.h = (this.domain[1] - this.domain[0]) / (this.n - 1)
        this.B = [...Array(this.n)].map(_ => Array(this.n).fill(0))
        this.L = new Array(this.n).fill(0)
        this.elements = this.initElements()
        this.k = (x: number) => x > 1 ? 2 : 1
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
        this.B[this.n - 1][this.n - 1] = 1

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
                if (I == this.n - 1) continue // Dirichlet
                for (let j = 0; j < 2; j++) {
                    const J = idx + j
                    if (J == this.n - 1) continue // Dirichlet
                    const toIntegrate = (x: number) => this.k(x) * de[i](x) * de[j](x)
                    this.B[I][J] += quadrature([a, b], toIntegrate)
                }
            }
        })

        this.B[0][0] -= 1

    }

    private evalLMatrix = (): void => {
        this.L.fill(0)
        this.L[this.n - 1] = 0 // Dirichlet 
        this.elements.forEach(([a, b], idx) => {
            const de = [
                (_: number) => -1 / this.h,
                (_: number) => 1 / this.h
            ]

            for (let i = 0; i < 2; i++) {
                const I = idx + i
                if (I == this.n - 1) continue // Dirichlet
                const toIntegrate = (x: number) => this.k(x) * de[i](x)
                this.L[I] -= quadrature([a, b], toIntegrate)
            }

        })
        this.L[0] -= 19 // Robin
    }

    public solve = () => {
        console.log(this.B)
        console.log(this.L)
        const matrix = lusolve(this.B, this.L) as number[][]
        const solution = matrix.map(row => row[0])
        // const testMatrix = [
        //     [1, 2, 4],
        //     [3, 8, 14],
        //     [2, 6, 13]
        // ];
        // const testVector = [7, 25, 21];
        // console.log(lusolve(testMatrix, testVector))
        // const solution = luSolve(this.B, this.L)
        return {
            solutionVector: solution,
            h: this.h,
            elements: this.elements,
            eFunctions: this.elementaryFunctions
        }

    }
}
export default Solver