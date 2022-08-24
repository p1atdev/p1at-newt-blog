import useSWR from "swr"
import { GrassCalendarRes } from "../types/grass"

export const useGrass = () => {
    const res = useSWR("/api/grass", (url) => fetch(url).then((res) => res.json()))
    const data: GrassCalendarRes = res.data
    const error = res.error

    // console.log(res)

    if (error) {
        return {
            error,
        }
    }

    try {
        const grass = data.user.contributionsCollection.contributionCalendar.weeks

        // console.log(grass)

        return {
            grass: grass,
            error,
        }
    } catch (error) {
        return {
            error,
        }
    }
}
