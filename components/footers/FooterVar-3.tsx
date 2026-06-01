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

const FooterVar3 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

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
            <footer className="border-t border-border bg-background relative">
                <div className="mx-auto max-w-7xl px-6 py-12">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                                <span className="text-sm font-bold text-background">M</span>
                            </div>
                            <span className="text-lg font-semibold text-foreground">Minimal</span>
                        </div>

                        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
                            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                                Home
                            </Link>
                            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                                About
                            </Link>
                            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                                Services
                            </Link>
                            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                                Contact
                            </Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                                <BsTwitterX className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                                <BsGithub className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                                <BsLinkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-border pt-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Minimal. All rights reserved.
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

export default FooterVar3