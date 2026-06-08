'use client';

import React, { useEffect, useState } from 'react'
import { FaArrowRightLong, FaFacebook, FaYoutube } from 'react-icons/fa6';
import Image from 'next/image';
import { BsArrowDown, BsArrowRight, BsArrowUp, BsChevronBarUp, BsGear, BsGithub, BsInstagram, BsLinkedin, BsTwitterX, BsWhatsapp } from 'react-icons/bs';
import { BiBuilding, BiChat, BiEnvelopeOpen, BiHome, BiLayerPlus, BiMapPin, BiPhone, BiRefresh, BiTrash } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PiPhoneIncoming } from 'react-icons/pi';
import { LiaLinkedin } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import Link from 'next/link';
import CustomLinkMain from '../CustomLink';
import { Button } from '../Button';
import { CgMail } from 'react-icons/cg';

const FooterVar5 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

    const theme = useSelector((state: RootState) => state.theme);
    const user = useSelector((state: RootState) => state.user);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const brker_info = useSelector((state: RootState) => state.broker);
    const [showButtons, setShowButtons] = useState(false);
    const [sectionHover, setSectionHover] = useState<boolean>(false);

    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSettingsClick = () => {
        // Send a message to the parent window
        window.parent.postMessage(
            {
                type: 'OPEN_EDITOR_SETTINGS',
                data: {
                    "category": "footer",
                    "type": "section",
                    "name": "FooterVar5",
                }
            },
            '*' // In production, replace '*' with your parent URL for security
        );
    };

    const handleMoveClick = (direction: string) => {
        // Send a message to the parent window
        window.parent.postMessage(
            {
                type: 'MOVE_SECTION',
                direction: direction,
                component_index: raw_data?.component_index
            },
            '*' // In production, replace '*' with your parent URL for security
        );
    }

    const handleCompPickerClick = (event_type: string) => {
        // Send a message to the parent window
        window.parent.postMessage(
            {
                type: event_type,
                component_index: raw_data?.component_index,
                component_type: "Footer"
            },
            '*' // In production, replace '*' with your parent URL for security
        );
    }

    const handleHover = () => {
        setSectionHover(true);
    }

    const handleMouseExist = () => {
        setSectionHover(false);
    }


    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > 750) {
                setShowButtons(true);
            } else {
                setShowButtons(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }

    }, []);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);


    if (themeSett) {

        return (
            <footer className="bg-[#0f172a] text-white relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Newsletter Section */}
                    <div className="py-12 border-b border-white/10">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-semibold">Stay Updated</h3>
                                <p className="mt-1 text-white/60 text-sm">Get the latest listings and market insights</p>
                            </div>
                            <div className="flex w-full md:w-auto gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-w-[280px]"
                                />
                                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                    Subscribe
                                    <BsArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="py-12 grid grid-cols-2 md:grid-cols-6 gap-8">
                        {/* Brand */}
                        <div className="col-span-2">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                                    <BiHome className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-bold">NexHome</span>
                            </div>
                            <p className="mt-4 text-sm text-white/60 max-w-xs">
                                Modern real estate solutions powered by technology. Find, buy, or sell properties with confidence.
                            </p>
                            <div className="flex gap-3 mt-6">
                                {[FaFacebook, BsInstagram, FaYoutube, BsLinkedin].map((Icon, i) => (
                                    <Link
                                        key={i}
                                        href="#"
                                        className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Buy */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Buy</h4>
                            <ul className="space-y-2.5">
                                {["Homes for Sale", "New Construction", "Foreclosures", "Open Houses", "Coming Soon"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-white/60 hover:text-emerald-400 transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sell */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Sell</h4>
                            <ul className="space-y-2.5">
                                {["Home Value", "List Your Home", "Seller&apos;s Guide", "Compare Agents", "Staging Tips"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-white/60 hover:text-emerald-400 transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Rent */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Rent</h4>
                            <ul className="space-y-2.5">
                                {["Apartments", "Houses", "Condos", "Pet Friendly", "Luxury Rentals"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-white/60 hover:text-emerald-400 transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Company</h4>
                            <ul className="space-y-2.5">
                                {["About Us", "Careers", "Press", "Blog", "Contact"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-white/60 hover:text-emerald-400 transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-white/40">
                            &copy; 2024 NexHome Inc. All rights reserved. Licensed in all 50 states.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["Privacy", "Terms", "Sitemap", "Accessibility", "Fair Housing"].map((item) => (
                                <Link key={item} href="#" className="text-xs text-white/40 hover:text-white transition-colors">
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {is_theme && (
                    <div className='absolute z-[1000] right-1.5 top-2.5 space-x-2 flex items-center justify-end 
                    *:bg-gray-800 *:text-white *:flex *:items-center *:justify-center *:p-2 *:rounded *:cursor-pointer'>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={handleSettingsClick} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BsGear size={17} />
                            <span className='absolute hidden right-0 group-hover:inline-block whitespace-nowrap bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                                text-white text-xs'>
                                Footer Settings
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={() => handleCompPickerClick("REPLACE_FOOTER")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BiRefresh size={17} />

                            <span className='absolute hidden right-0 group-hover:inline-block whitespace-nowrap bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                            text-white text-xs'>
                                Replace Footer
                            </span>
                        </div>
                    </div>
                )}
            </footer>
        )

    }
}

export default FooterVar5