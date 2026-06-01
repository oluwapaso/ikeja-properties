'use client';

import React, { useEffect, useState } from 'react'
import { FaArrowRightLong, FaFacebook, FaYoutube } from 'react-icons/fa6';
import Image from 'next/image';
import { BsChevronBarUp, BsGear, BsGithub, BsLinkedin, BsTwitterX, BsWhatsapp } from 'react-icons/bs';
import { BiChat, BiEnvelopeOpen, BiMapPin, BiPhone } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PiPhoneIncoming } from 'react-icons/pi';
import { LiaLinkedin } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import Link from 'next/link';
import CustomLinkMain from '../CustomLink';
import { Button } from '../Button';
import { CgMail } from 'react-icons/cg';

const FooterVar2 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

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
            <footer className="bg-zinc-900 text-zinc-100 relative">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                        {/* Company Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                    <span className="text-lg font-bold text-white">C</span>
                                </div>
                                <span className="text-xl font-bold">CorpTech</span>
                            </div>
                            <p className="text-sm leading-relaxed text-zinc-400">
                                Enterprise solutions for modern businesses. Transforming ideas into digital reality since 2010.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <BiMapPin className="h-4 w-4 text-blue-500" />
                                    <span>123 Business Ave, Tech City</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <BiPhone className="h-4 w-4 text-blue-500" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <CgMail className="h-4 w-4 text-blue-500" />
                                    <span>contact@corptech.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100">Services</h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link href="#" className="text-zinc-400 transition-colors hover:text-blue-400">
                                        Cloud Solutions
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-zinc-400 transition-colors hover:text-blue-400">
                                        Data Analytics
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-zinc-400 transition-colors hover:text-blue-400">
                                        Cybersecurity
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-zinc-400 transition-colors hover:text-blue-400">
                                        IT Consulting
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-zinc-400 transition-colors hover:text-blue-400">
                                        Digital Transformation
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100">Company</h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link href="#" className="text-zinc-400 transition-colors hover:text-blue-400">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-zinc-400 transition-colors hover:text-blue-400">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-zinc-400 transition-colors hover:text-blue-400">
                                        Press Room
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-zinc-400 transition-colors hover:text-blue-400">
                                        Partners
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-zinc-400 transition-colors hover:text-blue-400">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100">Newsletter</h3>
                            <p className="text-sm text-zinc-400">
                                Subscribe to our newsletter for the latest updates and insights.
                            </p>
                            <form className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-blue-500"
                                />
                                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-zinc-800 pt-8 md:flex-row">
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
                            <Link href="#" className="hover:text-zinc-300">Privacy Policy</Link>
                            <Link href="#" className="hover:text-zinc-300">Terms of Service</Link>
                            <Link href="#" className="hover:text-zinc-300">Cookie Policy</Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="#" className="text-zinc-500 transition-colors hover:text-blue-400">
                                <BsTwitterX className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-zinc-500 transition-colors hover:text-blue-400">
                                <BsGithub className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-zinc-500 transition-colors hover:text-blue-400">
                                <BsLinkedin className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-zinc-500 transition-colors hover:text-blue-400">
                                <FaYoutube className="h-5 w-5" />
                            </Link>
                        </div>

                        <p className="text-sm text-zinc-500">
                            © {new Date().getFullYear()} CorpTech Inc.
                        </p>
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

export default FooterVar2