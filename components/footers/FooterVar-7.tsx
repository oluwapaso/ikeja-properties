'use client';

import React, { useEffect, useState } from 'react'
import { FaArrowRightLong, FaFacebook, FaYoutube } from 'react-icons/fa6';
import Image from 'next/image';
import { BsArrowDown, BsArrowRight, BsArrowUp, BsArrowUpRight, BsChevronBarUp, BsClock, BsGear, BsGithub, BsInstagram, BsLinkedin, BsTwitterX, BsWhatsapp } from 'react-icons/bs';
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

const FooterVar7 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

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
                    "name": "FooterVar7",
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
            <footer className='w-full relative'>
                {/* CTA Banner */}
                <div className="bg-amber-700 text-white">
                    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-semibold">Ready to find your perfect home?</h3>
                                <p className="text-amber-100 text-sm mt-1">Our agents are available 7 days a week</p>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-amber-700 bg-transparent">
                                    Call (800) 555-1234
                                </Button>
                                <Button className="bg-white text-amber-700 hover:bg-amber-50">
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer */}
                <div className="bg-[#2c2c2c] text-white">
                    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* About */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <BiBuilding className="h-7 w-7 text-amber-500" />
                                    <div>
                                        <span className="text-lg font-bold">Heritage</span>
                                        <span className="text-amber-500 text-lg font-bold ml-1">Realty</span>
                                    </div>
                                </div>
                                <p className="text-sm text-neutral-400 mb-4">
                                    Trusted by families for over 40 years. We specialize in residential properties,
                                    helping you find not just a house, but a home.
                                </p>
                                <div className="flex items-center gap-2 text-sm text-neutral-400">
                                    <BsClock className="h-4 w-4" />
                                    <span>Mon-Fri 9am-6pm | Sat-Sun 10am-4pm</span>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="font-semibold mb-4 text-amber-500">Quick Links</h4>
                                <ul className="space-y-2">
                                    {[
                                        "Search Properties",
                                        "Featured Listings",
                                        "Mortgage Calculator",
                                        "First-Time Buyers",
                                        "Selling Your Home",
                                        "Market Reports"
                                    ].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Areas We Serve */}
                            <div>
                                <h4 className="font-semibold mb-4 text-amber-500">Areas We Serve</h4>
                                <ul className="space-y-2">
                                    {[
                                        "Downtown District",
                                        "Riverside Heights",
                                        "Oak Valley",
                                        "Lakewood Estates",
                                        "Sunset Hills",
                                        "Pinecrest"
                                    ].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h4 className="font-semibold mb-4 text-amber-500">Contact Us</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-sm text-neutral-400">
                                        <BiMapPin className="h-4 w-4 mt-0.5 shrink-0 text-amber-500" />
                                        <span>789 Main Street, Suite 100<br />Springfield, IL 62701</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-neutral-400">
                                        <PiPhoneIncoming className="h-4 w-4 shrink-0 text-amber-500" />
                                        <span>(800) 555-1234</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-neutral-400">
                                        <CgMail className="h-4 w-4 shrink-0 text-amber-500" />
                                        <span>info@heritagerealty.com</span>
                                    </li>
                                </ul>
                                <div className="flex gap-3 mt-6">
                                    {[FaFacebook, BsTwitterX, BsLinkedin, BsInstagram].map((Icon, i) => (
                                        <Link
                                            key={i}
                                            href="#"
                                            className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
                                        >
                                            <Icon className="h-4 w-4" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-neutral-700">
                        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
                                <p>&copy; 2024 Heritage Realty. Equal Housing Opportunity.</p>
                                <div className="flex gap-4">
                                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                                    <Link href="#" className="hover:text-white transition-colors">Accessibility</Link>
                                    <Link href="#" className="hover:text-white transition-colors">Fair Housing</Link>
                                </div>
                            </div>
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

export default FooterVar7