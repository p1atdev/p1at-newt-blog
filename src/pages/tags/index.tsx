import { GetStaticPathsContext } from "next"
import NormalLayout from "../../layout/NormalLayout"
import { Tag } from "../../types/tags"
import { getTags } from "../../utils/newt"

interface Props {
    tags: Tag[]
}

export const getStaticProps = async (ctx: GetStaticPathsContext) => {
    try {
        const tags = await getTags()

        return {
            props: {
                tags: tags || [],
            },
        }
    } catch {
        return {
            props: {},
        }
    }
}

const Page = ({ tags }: Props) => {
    return <NormalLayout tags={tags}>hi</NormalLayout>
}

export default Page
