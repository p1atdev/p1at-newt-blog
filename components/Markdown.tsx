import { JSDOM } from "jsdom"

interface Props {
    html: string
}

// TODO: いつか、Reactでマークダウンを処理するようにしたい。今は私にはできない。
const Markdown = ({ html }: Props) => {
    return <div>markdown {html}</div>
}

export default Markdown
