import "../styles/globals.css"
import "../styles/post.scss"
import "../styles/prism/github.scss"
import "../styles/linkCard.scss"
import type { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import Head from "next/head"

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.p1at.dev"
export const SITE_TITLE = "Plat Dev Blog"
const metaDescription =
    "Plat のブログ。プログラミングのメモなどの技術的な記事や、いろいろなことについて書いていきます。"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{SITE_TITLE}</title>
                <meta name="description" content={metaDescription} />

                <meta property="og:url" content={SITE_URL} />
                <meta property="og:title" content={SITE_TITLE} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={`${SITE_URL}/ogp_image.png`} />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@p1atdev" />
                <meta name="twitter:creator" content="@p1atdev" />
            </Head>
            <Component {...pageProps} />
        </RecoilRoot>
    )
}

export default MyApp
