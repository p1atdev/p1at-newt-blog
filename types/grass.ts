export interface GrassCalendarRes {
    user: User
}

export interface User {
    contributionsCollection: ContributionsCollection
}

export interface ContributionsCollection {
    contributionCalendar: ContributionCalendar
}

export interface ContributionCalendar {
    totalContributions: number
    weeks: Week[]
}

export interface Week {
    contributionDays: ContributionDay[]
}

export interface ContributionDay {
    contributionCount: number
    date: string
}
