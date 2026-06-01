'use client';

import React, { useEffect, useState } from 'react'
import { FaArrowRightLong, FaFacebook, FaYoutube } from 'react-icons/fa6';
import Image from 'next/image';
import { BsChevronBarUp, BsGear, BsGithub, BsInstagram, BsLinkedin, BsTwitterX, BsWhatsapp } from 'react-icons/bs';
import { BiBuilding, BiChat, BiEnvelopeOpen, BiMapPin, BiPhone } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PiPhoneIncoming } from 'react-icons/pi';
import { LiaLinkedin } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import Link from 'next/link';
import CustomLinkMain from '../CustomLink';
import { Button } from '../Button';
import { CgMail } from 'react-icons/cg';

const FooterVar4 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

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
            <footer className="bg-[#1a1a1a] text-white relative">
                {/* Top Section with CTA */}
                <div className="border-b border-white/10">
                    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-3xl font-light tracking-tight md:text-4xl">
                                Find Your Dream Home
                            </h2>
                            <p className="mt-4 text-sm text-white/60">
                                Schedule a private consultation with our luxury real estate specialists
                            </p>
                            <Button className="mt-6 bg-white text-[#1a1a1a] hover:bg-white/90 px-8">
                                Book Consultation
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Brand Column */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <BiBuilding className="h-8 w-8" />
                                <span className="text-xl font-light tracking-widest">PRESTIGE</span>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed">
                                Curating exceptional properties for discerning clients since 1985.
                            </p>
                            <div className="flex gap-4 pt-2">
                                <Link href="#" className="text-white/60 hover:text-white transition-colors">
                                    <FaFacebook className="h-5 w-5" />
                                </Link>
                                <Link href="#" className="text-white/60 hover:text-white transition-colors">
                                    <BsInstagram className="h-5 w-5" />
                                </Link>
                                <Link href="#" className="text-white/60 hover:text-white transition-colors">
                                    <BsLinkedin className="h-5 w-5" />
                                </Link>
                                <Link href="#" className="text-white/60 hover:text-white transition-colors">
                                    <BsTwitterX className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                                Properties
                            </h3>
                            <ul className="space-y-3">
                                {["Featured Listings", "New Developments", "Luxury Estates", "Waterfront Properties", "International"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                                Services
                            </h3>
                            <ul className="space-y-3">
                                {["Buying Advisory", "Selling Services", "Property Valuation", "Investment Consulting", "Relocation"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                                Contact
                            </h3>
                            <ul className="space-y-3 text-sm text-white/60">
                                <li className="flex items-start gap-3">
                                    <BiMapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                    <span>123 Park Avenue, New York, NY 10022</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <BiPhone className="h-4 w-4 shrink-0" />
                                    <span>+1 (212) 555-0199</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CgMail className="h-4 w-4 shrink-0" />
                                    <span>inquiries@prestige.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <p className="text-xs text-white/40">
                                &copy; 2024 Prestige Real Estate. All rights reserved.
                            </p>
                            <div className="flex gap-6">
                                {["Privacy Policy", "Terms of Service", "Accessibility"].map((item) => (
                                    <Link key={item} href="#" className="text-xs text-white/40 hover:text-white transition-colors">
                                        {item}
                                    </Link>
                                ))}
                            </div>
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

export default FooterVar4