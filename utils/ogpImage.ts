import path from "path"
import { promises as fs } from "fs"
import chromium from "chrome-aws-lambda"
import puppeteer from "puppeteer-core"

export const loadHTML = async (htmlPath: string) => {
    const jsonDirectory = path.join(process.cwd(), "asset")

    const fileContents = await fs.readFile(jsonDirectory + htmlPath, "utf8")

    return fileContents
}

export const createOGPImage = async (emoji: string, text: string) => {
    try {
        const browser = await puppeteer.launch({
            headless: chromium.headless,
            args: chromium.args,
            executablePath: await chromium.executablePath,
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

        await page.goto(`${process.env.BLOG_CDN_URL}/ogp.html`)

        await page.waitForNetworkIdle()

        const buffer = await page.screenshot()

        await browser.close()

        return buffer
    } catch (error) {
        console.error(error)
        throw error
    }
}
