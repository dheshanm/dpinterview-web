"use client"
// Reference:
// https://ui.shadcn.com/blocks/sidebar
import * as React from "react"
import {
    GalleryVerticalEnd,
    Github,
    LayoutDashboard,
    MessageSquareWarning,
    Video
} from "lucide-react"

import Link from "next/link"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"


export const navData = {
    navMain: [
        {
            title: "Issues",
            icon: MessageSquareWarning,
            url: "/issues",
            isActive: true,
            items: [
                {
                    title: "Multi-Part Interviews",
                    url: "/issues/multiPart",
                    isActive: false,
                },
                {
                    title: "Unlabelled Audio",
                    url: "/issues/unlabelledAudio",
                    isActive: false,
                },
                // {
                //     title: "Missing Interviews",
                //     url: "/issues/missing",
                //     isActive: false,
                // },
                // {
                //     title: "Missing Runsheets",
                //     url: "/issues/noRunsheet",
                //     isActive: false,
                // },
                // {
                //     title: "Missing Transcripts",
                //     url: "/issues/noTranscript",
                //     isActive: false,
                // },
            ],
        },
        {
            title: "Interviews",
            icon: Video,
            url: "/interviews",
            items: [],
        },
    ],
    navSecondary: [
        {
            title: "GitHub",
            url: "https://github.com/dheshanm/dpinterview-web",
            icon: Github,
        },
        {
            title: "Superset",
            url: `${process.env.NEXT_PUBLIC_SUPERSET_ENDPOINT}`,
            icon: LayoutDashboard,
        },
    ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">AV QC Portal</span>
                                    <span className="">v0.1.0</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navData.navMain} />
                <NavSecondary items={navData.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
