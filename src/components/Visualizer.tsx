import { useState } from "react"
import { Mafs, Coordinates, Line, Plot, Theme } from "mafs"
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
                                color={Theme.violet}
                            />
                        )
                    })}

                </Mafs>
            </div>

        </div>
    )
}

export default Visualizer