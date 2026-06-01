"use client"

import { useState, useEffect } from "react"
import { BiMenu, BiX } from "react-icons/bi"
import { BsArrowRight } from "react-icons/bs"

const NavVar3 = ({ transparent = true, is_theme = false, raw_data = {} }: { transparent: boolean, is_theme?: boolean, raw_data?: any }) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={`fixed z-50 transition-all duration-500 ease-out ${isScrolled
                ? "top-4 left-4 right-4 bg-white rounded-2xl shadow-xl py-3 px-6"
                : "top-0 left-0 right-0 bg-transparent py-6 px-8"
                }`}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    <div
                        className={`font-black text-2xl transition-colors duration-500 ${isScrolled ? "text-violet-600" : "text-white"
                            }`}
                    >
                        Cube<span className={isScrolled ? "text-gray-900" : "text-violet-300"}>.</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-1">
                        {["Features", "Pricing", "Resources", "Enterprise"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${isScrolled
                                    ? "text-gray-600 hover:text-violet-600 hover:bg-violet-50"
                                    : "text-white/80 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-3">
                        <button
                            className={`px-4 py-2 font-medium transition-all duration-300 ${isScrolled ? "text-gray-600 hover:text-violet-600" : "text-white"
                                }`}
                        >
                            Log in
                        </button>
                        <button
                            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 group ${isScrolled
                                ? "bg-violet-600 text-white hover:bg-violet-700"
                                : "bg-white text-violet-600 hover:bg-violet-50"
                                }`}
                        >
                            <span>Get Started</span>
                            <BsArrowRight
                                size={16}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </button>
                    </div>

                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <BiX className={isScrolled ? "text-gray-900" : "text-white"} size={24} />
                        ) : (
                            <BiMenu className={isScrolled ? "text-gray-900" : "text-white"} size={24} />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavVar3