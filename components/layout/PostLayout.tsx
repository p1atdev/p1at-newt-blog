import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import SideNavBar from "../sideNavBar/SideNavBar"
import SideNavBarDrawer from "../sideNavBar/SideNavBarDrawer"
import SideNabBarToggle from "../sideNavBar/SideNavBarToggle"
import TOC from "../TOC"
import { Heading } from "../../utils/markdown"
import { Static } from "../../utils/static"

interface Props {
    children: ReactNode | ReactNode[]
    toc: Heading[]
}

const PostLayout = ({ children, toc }: Props) => {
    return (
        <div className=" h-screen w-screen">
            <div className="flex h-full w-full flex-col divide-x md:flex-row">
                <div className="hidden basis-1/4 md:block lg:basis-1/5">
                    <SideNavBar />
                </div>

                <div className="h-screen justify-end md:hidden">
                    <div className="absolute z-50 h-screen">
                        <SideNavBarDrawer />
                    </div>
                    <div className="mx-4 mt-2 flex items-center justify-between">
                        <Link href={"/"}>
                            <a>
                                <div className="flex items-center gap-x-2 px-2 pt-4 text-3xl font-bold">
                                    <div className="m-auto h-10 w-10 rounded-full bg-blue-100 p-0.5 text-[0px] tracking-normal">
                                        {/* <Image */}
                                        <img
                                            src={Static.ProfileURL}
                                            width={36}
                                            height={36}
                                            className="rounded-full"
                                            alt="Plat profile icon"
                                        />
                                    </div>
                                    <p>Plat Dev</p>
                                </div>
                            </a>
                        </Link>
                        <SideNabBarToggle />
                    </div>
                </div>

                <div className="flex grow flex-col divide-y overflow-clip md:overflow-auto lg:flex-row lg:divide-x ">
                    {/* 記事 */}
                    <div className="grow py-10 px-6 lg:overflow-auto">{children}</div>

                    {/* 目次 */}
                    <div className="hidden grow basis-1/4 overflow-scroll py-10 px-6 pt-36 lg:block">
                        <TOC toc={toc} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostLayout
