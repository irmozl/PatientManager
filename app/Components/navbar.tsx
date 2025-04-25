"use client"

import { useTheme } from "next-themes"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "../toogle-mode"
import { FaUserDoctor } from "react-icons/fa6"
import { FaPlus } from "react-icons/fa"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoClose } from "react-icons/io5"
import SearchInput from "./search-input"
import AddPatient from "./add-patient"

function Navbar() {
    const { theme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const bgColor = theme === "dark" ? "bg-gray-900 border-b border-gray-700 text-white" : "bg-white border-b text-black"

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
      
    return (
        <nav className={`w-full ${bgColor} px-6 py-4 flex justify-between items-center relative z-50`}>
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="size-11 rounded-lg flex items-center justify-center">
                    <FaUserDoctor className="text-xl text-primary" />
                </div>
                <h1 className="font-semibold md:text-2xl text-sm">
                    Patient <span className="font-normal">Manager</span>
                </h1>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-4">
                <SearchInput />
                <ModeToggle />
                <Button className="h-9" onClick={openModal} >
                    <FaPlus className="text-lg mr-2" />
                    <span>New Patient</span>
                </Button>
                {/* <AddPatient isOpen={isModalOpen} onClose={closeModal} /> */}
            </div>
            

            {/* Mobile hamburger */}
            <button onClick={() => { setIsMenuOpen(!isMenuOpen); setIsModalOpen(false); }} className="md:hidden text-2xl z-50">
                {isMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
            </button>

            {/* Mobile dropdown */}
            <div
                className={`absolute top-full left-0 w-full ${bgColor} flex-col items-start gap-4 px-6 py-4 transition-all duration-300 ease-in-out shadow-md border-t md:hidden ${
                    isMenuOpen ? "flex" : "hidden"
                }`}
            >
                <div className="flex items-center gap-4 w-full">
                    <SearchInput />
                    <ModeToggle />
                    <Button className="h-9 justify-center" onClick={openModal} >
                        <FaPlus className="text-lg mr-2" />
                        <span>New Patient</span>
                    </Button>
                    {/* <AddPatient isOpen={isModalOpen} onClose={closeModal} /> */}
                </div>
            </div>

            <AddPatient isOpen={isModalOpen} onClose={closeModal} />
        </nav>
    )
}

export default Navbar