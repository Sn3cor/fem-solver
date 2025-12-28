import type { ReactNode } from "react"

interface PageProps {
    children?: ReactNode
}
const Wrapper = ({ children }: PageProps) => {
    return (
        <div className="wrapper">
            <div className="header">
                <h1>Visualization for Finite Elements Method</h1>
                <h2>Problem: material layers acoustic vibrations</h2>
            </div>
            {children}
            <div className="footer">
                <p>Jakub Krupa</p>
            </div>
        </div>
    )
}

export default Wrapper 