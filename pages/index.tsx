import { GetStaticPropsContext } from "next"
import Head from "next/head"
import NextLink from "next/link"
import Image from "next/image"
import PostList from "../components/PostList"
import { Posts } from "../types/posts"
import { getPosts } from "../utils/newt"

interface ExternalLinkProps {
    href: string
    icon: string
    alt: string
}

const ExternalLink = ({ href, icon, alt }: ExternalLinkProps) => {
    return (
        <div className="group relative w-6 items-center">
            <a href={href} target="__blank" className="w-6">
                <Image
                    src={icon}
                    width={24}
                    height={24}
                    alt={alt}
                    className="mx-auto object-contain p-2 opacity-30 brightness-0 grayscale hover:opacity-40"
                />
            </a>
            <div className="absolute hidden rounded-sm bg-slate-100 px-4 py-2 group-hover:block">
                <p>{alt}</p>
            </div>
        </div>
    )
}

const externalLinks: ExternalLinkProps[] = [
    {
        href: "https://github.com/p1atdev",
        icon: "/icons/github.png",
        alt: "GitHub",
    },
    {
        href: "https://twitter.com/p1atdev",
        icon: "/icons/twitter.png",
        alt: "Twitter",
    },
    {
        href: "https://zenn.dev/platina",
        icon: "https://zenn.dev/images/logo-transparent.png",
        alt: "Zenn",
    },
]

interface Props {
    posts?: Posts
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
    try {
        const posts = await getPosts(0, 5)

        return {
            props: {
                posts: posts,
            },
        }
    } catch (error) {
        console.error(error)

        return {
            props: {},
        }
    }
}

const Index = ({ posts }: Props) => {
    if (posts === undefined) {
        return <div>No posts found</div>
    }

    return (
        <div className="mx-auto px-4 sm:max-w-lg md:max-w-xl xl:max-w-2xl">
            <div className="mt-20">
                <div className="flex justify-center ">
                    <div className="m-auto aspect-square rounded-full bg-blue-100 p-1.5 text-[0px] tracking-normal">
                        <Image
                            src="https://avatars.githubusercontent.com/u/60182057"
                            alt="icon"
                            width={120}
                            height={120}
                            className="rounded-full "
                        />
                    </div>
                </div>
                <h1 className="text-center text-3xl font-bold">Plat Dev</h1>
                <p className="my-2 text-center text-gray-400">Newt 使ったブログ</p>
                <div className="flex items-center justify-center gap-x-3">
                    {externalLinks.map((link) => {
                        return <ExternalLink key={link.href} {...link} />
                    })}
                </div>
            </div>
            <hr className="my-8" />
            <div className="mb-1">
                <h2 className=" text-2xl font-semibold">最新記事</h2>
                <div className="flex justify-end">
                    <NextLink href={"/posts"}>
                        <a className="font-medium text-blue-400 hover:underline">全ての記事→</a>
                    </NextLink>
                </div>
            </div>
            <PostList posts={posts.items} />
        </div>
    )
}

export default Index
