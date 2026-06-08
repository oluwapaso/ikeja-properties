'use client';

import React, { useEffect, useState } from 'react'
import { FaArrowRightLong, FaFacebook, FaYoutube } from 'react-icons/fa6';
import Image from 'next/image';
import { BsArrowDown, BsArrowRight, BsArrowUp, BsArrowUpRight, BsChevronBarUp, BsClock, BsGear, BsGithub, BsInstagram, BsLinkedin, BsTwitterX, BsWhatsapp } from 'react-icons/bs';
import { BiBuilding, BiChat, BiEnvelopeOpen, BiHeart, BiHome, BiLayerPlus, BiMapPin, BiPhone, BiRefresh, BiTrash } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PiPhoneIncoming } from 'react-icons/pi';
import { LiaLinkedin } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import Link from 'next/link';
import CustomLinkMain from '../CustomLink';
import { Button } from '../Button';
import { CgMail } from 'react-icons/cg';

const FooterVar8 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

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
                    "name": "FooterVar8",
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
            <footer className="bg-[#f8f6f3] relative">
                {/* Newsletter */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="py-16 border-b border-stone-200 text-center">
                        <h3 className="text-2xl font-serif text-stone-800">Join Our Community</h3>
                        <p className="mt-2 text-stone-500 text-sm max-w-md mx-auto">
                            Be the first to know about new listings, design inspiration, and exclusive events
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white border-stone-200 flex-1"
                            />
                            <Button className="bg-stone-800 hover:bg-stone-900 text-white">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <BiHeart className="h-5 w-5 text-rose-400" fill="currentColor" />
                                <span className="text-xl font-serif text-stone-800">Maison & Co</span>
                            </div>
                            <p className="mt-4 text-sm text-stone-500 max-w-xs mx-auto md:mx-0">
                                Curating beautiful homes with heart. We believe finding your perfect space should be a joyful journey.
                            </p>
                        </div>

                        {/* Navigation */}
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-xs uppercase tracking-wider text-stone-400 mb-4">Discover</h4>
                                <ul className="space-y-2">
                                    {["Featured Homes", "New Listings", "Open Houses", "Neighborhoods"].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xs uppercase tracking-wider text-stone-400 mb-4">About</h4>
                                <ul className="space-y-2">
                                    {["Our Story", "Our Team", "Testimonials", "Contact"].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Contact & Social */}
                        <div className="flex flex-col items-center md:items-end">
                            <h4 className="text-xs uppercase tracking-wider text-stone-400 mb-4">Get in Touch</h4>
                            <p className="text-sm text-stone-600">(310) 555-0187</p>
                            <p className="text-sm text-stone-600">hello@maisonco.com</p>
                            <p className="text-sm text-stone-500 mt-1">Beverly Hills, CA</p>

                            <div className="flex gap-4 mt-6">
                                {[BsInstagram, BsTwitterX, FaFacebook, CgMail].map((Icon, i) => (
                                    <Link
                                        key={i}
                                        href="#"
                                        className="text-stone-400 hover:text-rose-400 transition-colors"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-stone-200">
                    <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
                            <p>&copy; 2024 Maison & Co. Made with care in California.</p>
                            <div className="flex gap-6">
                                <Link href="#" className="hover:text-stone-600 transition-colors">Privacy</Link>
                                <Link href="#" className="hover:text-stone-600 transition-colors">Terms</Link>
                                <Link href="#" className="hover:text-stone-600 transition-colors">Accessibility</Link>
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

export default FooterVar8