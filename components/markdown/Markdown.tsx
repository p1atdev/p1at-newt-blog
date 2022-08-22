import { JSDOM } from "jsdom"
import { ReactNode } from "react"
import H1 from "./H1"
import H2 from "./H2"
import H3 from "./H3"
import H4 from "./H4"
import P from "./Paragraph"

export const createMarkdown = async (html: string) => {
    const dom = new JSDOM(`<body>${html}</body>`)

    const children = await createNode(dom.window.document.body)

    return <Markdown>{children}</Markdown>
}

const createNode = async (element: Element) => {
    const children = await Promise.all(
        Array.from(element.children).map(async (child) => {
            console.log(child)
            if (child !== null || child !== undefined) {
                switch (child.tagName) {
                    case "h1": {
                        return <H1>{await createNode(child)}</H1>
                    }
                    case "h2": {
                        return <H2>{await createNode(child)}</H2>
                    }
                    case "h3": {
                        return <H3>{await createNode(child)}</H3>
                    }
                    case "h4": {
                        return <H4>{await createNode(child)}</H4>
                    }
                    case "p": {
                        return <P>{await createNode(child)}</P>
                    }
                    default: {
                        return null
                    }
                }
            } else {
                return null
            }
        })
    )

    return children
}

interface Props {
    children: ReactNode | ReactNode[]
}

const Markdown = ({ children }: Props) => {
    return <div>{children}</div>
}
