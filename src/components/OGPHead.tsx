import Head from "next/head"
import { SITE_TITLE, SITE_URL } from "../pages/_app"

interface Props {
    title: string
    path: string
    description?: string
    image?: string
}

const OGPHead = ({ title, path, description, image }: Props) => {
    return (
        <Head>
            <title>{`${title} | ${SITE_TITLE}`}</title>
            <meta property="og:title" content={`${title} | ${SITE_TITLE}`} key="og:title" />

            {image && (
                <>
                    <meta property="og:image" content={image} key="og:image" />
                </>
            )}

            {description && (
                <>
                    <meta name="description" content={description} key="description" />
                    <meta property="og:description" content={description} key="og:description" />
                </>
            )}

            <meta property="og:url" content={`${SITE_URL}${path}`} key="og:url" />
        </Head>
    )
}

export default OGPHead
