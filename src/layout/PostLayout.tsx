import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import SideNavBar from "../components/sideNavBar/SideNavBar"
import SideNavBarDrawer from "../components/sideNavBar/SideNavBarDrawer"
import SideNabBarToggle from "../components/sideNavBar/SideNavBarToggle"
import TOC from "../components/TOC"
import { Heading } from "../utils/markdown"
import { Static } from "../utils/static"
import Footer from "../components/Footer"

interface Props {
    children: ReactNode | ReactNode[]
    toc: Heading[]
}

const PostLayout = ({ children, toc }: Props) => {
    return (
        <div className="h-screen w-screen">
            <div className="flex h-full w-full flex-col divide-x md:flex-row">
                {/* サイドバー */}
                <div className="hidden shrink-0 basis-1/4 md:block lg:basis-1/5">
                    <SideNavBar />
                </div>

                {/* ドロワー */}
                <div className="h-full w-full justify-end md:hidden">
                    <div className="fixed z-10 max-h-full w-full">
                        <SideNavBarDrawer />
                    </div>
                    <div className="mx-4 mt-2 flex items-center justify-between">
                        <Link href={"/"}>
                            <a>
                                <div className="flex items-center gap-x-2 px-2 pt-4 text-3xl font-bold">
                                    <div className="m-auto h-10 w-10 rounded-full bg-blue-100 p-0.5 text-[0px] tracking-normal">
                                        <Image
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

                <div className="flex grow flex-col divide-y md:overflow-auto lg:flex-row lg:divide-x">
                    {/* 記事 */}
                    <div className="w-full grow py-10 lg:overflow-auto">
                        {children}
                        <Footer />
                    </div>

                    {/* 目次 */}
                    <div className="hidden shrink-0 grow basis-1/4 overflow-scroll py-10 px-6 pt-12 lg:block">
                        <p className="my-8 text-xl font-medium">目次</p>
                        <TOC toc={toc} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostLayout
