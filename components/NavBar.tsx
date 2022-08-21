import NextLink from "next/link"

interface LinkProps {
    href: string
    title: string
}

const Link = ({ href, title }: LinkProps) => {
    return (
        <NextLink href={href}>
            <a className="rounded-full border border-transparent py-2 px-5 hover:border-gray-200 hover:shadow-sm">
                {title}
            </a>
        </NextLink>
    )
}

const NavBar = () => {
    return (
        <div className="flex h-16 items-center justify-around font-medium text-gray-500">
            <Link href="/" title="Top" />

            <Link href="/posts" title="Posts" />

            <Link href="#" title="Hoge" />
        </div>
    )
}

export default NavBar
