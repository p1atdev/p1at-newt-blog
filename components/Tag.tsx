interface Props {
    name: string
    color: string
}

const Tag = ({ name, color }: Props) => {
    // const bgColor = `bg-[${color}]`

    return (
        <div>
            <span className={`mr-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-gray-600`}>{name}</span>
        </div>
    )
}

export default Tag
