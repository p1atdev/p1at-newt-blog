import { ComponentProps, ReactNode } from "react"

interface Props extends ComponentProps<"h1"> {
    children: ReactNode | ReactNode[]
}

const H1 = ({ children, ...props }: Props) => {
    return <h1 {...props}>{children}</h1>
}

export default H1
