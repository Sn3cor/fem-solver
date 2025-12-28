import type { ReactNode } from "react"

interface PageProps {
    children?: ReactNode
}
const PageWrapper = ({ children }: PageProps) => {
    return (
        <div className="wrapper">
            <div className="header">
                <h1>Finite Element Method Solver</h1>
                <h3>for material's layers acoustic vibraions</h3>
            </div>
            {children}
            <div className="footer">
                <p>Jakub Krupa</p>
            </div>
        </div>
    )
}

export default PageWrapper 