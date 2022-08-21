import "../styles/globals.css"
import "../styles/post.scss"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
