import "../styles/globals.css"
import "../styles/post.scss"
import "../styles/prism/github.scss"
import "../styles/linkCard.scss"
import type { AppProps } from "next/app"
import { RecoilRoot } from "recoil"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
    )
}

export default MyApp
