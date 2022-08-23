import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Static } from "../../utils/static"

interface ExternalLinkProps {
    href: string
    icon: string
    alt: string
}

const ExternalLink = ({ href, icon, alt }: ExternalLinkProps) => {
    return (
        <div className="group relative flex w-6 flex-col items-center justify-evenly">
            <a href={href} target="__blank" className="w-6">
                <Image
                    src={icon}
                    width={20}
                    height={20}
                    alt={alt}
                    className="mx-auto object-contain p-2 opacity-30 brightness-0 grayscale hover:opacity-40"
                />
            </a>
            <div className="scale-80 absolute translate-y-5 rounded-sm bg-slate-100 px-4 py-1 opacity-0 transition-all duration-200 group-hover:translate-y-7 group-hover:scale-100 group-hover:opacity-100">
                <p>{alt}</p>
            </div>
        </div>
    )
}

const externalLinks: ExternalLinkProps[] = [
    {
        href: "https://github.com/p1atdev",
        icon: "https://api.iconify.design/akar-icons/github-fill.svg",
        alt: "GitHub",
    },
    {
        href: "https://twitter.com/p1atdev",
        icon: "https://api.iconify.design/akar-icons/twitter-fill.svg",
        alt: "Twitter",
    },
    {
        href: "https://zenn.dev/platina",
        icon: "https://api.iconify.design/simple-icons/zenn.svg",
        alt: "Zenn",
    },
]

interface SideNavBarListItemProps {
    href: string
    icon: string
    text: string
}

const SideNavBarListItem = ({ href, icon, text }: SideNavBarListItemProps) => {
    const { pathname } = useRouter()

    const focus = pathname === href ? "bg-blue-100 bg-opacity-30" : "text-gray-400"

    return (
        <Link href={href}>
            <a className={`py-4 pl-5 hover:shadow ${focus}`}>
                <p className="text-xl font-semibold">
                    <span className="px-4 text-2xl">{icon}</span>
                    {text}
                </p>
            </a>
        </Link>
    )
}

const SideNavBar = () => {
    return (
        <div className="flex h-full flex-col justify-between py-10">
            <div>
                <div className="flex justify-center">
                    <Link href="/">
                        <a>
                            <div className="m-auto aspect-square rounded-full bg-blue-100 p-1.5 text-[0px] tracking-normal">
                                <Image
                                    src={Static.ProfileURL}
                                    alt="icon"
                                    width={100}
                                    height={100}
                                    className="rounded-full "
                                />
                            </div>
                        </a>
                    </Link>
                </div>
                <h1 className="text-center text-3xl font-bold">Plat Dev</h1>
                <p className="my-2 text-center text-gray-400">Newt 使ったブログ</p>
            </div>

            <div>
                <div className="flex items-center justify-center gap-x-3">
                    {externalLinks.map((link) => {
                        return <ExternalLink key={link.href} {...link} />
                    })}
                </div>
            </div>

            <div>
                <p className="py-2 px-6 text-sm text-gray-500">
                    気ままに生きてます。好きなゲームはアークナイツ。嫌いなものは数学。
                </p>
            </div>

            <div className="mt-auto mb-10 flex flex-col divide-y divide-blue-100">
                <SideNavBarListItem href="/" icon="📖" text="ホーム" />
                <SideNavBarListItem href="/posts" icon="📚" text="記事" />
                <SideNavBarListItem href="/tags" icon="🏷" text="タグ" />
                <SideNavBarListItem href="/links" icon="🔗" text="リンク" />
                <SideNavBarListItem href="/about" icon="🤔" text="私について" />
            </div>
        </div>
    )
}

export default SideNavBar
