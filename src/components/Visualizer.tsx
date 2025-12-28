import { useState } from "react"
import { Mafs, Coordinates, Line, Plot } from "mafs"
import Solver from "../../Solver/solver"
import "./Visualize.css"
import type { Elementary, Interval } from "../../Solver/types"

const Visualizer = () => {
    const [input, setInput] = useState<string>("0")
    const [coefficients, setCoefficients] = useState<number[]>([])
    const [h, setH] = useState(0)
    // const [eFunctions, setEFunctions] = useState<Elementary[]>([])
    const [elements, setElements] = useState<Interval[]>([])

    const updatePlot = () => {
        const solver = new Solver(Number(input))
        const { solutionVector, h, elements, eFunctions } = solver.solve()
        setCoefficients(solutionVector)
        setH(h)
        // setEFunctions(eFunctions)
        setElements(elements)
        console.log({ solutionVector, h, elements, eFunctions })
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        updatePlot()
    }
    const getAnalyticSolution = (x: number): number => {
        const cos2 = Math.cos(2);
        const sin2 = Math.sin(2);

        // Rozbicie wzoru na części dla czytelności
        const term1 = -2 * (1 + x);
        const term2 = (4 + x) * Math.cos(x);
        const numerator3 = (6 + 5 * cos2 + 6 * sin2) * Math.sin(x);
        const denominator3 = cos2 - sin2;

        return (term1 + term2 + (numerator3 / denominator3)) / 2;
    };
    return (
        <div className="visualizer">
            <input type="number" onChange={handleInput} />
            <input
                type="button"
                value="Submit"
                onClick={handleClick}
                disabled={input === "0"}
            />
            <div className="graph">
                <Mafs
                    zoom={true}
                >
                    <Coordinates.Cartesian />
                    {elements.map((element, i) => {
                        const x0 = element[0];
                        const x1 = element[1];

                        const y0 = coefficients[i] + x0 + 1;

                        const y1 = coefficients[i + 1] + x1 + 1;
                        return (
                            <Line.Segment
                                key={i}
                                point1={[x0, y0]}
                                point2={[x1, y1]}
                                color="Blue"
                            />
                        )
                    })}

                </Mafs>
            </div>

        </div>
    )
}

export default Visualizer