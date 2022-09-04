import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts"

export const generateOGPImage = async (emoji: string, text: string) => {
    try {
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

        const html = Deno.readTextFileSync("../asset/ogp.html")
        await page.setContent(html)

        await page.waitForNetworkIdle()

        const buffer = await page.screenshot({ type: "webp", quality: 80 })

        await browser.close()

        return buffer
    } catch (error) {
        console.error(error)
        throw error
    }
}
