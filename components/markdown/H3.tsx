import { ComponentProps, ReactNode } from "react"

interface Props extends ComponentProps<"h3"> {
    children: ReactNode | ReactNode[]
}

const H3 = ({ children, ...props }: Props) => {
    return <h1 {...props}>{children}</h1>
}

export default H3
