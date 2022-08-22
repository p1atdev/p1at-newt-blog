import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

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
        <div className="flex h-full basis-1/5 flex-col justify-between py-10">
            <div>
                <div className="flex justify-center">
                    <div className="m-auto aspect-square rounded-full bg-blue-100 p-1.5 text-[0px] tracking-normal">
                        <Image
                            src="https://avatars.githubusercontent.com/u/60182057"
                            alt="icon"
                            width={100}
                            height={100}
                            className="rounded-full "
                        />
                    </div>
                </div>
                <h1 className="text-center text-3xl font-bold">Plat Dev</h1>
                <p className="my-2 text-center text-gray-400">Newt 使ったブログ</p>
            </div>

            <div>
                <p className="py-2 px-6 text-sm text-gray-500">
                    自己紹介文。するともう鷺は、蛍のように、ほんとうのたった一人の神さまですか青年は笑いながら言いました。
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
