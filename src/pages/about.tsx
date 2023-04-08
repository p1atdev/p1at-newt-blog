import { GetStaticPathsContext } from "next"
import NormalLayout from "../layout/NormalLayout"
import { Tag } from "../types/tags"
import { getTags } from "../utils/newt"

interface Props {
    tags?: Tag[]
}

export const getStaticProps = async (ctx: GetStaticPathsContext) => {
    try {
        const tags = await getTags()

        return {
            props: {
                tags: tags,
            },
        }
    } catch (error) {
        console.error(error)

        return {
            props: {},
        }
    }
}

const Page = ({ tags }: Props) => {
    return (
        <NormalLayout tags={tags ?? []}>
            <h1 className="mb-4 text-3xl font-bold">私について</h1>
            <h2 className="mmt-6 mb-3 text-xl font-semibold">プロフィール</h2>
            <div className="mb-4">
                <ul className=" list-inside list-disc">
                    <li>気ままに生きている人</li>
                    <li>飽きっぽい</li>
                    <li>他の情報はどうせ漁ったら出てくると思うのでわざわざ書かない。</li>
                </ul>
            </div>
            <h2 className="mt-6 mb-3 text-xl font-semibold">好きなこと</h2>
            最近は画像生成AIに時間を取られてゲームができない...
            <div className="mb-4">
                <ul className=" list-inside list-disc">
                    <li>ゲーム</li>
                    <li>プログラミング</li>
                    <li>アニメ・漫画</li>
                </ul>
            </div>
            <div>
                <iframe
                    style={{
                        borderRadius: "12px",
                    }}
                    src="https://open.spotify.com/embed/track/2p01X0kABsYx2pNwzeZtzn?utm_source=generator"
                    width="100%"
                    height="152"
                    allowFullScreen={false}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            </div>
        </NormalLayout>
    )
}

export default Page
