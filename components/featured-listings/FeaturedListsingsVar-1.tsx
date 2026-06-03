'use client';

import React, { useEffect, useMemo, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { BsGear } from 'react-icons/bs';
import { getComponent } from '../registry';
import PropCardVar1 from '../property-cards/PropCardVar-1';

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
            <section className="w-full py-20 flex justify-center relative" data-show-featured-listings="Yes">

                <div className={`container flex flex-col  
                ${(is_theme && sectionHover) ? "p-[10px] border-2 border-sky-800 transition-all duration-300" : null}`}>

                    <div className=' flex flex-col'>
                        <div className='font-semibold text-3xl'>{raw_data.header || "Featured Listsings"}</div>
                        <div className='font-medium text-lg'>{raw_data.sub_header || "Here are some of our handpicked properties for you."}</div>
                    </div>

                    <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-8 lg:gap-x-6 xl:gap-x-6 mt-5'>
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
                    <div id='editor_settings' className=' absolute z-[1000] right-1.5 top-20 bg-gray-200 text-gray-800 flex items-center 
                    justify-center p-2 rounded cursor-pointer hover:shadow-2xl'
                        onClick={handleSettingsClick} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                        <BsGear size={17} />
                    </div>
                )}
            </section>
        )
    }

    return null;
}

export default FeaturedListsingsVar1;
