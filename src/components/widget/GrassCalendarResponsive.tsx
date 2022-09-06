import GrassCalendar from "./GrassCalendar"

interface Props {
    /**
     * default
     */
    def?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
}

const GrassCalendarResponsive = ({ def = 6, sm = 2, md = 3, lg = 4, xl = 6 }: Props) => {
    return (
        <div>
            <div className="sm:hidden">
                <GrassCalendar months={def} />
            </div>
            <div className="hidden sm:block md:hidden">
                <GrassCalendar months={sm} />
            </div>
            <div className="hidden md:block lg:hidden">
                <GrassCalendar months={md} />
            </div>
            <div className="hidden lg:block xl:hidden">
                <GrassCalendar months={lg} />
            </div>
            <div className="hidden xl:block">
                <GrassCalendar months={xl} />
            </div>
        </div>
    )
}

export default GrassCalendarResponsive
