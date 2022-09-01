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
            <title>
                {title} | {SITE_TITLE}
            </title>
            <meta property="og:title" content={`${title} | ${SITE_TITLE}`} />

            {image && (
                <>
                    <meta property="og:image" content={image} />
                </>
            )}

            {description && (
                <>
                    <meta name="description" content={description} />
                    <meta property="og:description" content={description} />
                </>
            )}

            <meta property="og:url" content={`${SITE_URL}${path}`} />
        </Head>
    )
}

export default OGPHead
