import { GetStaticPathsContext } from "next"
import TagList from "../../components/TagList"
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
    return (
        <NormalLayout tags={tags}>
            <div>
                <p className="text-2xl font-semibold">タグ一覧</p>

                <p>全てのタグを表示しています</p>

                <div className="my-4">
                    <TagList tags={tags} clickcable={true} />
                </div>
            </div>
        </NormalLayout>
    )
}

export default Page
