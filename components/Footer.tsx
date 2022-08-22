import { Icon } from "@iconify/react"

const Footer = () => {
    return (
        <div className="h-16 px-4">
            <div className="flex h-full gap-x-4 text-gray-400">
                <div className="flex items-center gap-x-1">
                    <a
                        href="https://discordapp.com/users/1000656743547797504"
                        target="__blank"
                        className="flex items-center gap-x-1 hover:underline"
                    >
                        <Icon icon="akar-icons:discord-fill" />
                        <p>Plat#6137</p>
                    </a>
                </div>

                <div className="flex">
                    <a
                        href="https://twitter.com/p1atdev"
                        target="__blank"
                        className="flex items-center gap-x-1 hover:underline"
                    >
                        <Icon icon="akar-icons:twitter-fill" />
                        <p>@p1atdev</p>
                    </a>
                </div>
            </div>
            <div className="mb-4 flex gap-x-4 text-gray-300">
                <p>&copy; Plat 2022</p>
                <a className="cursor-pointer hover:underline">
                    <p className="flex items-center text-gray-500">
                        <span className="pr-1">
                            <Icon icon="akar-icons:github-fill" />
                        </span>
                        Source
                    </p>
                </a>
            </div>
        </div>
    )
}

export default Footer
