import type { ReactNode } from "react"
import { AiFillGithub, AiFillFilePdf } from "react-icons/ai"
import "./Wrapper.css"
interface PageProps {
    children?: ReactNode
}
const Wrapper = ({ children }: PageProps) => {
    return (
        <div className="wrapper">
            <div className="header">
                <h1>Visualization for Finite Elements Method</h1>
                <div className="flex">
                    <h2>Problem: heat transport equation </h2>
                    <a href="./" target="blank" ><AiFillFilePdf size={30} /></a>
                </div>

            </div>
            {children}
            <div className="footer flex">
                <p>Jakub Krupa 2026 </p>
                <a href="https://github.com/Sn3cor/fem-solver/tree/main" target="blank"><AiFillGithub size={30} /></a>
            </div>
        </div>
    )
}

export default Wrapper 