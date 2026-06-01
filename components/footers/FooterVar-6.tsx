'use client';

import React, { useEffect, useState } from 'react'
import { FaArrowRightLong, FaFacebook, FaYoutube } from 'react-icons/fa6';
import Image from 'next/image';
import { BsArrowRight, BsArrowUpRight, BsChevronBarUp, BsGear, BsGithub, BsInstagram, BsLinkedin, BsTwitterX, BsWhatsapp } from 'react-icons/bs';
import { BiBuilding, BiChat, BiEnvelopeOpen, BiHome, BiMapPin, BiPhone } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PiPhoneIncoming } from 'react-icons/pi';
import { LiaLinkedin } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import Link from 'next/link';
import CustomLinkMain from '../CustomLink';
import { Button } from '../Button';
import { CgMail } from 'react-icons/cg';

const FooterVar6 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

    const theme = useSelector((state: RootState) => state.theme);
    const user = useSelector((state: RootState) => state.user);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const brker_info = useSelector((state: RootState) => state.broker);
    const [showButtons, setShowButtons] = useState(false);

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
                    "name": "FooterVar1",
                }
            },
            '*' // In production, replace '*' with your parent URL for security
        );
    };

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
            <footer className="bg-white border-t border-neutral-200 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Main Content */}
                    <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
                        {/* Brand and Contact */}
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <h2 className="text-2xl font-medium tracking-tight text-neutral-900">HAVEN</h2>
                                <p className="mt-1 text-sm text-neutral-500">Real Estate</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-neutral-600">
                                    <BiMapPin className="h-4 w-4" />
                                    <span className="text-sm">456 Market Street, San Francisco, CA 94102</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-600">
                                    <BiPhone className="h-4 w-4" />
                                    <span className="text-sm">(415) 555-0123</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-600">
                                    <CgMail className="h-4 w-4" />
                                    <span className="text-sm">hello@haven.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="lg:col-span-7">
                            <div className="grid grid-cols-3 gap-8">
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">Explore</h4>
                                    <ul className="space-y-3">
                                        {["Buy", "Sell", "Rent", "Estimate"].map((item) => (
                                            <li key={item}>
                                                <Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">Company</h4>
                                    <ul className="space-y-3">
                                        {["About", "Team", "Careers", "Press"].map((item) => (
                                            <li key={item}>
                                                <Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">Connect</h4>
                                    <ul className="space-y-3">
                                        {["Instagram", "LinkedIn", "Twitter", "Facebook"].map((item) => (
                                            <li key={item}>
                                                <Link href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors inline-flex items-center gap-1">
                                                    {item}
                                                    <BsArrowUpRight className="h-3 w-3" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="py-6 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-neutral-400">
                            &copy; 2024 Haven Real Estate. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href="#" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>

                {is_theme && (
                    <div id='editor_settings' className='absolute z-[1000] right-1.5 top-1.5 bg-gray-200 text-gray-800 flex items-center 
                    justify-center p-2 rounded cursor-pointer hover:shadow-2xl'
                        onClick={handleSettingsClick}>
                        <BsGear size={17} />
                    </div>
                )}
            </footer>
        )

    }
}

export default FooterVar6