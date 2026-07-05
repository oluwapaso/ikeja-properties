'use client';

import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import CustomLinkMain from '../CustomLink';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Helpers } from '@/_lib/helper';
import DynamicIcon from '../DynamicIcon';
import { BiLayerPlus, BiRefresh, BiTrash } from 'react-icons/bi';
import { BsArrowDown, BsArrowUp, BsGear } from 'react-icons/bs';
import { CgArrowsExpandUpRight } from 'react-icons/cg';

const helpers = new Helpers();
const OurServicesVar3 = ({ is_theme = false, size = 4, raw_data = {} }: { is_theme?: boolean, size?: number, raw_data?: any }) => {

    const theme = useSelector((state: RootState) => state.theme);
    const user = useSelector((state: RootState) => state.user);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const [services, setServices] = useState<any[]>([]);
    const [servicesLoaded, setServicesLoaded] = useState<boolean>(false);
    const [servicesError, setServicesError] = useState("");
    const [sectionHover, setSectionHover] = useState<boolean>(false);

    const handleSettingsClick = () => {
        // Send a message to the parent window
        window.parent.postMessage(
            {
                type: 'OPEN_EDITOR_SETTINGS',
                data: {
                    "category": "our_services",
                    "type": "section",
                    "component": "OurServicesVar3",
                    ...raw_data,
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
                component_type: "Our Services"
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

    const LoadOurServices = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "size": size,
            "featured": "Yes", //Constant
            "skip": "0",
            "fields": "service_uid,title,slug,icon,excerpt,descriptions"
        }

        const response = await window.MLS_Util.LoadOurServices(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setServices(response.data.services);
        } else {
            setServicesError(resp_message)
        }

        setServicesLoaded(true);

    }

    useEffect(() => {
        LoadOurServices();
    }, [window.MLS_Util]);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    const [hoveredId, setHoveredId] = useState<number | null>(null);
    if (themeSett) {
        return (
            <section className="w-full bg-white px-6 py-35 md:px-12 lg:px-20 relative">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-400">  {raw_data.sub_header || "What we do."}</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <h2 className="text-4xl md:text-4xl font-bold max-w-2xl leading-tight">
                            {raw_data.header || 'Our Services'}
                        </h2>
                        {raw_data?.show_more == "Yes" &&
                            <CustomLinkMain href={`${themeSett.theme_prefix}/our-services?page=1`} is_theme={is_theme}
                                className={`px-8 py-3 text-white cursor-pointer flex items-center justify-center space-x-2.5 
                                rounded-md transition-colors hover:shadow-2xl bg-${themeSett.primary_color} 
                                hover:bg-${helpers.adjustColorShade(themeSett.primary_color, 1)}`}>
                                <span>{raw_data?.show_more_text || 'See All Services'}</span>
                                <CgArrowsExpandUpRight size={18} />
                            </CustomLinkMain>
                        }
                    </div>
                </div>

                {!servicesLoaded && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                    <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                </div>}

                {(servicesLoaded && servicesError != "") &&
                    <div className='col-span-full h-[250px] bg-white text-red-600 flex items-center justify-center'>
                        {servicesError}
                    </div>
                }

                {/* Services Grid */}
                {(servicesLoaded && Array.isArray(services) && services.length > 0) &&

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <CustomLinkMain href={`${themeSett.theme_prefix}/service-details/${service.slug}`} is_theme={is_theme}
                                key={service.service_uid}
                                className="flex flex-col h-full cursor-pointer"
                                onMouseEnter={() => setHoveredId(service.service_uid)}
                                onMouseLeave={() => setHoveredId(null)} >

                                {/* Number */}
                                <div className="text-sm font-semibold text-gray-500 border-b border-gray-200 pb-2 mb-6">
                                    {index < 10 ? `0${index + 1}` : `${index + 1}`}.
                                </div>

                                {/* Icon */}
                                <div className="text-gray-800 mb-8">
                                    <DynamicIcon icon={service.icon} size={60} className={`text-${themeSett.primary_color} fill-${themeSett.primary_color}`} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 mb-8">
                                    <h3 className="text-xl font-bold text-black mb-4">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {service.excerpt}
                                    </p>
                                </div>

                                {/* Button Container with Background Image */}
                                <div className={`relative h-12 flex items-center rounded-full ${hoveredId === service.service_uid
                                    ? `shadow-2xl` : null}`}>
                                    {/* Expanded Background Image (Hidden by default) */}
                                    <div
                                        className={`absolute bottom-0 left-0 right-0 h-12 rounded-full overflow-hidden transition-all duration-500 ease-out ${hoveredId === service.service_uid
                                            ? 'w-full opacity-100' : 'w-0 opacity-0'
                                            }`} >
                                        <img
                                            src={service.header_image_large || "https://img.pikbest.com/origin/06/63/98/19qpIkbEsTkzP.jpg!w700wp"}
                                            alt={service.title}
                                            width={300}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Button */}
                                    <button
                                        className={`relative z-10 w-12 h-12 flex items-center justify-center cursor-pointer rounded-full transition-all duration-500 ease-out transform ${hoveredId === service.service_uid
                                            ? `bg-${themeSett.secondary_color} text-${themeSett.secondary_button_text} 
                                                hover:bg-${helpers.adjustColorShade(themeSett.secondary_color, 1)}`
                                            : `bg-${themeSett.primary_color} text-${themeSett.primary_button_text} 
                                                hover:bg-${helpers.adjustColorShade(themeSett.primary_color, 1)}`
                                            }`} >
                                        <CgArrowsExpandUpRight
                                            className={`transition-colors w-5 h-5 duration-500 ${hoveredId === service.service_uid
                                                ? `text-${themeSett.secondary_button_text}`
                                                : `text-${themeSett.primary_button_text}`
                                                }`} />
                                    </button>
                                </div>
                            </CustomLinkMain>
                        ))}
                    </div>
                }

                {/* {raw_data?.show_more == "Yes" &&
                    <div className=' col-span-full w-full mt-10 md:mt-20 flex items-center justify-center'>
                        <CustomLinkMain href={`${themeSett.theme_prefix}/our-services?page=1`} is_theme={is_theme}
                            className={`px-8 py-5 text-white cursor-pointer flex items-center justify-center rounded space-x-2.5 
                                hover:shadow-2xl bg-${themeSett.primary_color} 
                                hover:bg-${helpers.adjustColorShade(themeSett.primary_color, 1)}`}>
                            <span>{raw_data?.show_more_text || 'See All Services'}</span>
                            <FaArrowRightLong size={18} />
                        </CustomLinkMain>
                    </div>
                } */}


                {is_theme && (
                    <div className='absolute z-[1000] right-1.5 top-2 space-x-2 flex items-center justify-end 
                    *:bg-gray-800 *:text-white *:flex *:items-center *:justify-center *:p-2 *:rounded *:cursor-pointer'>

                        <div id='editor_settings' className='hover:shadow-2xl relative group' onClick={() => handleCompPickerClick("APPEND_SECTION")}
                            onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BiLayerPlus size={17} />

                            <span className='absolute hidden group-hover:inline-block whitespace-nowrap bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                            text-white text-xs'>
                                Add new section after
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={handleSettingsClick} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BsGear size={17} />

                            <span className='absolute hidden group-hover:inline-block whitespace-nowrap bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                                text-white text-xs'>
                                Section settings
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={() => handleCompPickerClick("REPLACE_SECTION")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BiRefresh size={17} />

                            <span className='absolute hidden group-hover:inline-block whitespace-nowrap bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                                text-white text-xs'>
                                Replace Section
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={() => handleMoveClick("UP")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BsArrowUp size={17} />

                            <span className='absolute hidden right-0 group-hover:inline-block whitespace-nowrap bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                                text-white text-xs'>
                                Move Section Up
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={() => handleMoveClick("DOWN")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BsArrowDown size={17} />

                            <span className='absolute hidden right-0 group-hover:inline-block whitespace-nowrap bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                                text-white text-xs'>
                                Move Section Down
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={() => handleCompPickerClick("REMOVE_SECTION")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BiTrash size={17} />

                            <span className='absolute hidden right-0 w-fit group-hover:inline-block whitespace-nowrap bottom-full px-2 
                                py-2 rounded bg-gray-800 text-white text-xs'>
                                Remove Section Down
                            </span>
                        </div>

                    </div>
                )}
            </section>
        );
    }
}


export default OurServicesVar3