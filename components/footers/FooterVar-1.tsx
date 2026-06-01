'use client';

import React, { useEffect, useState } from 'react'
import { FaArrowRightLong, FaFacebook, FaYoutube } from 'react-icons/fa6';
import Image from 'next/image';
import { BsChevronBarUp, BsGear, BsTwitterX, BsWhatsapp } from 'react-icons/bs';
import { BiChat, BiEnvelopeOpen } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PiPhoneIncoming } from 'react-icons/pi';
import { LiaLinkedin } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import Link from 'next/link';
import CustomLinkMain from '../CustomLink';

const FooterVar1 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

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
            <footer className={`w-full relative bg-gray-900 py-20 items-center justify-center text-gray-100`}>

                <div className='container grid grid-cols-12 gap-12 mx-auto'>
                    <div className=' col-span-4 flex flex-col'>
                        <div className='mb-4'>
                            <div className="font-medium text-2xl h-[55px]">
                                <Image src={`/logo-light.png`} height={50} width={150} className="" alt="Nigeria MLS and IDX provider" />
                            </div>
                        </div>

                        <div className='text-sm leading-7'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non temporibus hic sunt iure
                            magnam labore,
                            unde tenetur totam quam porro veritatis
                            error blanditiis quisquam, necessitatibus molestias id in. Et, ipsam?
                        </div>

                        <div className='mt-6'>
                            <div className=' flex flex-col space-y-2.5'>
                                <div className=' flex items-center space-x-1.5'>
                                    <FaMapMarkerAlt size={14} />
                                    <span>{brker_info?.contact_info?.address}</span>
                                    {(brker_info?.contact_info?.address_2 && brker_info?.contact_info?.address_2 != "")
                                        ? <span>, {brker_info?.contact_info?.address_2}</span> : null}
                                </div>

                                <div className=' flex items-center space-x-1.5'>
                                    <PiPhoneIncoming size={14} />
                                    <span>{brker_info?.contact_info?.phone_cell}</span>
                                </div>

                                <div className=' flex items-center space-x-1.5'>
                                    <BiEnvelopeOpen size={14} />
                                    <span>{brker_info?.email}</span>
                                </div>
                            </div>

                            <div className='mt-6 flex items-center space-x-2.5 *:border *:border-gray-500 *:p-3 *:rounded-md 
                                *:flex *:items-center *:justify-center *:cursor-pointer'>
                                <Link href={`${brker_info?.contact_info?.facebook}`} target='_blank' >
                                    <FaFacebook size={20} />
                                </Link>

                                <div>
                                    <BsTwitterX size={20} />
                                </div>

                                <div>
                                    <LiaLinkedin size={20} />
                                </div>

                                <div>
                                    <FaYoutube size={20} />
                                </div>

                                <div>
                                    <BsWhatsapp size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=' col-span-8 grid grid-cols-3 gap-12 *:flex *:flex-col'>

                        {(Array.isArray(themeSett.footer_menu) && themeSett.footer_menu.length > 0) ? (
                            themeSett.footer_menu.map((menu: any, index: any) => {

                                return (
                                    <div key={index} className=''>
                                        <div className='mb-4 font-semibold text-xl border-b-3 border-gray-100 w-fit h-[55px]'>
                                            {menu.title}
                                        </div>

                                        {(Array.isArray(menu.sub_menu) && menu.sub_menu.length > 0) ? (
                                            <div className=' flex flex-col space-y-0.5 *:text-base *:font-medium 
                                            *:flex *:items-center *:space-x-1.5'>
                                                {menu.sub_menu.map((sub_menu: any, sub_index: any) => {
                                                    return <CustomLinkMain key={sub_index} href={`${sub_menu.link ? menu.link : ""}`} is_theme={is_theme}
                                                        className={`hover:bg-${themeSett.primary_color} hover:text-white transition-all 
                                                        ease-in py-2 hover:delay-150 hover:px-2 hover:py-2 cursor-pointer rounded`}>
                                                        <FaArrowRightLong size={13} />
                                                        <span>{sub_menu.title}</span>
                                                    </CustomLinkMain>
                                                })}
                                            </div>
                                        ) : null}
                                    </div>
                                )
                            })
                        ) : null}

                    </div>

                </div>


                <div className='container mt-16 border-t border-gray-700 pt-8 flex items-center justify-center'>
                    &copy; {new Date().getFullYear()}. All rights reserved. Made by NG Realty
                </div>

                <div className={`${showButtons ? "fixed" : "hidden"}  bottom-8 flex justify-end right-2.5`}>
                    <div className=' flex flex-col space-y-3.5 *:flex *:items-center *:justify-center *:size-11 *:rounded-full *:cursor-pointer'>
                        <div className='text-white bg-gray-800 hover:drop-shadow-xl' onClick={backToTop}>
                            <BsChevronBarUp size={20} />
                        </div>

                        <div className='text-white bg-green-700 hover:drop-shadow-xl'>
                            <BsWhatsapp size={20} />
                        </div>

                        <div className='text-white bg-amber-600 hover:drop-shadow-xl'>
                            <BiChat size={20} />
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

export default FooterVar1