import { JSDOM } from "jsdom"
import { rehype } from "rehype"
import rehypeHighlight from "rehype-highlight"

const headingTags = ["h1", "h2", "h3", "h4", "h5", "h6"]

export const reformHTML = async (html: string) => {
    const dom = new JSDOM(`<body>${html}</body>`)

    await reformHeadings(dom)

    await codeBlock(dom)

    await highlight(dom)

    return dom.window.document.querySelector("body")!.innerHTML
}

// TODO: ここをちゃんとTSXのものに入れ替えるようにする
const reformHeadings = async (dom: JSDOM) => {
    for (const tag of headingTags) {
        dom.window.document.querySelectorAll(tag).forEach((heading) => {
            heading.id = heading.innerHTML.replace(/\s/g, "-")
        })
    }
}

// コードブロックの修正をする
const codeBlock = async (dom: JSDOM) => {
    dom.window.document.querySelectorAll("pre code").forEach((code) => {
        console.log("code block", code.className)
        if (code.className && code.className.match(/language-.*:.*/)) {
            const before = code.className.match(/language-.*:.*/)![0]

            // split by first ":"
            const [language, ...rest] = before.split(":")
            const filename = rest.join(":")

            code.className = language
            // code.parentElement?.setAttribute("data-label", filename)
            // const parent = code.parentElement! // pre

            code.insertAdjacentHTML("beforebegin", `<div class="filename">${filename}</div>`)

            // console.log(code.parentElement!.outerHTML)
        }
    })
}

const highlight = async (dom: JSDOM) => {
    dom.window.document.querySelectorAll("pre").forEach(async (code) => {
        const highlighted = await rehype()
            .data("settings", { fragment: true })
            .use(rehypeHighlight)
            .process(code.outerHTML)

        code.outerHTML = highlighted.toString()
    })
}
