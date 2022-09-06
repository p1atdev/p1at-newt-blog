import type { NextApiRequest as Req, NextApiResponse as Res } from "next"
import { gql, GraphQLClient } from "graphql-request"
import { GrassCalendarRes } from "../../types/grass"

const handler = async (req: Req, res: Res) => {
    const endpoint = "https://api.github.com/graphql"
    const query = gql`
        query ($userName: String!) {
            user(login: $userName) {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                            }
                        }
                    }
                }
            }
        }
    `

    const variables = {
        userName: "p1atdev",
    }

    const client = new GraphQLClient(endpoint, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
        },
    })

    try {
        const data: GrassCalendarRes = await client.request(query, variables)

        res.status(200).json({ ...data })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export default handler
