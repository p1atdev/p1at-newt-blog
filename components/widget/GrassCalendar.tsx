import { differenceInCalendarWeeks, format, parse, subMonths } from "date-fns"
import { ComponentProps, useEffect, useState } from "react"
import { useGrass } from "../../hooks/useGrass"
import { Week } from "../../types/grass"

interface Props {
    months: number
}

const GrassCalendar = ({ months = 6 }: Props) => {
    const { grass, error } = useGrass()
    const [weeks, setWeeks] = useState<Week[]>([])

    useEffect(() => {
        if (grass) {
            const startDate = subMonths(new Date(), months)
            const diffWeeks = differenceInCalendarWeeks(new Date(), startDate)
            setWeeks(grass.slice(grass.length - diffWeeks, grass.length))
        }
    }, [grass, months])

    return (
        <div>
            {error && <div>植栽中...🌿🌿🌿</div>}
            <div className="flex gap-x-1">
                {weeks &&
                    weeks.map((week, index) => {
                        return (
                            <div key={`week:${index}`} className="flex flex-col gap-y-1">
                                {week.contributionDays.map((day) => {
                                    return <GrassTile key={day.date} count={day.contributionCount} />
                                })}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

interface GrassTileProps extends ComponentProps<"div"> {
    count: number
    colorSet?: Map<number, string>
}

const defaultColorSet = new Map([
    [0, "#e4f2e4"],
    [1, "#a5e68b"],
    [2, "#60cf64"],
    [4, "#37c94a"],
    [8, "#24904c"],
])

const GrassTile = ({ count, colorSet = defaultColorSet }: GrassTileProps) => {
    const [color, setColor] = useState<string>("#f5f5f5")

    useEffect(() => {
        colorSet.forEach((value, key) => {
            if (count >= key) {
                setColor(value)
            }
        })
    }, [count])

    return (
        <div>
            <div
                className="h-3 w-3 rounded-sm"
                style={{
                    backgroundColor: color,
                }}
            ></div>
        </div>
    )
}

export default GrassCalendar
