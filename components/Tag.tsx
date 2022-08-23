interface Props {
    name: string
    color: string
}

const Tag = ({ name, color }: Props) => {
    return (
        <div>
            <span
                className={`rounded-full px-2.5 py-0.5 text-zinc-900 text-opacity-60`}
                style={{ backgroundColor: color }}
            >
                {name}
            </span>
        </div>
    )
}

export default Tag
