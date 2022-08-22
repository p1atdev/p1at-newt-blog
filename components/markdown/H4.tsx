import { ComponentProps, ReactNode } from "react"

interface Props extends ComponentProps<"h4"> {
    children: ReactNode | ReactNode[]
}

const H4 = ({ children, ...props }: Props) => {
    return <h1 {...props}>{children}</h1>
}

export default H4
