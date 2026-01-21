import type { ReactNode } from "react"

interface PageProps {
    children?: ReactNode
}
const Wrapper = ({ children }: PageProps) => {
    return (
        <div className="wrapper">
            <div className="header">
                <h1>Visualization for Finite Elements Method</h1>
                <h2>Problem: heat transport equation</h2>
            </div>
            {children}
            <div className="footer">
                <p>Jakub Krupa 2026</p>
            </div>
        </div>
    )
}

export default Wrapper 