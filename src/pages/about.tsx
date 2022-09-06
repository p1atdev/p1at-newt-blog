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
            <div className="mb-4">
                <ul className=" list-inside list-disc">
                    <li>ゲーム</li>
                    <li>プログラミング</li>
                    <li>アニメ・漫画</li>
                </ul>
            </div>
            <h2 className="mt-6 mb-3 text-xl font-semibold">ゲーム</h2>
            <div className="mb-4">
                <ul className=" list-inside list-disc">
                    <li>アークナイツ (これのために生きている)</li>
                </ul>
            </div>
            <h2 className="mt-6 mb-3 text-xl font-semibold">好きな言語</h2>
            <div className="mb-4">
                <ul className=" list-inside list-disc">
                    <li>TypeScript (Webと相性が良くて離れられない)</li>
                    <li>Swift (素晴らしい言語なのに、たまにちょっと残念なとこがあって悲しい)</li>
                    <li>Go (書けないけど、低レイヤー通信書く時にめちゃくちゃ便利だったので好き)</li>
                </ul>
            </div>
            <h2 className="mt-6 mb-3 text-xl font-semibold">アニメ・漫画</h2>
            <div className="mb-4">
                <ul className=" list-inside list-disc">
                    <li>ダンジョン飯 (唯一全巻所有していて今も追っている作品。アニメ放送待ち遠しい)</li>
                    <li>NEW GAME! (前はアマプラで見れたのに見れなくなってしまった...悲しい)</li>
                    <li>映像研には手を出すな! (アニメ制作がテーマのアニメ。面白い)</li>
                    <li>桜Trick (最高の百合)</li>
                </ul>
            </div>
            <h2 className="mt-6 mb-3 text-xl font-semibold">好きな音楽</h2>
            <iframe
                className="w-full rounded-md md:w-2/3"
                src="https://open.spotify.com/embed/track/6tUryMdp3vjONBvMX5IrnU?utm_source=generator"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen={true}
            ></iframe>
            夏じゃなくても聴いてる。
        </NormalLayout>
    )
}

export default Page
