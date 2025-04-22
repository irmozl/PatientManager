"use client"

import { useTheme } from "next-themes"
import { ModeToggle } from "../toogle-mode"
import { Button } from "@/components/ui/button"
import { FaUserDoctor } from "react-icons/fa6"
import { FaPlus } from "react-icons/fa"
import SearchInput from "./search-input"

function Navbar() {
    const {theme} = useTheme()
    const bgColor = theme === "dark" ? "bg-gray-900 border-b" : "bg-white"

    return(
        <div className={`relative w-full h-[94px] ${bgColor} overflow-hidden flex justify-between items-center px-6`}>
            <header className="flex items-center gap-2 left-10 top-8">
                <div className="size-11 rounded-lg bg-primary flex items-center justify-center">
                    <FaUserDoctor className="text-secondary  text-xl" />
                </div>
                <h1 className="font-semibold text-2xl">
                    Patient <span className="font-normal" >Manager</span>
                </h1>
            </header>

            <SearchInput/>

            <div className="flex items-center gap-3">
                <ModeToggle />
                <Button className="h-9">
                    <FaPlus className="text-lg" />
                    <span>New Patient</span>
                </Button>

            </div>

        </div>
    )
}

export default Navbar