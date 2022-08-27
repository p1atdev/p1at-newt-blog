import { Icon } from "@iconify/react"
import Link from "next/link"

const Search = () => {
    return (
        <div>
            <Link href={"/search"} passHref>
                <button className="flex w-full items-center rounded-full bg-slate-100 px-3 py-2 text-lg text-slate-700 ring-slate-300 hover:ring">
                    <Icon icon="akar-icons:search" />
                    <p className="w-full px-2 text-left">検索...</p>
                </button>
            </Link>
        </div>
    )
}

export default Search
