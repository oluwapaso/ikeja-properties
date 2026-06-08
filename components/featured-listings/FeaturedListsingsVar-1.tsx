'use client';

import React, { useEffect, useMemo, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { BsArrowDown, BsArrowUp, BsGear } from 'react-icons/bs';
import { getComponent } from '../registry';
import PropCardVar1 from '../property-cards/PropCardVar-1';
import { BiLayerPlus, BiRefresh, BiTrash } from 'react-icons/bi';

const FeaturedListsingsVar1 = (
    { sales_type = "For Sale", status = "Active", is_theme = false, size = 8, prop_type = "Residential,Land,Commercial", raw_data = {} }:
        { is_theme?: boolean, sales_type?: string, status?: string, prop_type?: string, size?: number, raw_data?: any }) => {

    const theme = useSelector((state: RootState) => state.theme);
    const user = useSelector((state: RootState) => state.user);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const [featuredListsings, setFeaturedListsings] = useState<any[]>([]);
    const [ftdListLoaded, setFtdListLoaded] = useState<boolean>(false);
    const [ftdListingError, setFtdListingError] = useState("");
    const [sectionHover, setSectionHover] = useState<boolean>(false);

    //Property Card
    // const [PropertyCard, setPropertyCard] = useState<React.ComponentType<any> | null>(null);

    const handleSettingsClick = () => {
        // Send a message to the parent window
        window.parent.postMessage(
            {
                type: 'OPEN_EDITOR_SETTINGS',
                data: {
                    "category": "featured_listings",
                    "type": "section",
                    "component": "FeaturedListsingsVar1",
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

    const LoadFeaturedListings = async () => {
        const DELIVERY_UID = "xx-8992hhsjsj-sjsjs";

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "delivery_uid": DELIVERY_UID,
            "sales_type": sales_type,
            "status": status,
            "property_type": prop_type,
            "size": size,
            "fields": "*"
        }

        const response = await window.MLS_Util.LoadFeaturedListings(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setFeaturedListsings(response.data.properties);
        } else {
            setFtdListingError(resp_message)
        }

        setFtdListLoaded(true);

    }

    useEffect(() => {
        LoadFeaturedListings();
    }, [window.MLS_Util]);

    useEffect(() => {
        if (theme.theme_settings) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme.theme_settings]);

    const PropertyCard = useMemo(() => {
        const comp = getComponent(theme?.theme_settings?.property_card);
        return comp || PropCardVar1;   // Fallback to default card
    }, [theme?.theme_settings?.property_card]);

    if (themeSett) {
        return (
            <section className="w-full py-20 px-3 tab:px-0 flex justify-center relative" data-show-featured-listings="Yes">

                <div className={`container flex flex-col ${(is_theme && sectionHover) ? "p-[10px] border-2 border-sky-800 transition-all duration-300" : null}`}>

                    <div className=' flex flex-col'>
                        <div className='font-semibold text-xl tab:text-3xl'>{raw_data.header || "Featured Listsings"}</div>
                        <div className='font-medium text-lg'>{raw_data.sub_header || "Here are some of our handpicked properties for you."}</div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-6 xl:gap-x-6 mt-5'>
                        {!ftdListLoaded && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                            <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                        </div>}

                        {(ftdListLoaded && ftdListingError != "") &&
                            <div className='col-span-full h-[250px] bg-white text-red-600 flex items-center justify-center'>
                                {ftdListingError}
                            </div>
                        }

                        {(PropertyCard && ftdListLoaded && Array.isArray(featuredListsings) && featuredListsings.length > 0) &&
                            (featuredListsings.map((prop, index) => {

                                // Stronger check
                                if (!prop || typeof prop !== 'object') {
                                    console.warn("Skipping invalid property:", prop);
                                    return null;
                                }

                                if (prop) {
                                    return <PropertyCard key={index} pro_info={prop} is_theme={is_theme} />
                                } else {
                                    return <nav className="h-20 bg-gray-900 flex items-center justify-center text-white">
                                        Currupt property data
                                    </nav>
                                }
                            }))
                        }
                    </div>

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

    return null;
}

export default FeaturedListsingsVar1;
