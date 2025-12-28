import { useState } from "react"
import { Mafs, Coordinates, Point } from "mafs"
const Visualizer = () => {
    const [input, setInput] = useState<string>("0")

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
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
            <div className="graph" style={{ width: 650, height: 650 }}>
                <Mafs
                    width={600}
                    height={600}
                    zoom={true}
                >
                    <Coordinates.Cartesian />
                    <Point x={1} y={1} />

                </Mafs>
            </div>

        </div>
    )
}

export default Visualizer