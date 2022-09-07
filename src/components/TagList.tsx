import Link from "next/link"
import Tag from "./Tag"

interface TagItem {
    _id: string
    name: string
    color: string
}

interface Props {
    tags: TagItem[]
    clickcable: boolean
}

const TagList = ({ tags, clickcable }: Props) => {
    return (
        <div className="flex flex-wrap gap-x-2 gap-y-3 pt-2 text-sm">
            {tags.map((tag) => {
                return clickcable ? (
                    <Link key={tag._id} href={`/tags/${tag._id}`}>
                        <a className="hover:underline">
                            <Tag name={tag.name} color={tag.color} />
                        </a>
                    </Link>
                ) : (
                    <Tag name={tag.name} color={tag.color} />
                )
            })}
        </div>
    )
}

export default TagList
