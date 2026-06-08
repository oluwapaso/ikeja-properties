'use client';

import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { BsArrowDown, BsArrowUp, BsGear } from 'react-icons/bs';
import CustomLinkMain from '../CustomLink';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Helpers } from '@/_lib/helper';
import NeighCardVar1 from '../neighborhood-cards/NeighCardVar-1';
import { BiLayerPlus, BiRefresh, BiTrash } from 'react-icons/bi';

const helpers = new Helpers();
const NeighborhoodsVar1 = ({ is_theme = false, size = 4, raw_data = {} }: { is_theme?: boolean, size?: number, raw_data?: any }) => {

    const theme = useSelector((state: RootState) => state.theme);
    const user = useSelector((state: RootState) => state.user);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const [neighborgoods, setNeighborgoods] = useState<any[]>([]);
    const [neighListLoaded, setNeighListLoaded] = useState<boolean>(false);
    const [neighListingError, setNeighListingError] = useState("");
    const [sectionHover, setSectionHover] = useState<boolean>(false);

    const handleSettingsClick = () => {
        // Send a message to the parent window
        window.parent.postMessage(
            {
                type: 'OPEN_EDITOR_SETTINGS',
                data: {
                    "category": "our_services",
                    "type": "section",
                    "component": "OurServicesVar1",
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
                component_type: "Featured Listsings"
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

    const LoadNeighborhoods = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "size": size,
            "skip": "0",
            "fields": "neighborhood_uid,excerpt,header_image_large,header_image_small,insight_type,slug,title,views,comments"
        }

        const response = await window.MLS_Util.LoadNeighborhoods(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setNeighborgoods(response.data.all_neighborhoods);
        } else {
            setNeighListingError(resp_message)
        }

        setNeighListLoaded(true);

    }

    useEffect(() => {
        LoadNeighborhoods();
    }, [window.MLS_Util]);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (themeSett) {
        return (
            <section className="w-full py-20 px-3 md:px-0 flex justify-center relative" data-show-neighborhoods="Yes">
                <div className={`container flex flex-col 
                    ${(is_theme && sectionHover) ? "p-[10px] border-2 border-sky-800 transition-all duration-300" : null}`}>

                    <div className='w-full grid grid-cols-12 items-center'>
                        <div className='col-span-full md:col-span-8'>
                            <div className={`border-l-6 px-5 border-${themeSett.primary_color} text-xl md:text-3xl font-semibold`}>
                                {raw_data.header || "Featured Neighborhoods"}
                            </div>
                        </div>
                        <div className='col-span-full md:col-span-4'>
                            <div className='font-medium text-lg'>
                                {raw_data.sub_header || "Discover the most sought-after neighborhoods in the city, each offering unique character, amenities, and opportunities"}
                            </div>
                        </div>
                    </div>

                    <div className='grid col-span-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 lg:gap-x-6 xl:gap-x-6 mt-2 md:mt-20 md:*:even:mt-16'>
                        {!neighListLoaded && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                            <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                        </div>}

                        {(neighListLoaded && neighListingError != "") &&
                            <div className='col-span-full h-[250px] bg-white text-red-600 flex items-center justify-center'>
                                {neighListingError}
                            </div>
                        }

                        {(neighListLoaded && Array.isArray(neighborgoods) && neighborgoods.length > 0) &&
                            (neighborgoods.map((neigh, index) => {
                                return <NeighCardVar1 key={index} neigh_info={neigh} is_theme={is_theme} />
                            }))
                        }
                    </div>

                    {raw_data?.show_more == "Yes" &&
                        <div className=' col-span-full w-full mt-10 md:mt-20 flex items-center justify-center'>
                            <CustomLinkMain href={`${themeSett.theme_prefix}/neighborhoods?page=1`} is_theme={is_theme}
                                className={`px-8 py-5 text-white cursor-pointer flex items-center justify-center rounded space-x-2.5 
                                hover:shadow-2xl bg-${themeSett.primary_color} 
                                hover:bg-${helpers.adjustColorShade(themeSett.primary_color, 1)}`}>
                                <span>{raw_data?.show_more_text || 'See All Neighborhoods'}</span>
                                <FaArrowRightLong size={18} />
                            </CustomLinkMain>
                        </div>
                    }
                </div>

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
        )
    }
}


export default NeighborhoodsVar1