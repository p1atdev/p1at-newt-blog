import Tag from "./Tag"

interface TagItem {
    _id: string
    name: string
    color: string
}

interface Props {
    tags: TagItem[]
}

const Tags = ({ tags }: Props) => {
    return (
        <div className="flex pt-2 text-sm">
            {tags.map((tag) => {
                return <Tag key={tag._id} name={tag.name} color={tag.color} />
            })}
        </div>
    )
}

export default Tags
