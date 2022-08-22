import { ComponentProps, ReactNode } from "react"

interface Props extends ComponentProps<"h2"> {
    children: ReactNode | ReactNode[]
}

const H2 = ({ children, ...props }: Props) => {
    return <h1 {...props}>{children}</h1>
}

export default H2
