import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import SideNavBar from "../components/sideNavBar/SideNavBar"
import SideNavBarDrawer from "../components/sideNavBar/SideNavBarDrawer"
import SideNabBarToggle from "../components/sideNavBar/SideNavBarToggle"
import { Static } from "../utils/static"
import Footer from "../components/Footer"
import { Tag } from "../types/tags"
import TagList from "../components/TagList"
import GrassCalendarResponsive from "../components/widget/GrassCalendarResponsive"
import Donate from "../components/widget/Donate"
import Search from "../components/widget/Search"

interface Props {
    children: ReactNode | ReactNode[]
    tags: Tag[]
}

const NormalLayout = ({ children, tags }: Props) => {
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

                {/* 右の領域 */}
                <div className="flex grow flex-col divide-y md:overflow-auto lg:flex-row lg:divide-x ">
                    <div className="grow  divide-y lg:overflow-auto">
                        <div className="py-10 px-6">{children}</div>

                        <div className="hidden lg:block">
                            <Footer />
                        </div>
                    </div>

                    {/* タグとか色々 */}
                    <div className="flex shrink-0 basis-1/3 flex-col gap-y-2 py-10 px-6 lg:overflow-auto">
                        <div>
                            {/* <p className="py-2 text-2xl font-semibold">検索</p> */}
                            <Search />
                        </div>
                        <div className="">
                            <div className="flex items-baseline justify-between">
                                <p className="py-2 text-2xl font-semibold">タグ一覧</p>
                                <Link href={"/tags"}>
                                    <a>
                                        <p className="text-blue-400 hover:underline">全てのタグを見る</p>
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <TagList tags={tags.slice(0, 20)} clickcable={true} />
                            </div>
                        </div>
                        <div>
                            <p className="py-2 text-2xl font-semibold">ガーデニング</p>
                            <GrassCalendarResponsive def={5} sm={8} md={8} lg={4} xl={5} />
                        </div>

                        <div>
                            <p className="py-2 text-2xl font-semibold">支援</p>
                            <Donate />
                        </div>
                    </div>

                    <div className="block lg:hidden">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NormalLayout
