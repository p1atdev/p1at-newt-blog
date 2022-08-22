import { ComponentProps, ReactNode } from "react"

interface Props extends ComponentProps<"p"> {
    children: ReactNode | ReactNode[]
}

const P = ({ children, ...props }: Props) => {
    return <p {...props}>{children}</p>
}

export default P
