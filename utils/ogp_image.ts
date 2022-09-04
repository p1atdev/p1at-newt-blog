import path from "path"
import { promises as fs } from "fs"
import puppeteer from "puppeteer"

export const loadHTML = async (htmlPath: string) => {
    const jsonDirectory = path.join(process.cwd(), "asset")

    const fileContents = await fs.readFile(jsonDirectory + htmlPath, "utf8")

    return fileContents
}

export const createOGPImage = async (emoji: string, text: string) => {
    const browser = await puppeteer.launch({
        headless: true,
    })
    const page = await browser.newPage()
    await page.setViewport({
        width: 1200,
        height: 630,
        deviceScaleFactor: 1,
    })

    const injectedProps = {
        emoji: emoji,
        title: text,
    }
    await page.exposeFunction("getInjectedProps", () => injectedProps)

    const html = await loadHTML("/ogp.html")
    await page.setContent(html)

    const buffer = await page.screenshot()

    await browser.close()

    return buffer
}
