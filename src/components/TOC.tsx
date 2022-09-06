import Link from "next/link"
import { Heading } from "../utils/markdown"

interface Props {
    toc: Heading[]
}

const TOC = ({ toc }: Props) => {
    const space = (level: number) => {
        switch (level) {
            case 1: {
                return ""
            }
            case 2: {
                return "ml-4"
            }
            case 3: {
                return "ml-8"
            }
            default: {
                return ""
            }
        }
    }

    return (
        <ul className="flex flex-col gap-y-2">
            {toc.map((heading, index) => {
                return (
                    <li key={`${heading.id}${index}`} className="my-0.5 px-1">
                        <Link href={`#${heading.id}`} key={index}>
                            <a className="py-1">
                                <p
                                    className={`${space(
                                        heading.level
                                    )} text-gray-700 text-opacity-50  hover:font-semibold hover:text-opacity-75`}
                                >
                                    {heading.text}
                                </p>
                            </a>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default TOC
