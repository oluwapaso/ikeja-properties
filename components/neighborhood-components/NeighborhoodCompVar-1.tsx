"use client";

import { Neighorhood } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { useEffect, useState } from "react";
import { BiLayerPlus, BiPlay, BiPlayCircle, BiRefresh, BiTrash } from "react-icons/bi";
import { BsArrowDown, BsArrowRight, BsArrowUp, BsGear } from "react-icons/bs";
import CustomLinkMain from "../CustomLink";

const ROWS = 20;
const NUM_COLUMNS = 4;
const TEXT_BLOCK_ROWS = 11; // rows the intro text takes up in column 1

function distributeColumns(items: Neighorhood[]) {
    const columns: Neighorhood[][] = Array.from({ length: NUM_COLUMNS }, () => []);
    items.forEach((item, i) => columns[i % NUM_COLUMNS].push(item));
    return columns;
}

function computeSpans(count: number, totalRows: number) {
    if (count <= 0) return [];
    const base = Math.floor(totalRows / count);
    const remainder = totalRows % count;
    return Array.from({ length: count }, (_, i) => base + (i < remainder ? 1 : 0));
}

function NeighborhoodCard({ title, image, href, colStart, rowStart, span, meta, }:
    { title: string; image: string; href: string; colStart: number; rowStart: number; span: number; meta?: string; }) {
    return (
        <CustomLinkMain
            href={href}
            className="group relative block min-h-0 overflow-hidden rounded-2xl"
            style={{
                gridColumn: `${colStart} / span 1`,
                gridRow: `${rowStart} / span ${span}`,
            }}>
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${image})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

            <div className="relative flex h-full flex-col justify-between p-6">
                <div>
                    {meta && (
                        <p className="text-xs font-semibold tracking-wider text-white/80">
                            {meta}
                        </p>
                    )}
                    <h3 className="mt-1 text-2xl font-semibold text-white">{title}</h3>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wider text-white/90 group-hover:text-white">
                        MORE DETAILS
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 text-white transition-colors group-hover:bg-white group-hover:text-black">
                        <BiPlayCircle className="h-3.5 w-3.5 fill-current" />
                    </span>
                </div>
            </div>
        </CustomLinkMain>
    );
}

const NeighborhoodCompVar1 = ({ is_theme = false, size = 20, raw_data = {} }:
    { is_theme?: boolean, size?: number, raw_data?: any }) => {

    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const [servicesError, setServicesError] = useState("");
    const [sectionHover, setSectionHover] = useState<boolean>(false);

    const [neighborgoods, setNeighborgoods] = useState<Neighorhood[]>([]);
    const [neighListLoaded, setNeighListLoaded] = useState<boolean>(false);
    const [neighListingError, setNeighListingError] = useState("");
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState<Neighorhood[][]>([]);

    const handleSettingsClick = () => {
        // Send a message to the parent window
        window.parent.postMessage(
            {
                type: 'OPEN_EDITOR_SETTINGS',
                data: {
                    "category": "neighborhoods",
                    "type": "section",
                    "component": "NeighborhoodCompVar1",
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
                component_type: "Neighborhoods"
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

        try {

            const response = await window.MLS_Util.LoadNeighborhoods(payload);
            let resp_message = response.message;
            let status_code = response.status_code;
            if (status_code == 200) {
                setNeighborgoods(response.data.all_neighborhoods);
                setColumns(distributeColumns(response.data.all_neighborhoods));
            } else {
                setNeighListingError(resp_message)
            }

        } catch (e: any) {
            setNeighListingError(e)
        } finally {
            setLoading(false);
            setNeighListLoaded(true);
        }
    }

    useEffect(() => {
        LoadNeighborhoods();
    }, [window.MLS_Util]);

    return (
        <section className="mx-auto max-w-[1520px] px-6 py-35 relative">
            <div
                className="grid grid-cols-1 gap-6 md:grid-cols-4"
                style={{ gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))` }}
            >
                {/* Column 1, block A: intro text - always rows 1..TEXT_BLOCK_ROWS */}
                <div
                    className="flex flex-col justify-center"
                    style={{
                        gridColumn: "1 / span 1",
                        gridRow: `1 / span ${TEXT_BLOCK_ROWS}`,
                    }}
                >
                    <h2 className="text-4xl font-bold leading-tight text-neutral-900">
                        Exclusive Property Highlights
                    </h2>
                    <p className="mt-4 max-w-sm text-neutral-500">
                        Explore our curated property collections, from luxury waterfront
                        villas to limited-time offers. Find the listings that match your
                        lifestyle, goals, and investment vision.
                    </p>
                    <button className="mt-6 flex w-fit items-center gap-2 rounded-full bg-sky-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-600">
                        Explore All Listings
                        <BsArrowRight className="h-4 w-4" />
                    </button>
                </div>

                {/* Column 1, block B onward: fetched cards, spans computed live */}
                {(Array.isArray(columns) && columns.length > 0) &&

                    (columns.map((colItems, colIndex) => {
                        const colStart = colIndex + 1;
                        // column 1 has less room to work with since the intro text
                        // already claims TEXT_BLOCK_ROWS rows at the top
                        const availableRows = colStart === 1 ? ROWS - TEXT_BLOCK_ROWS : ROWS;
                        const startRow = colStart === 1 ? TEXT_BLOCK_ROWS + 1 : 1;
                        const spans = computeSpans(colItems.length, availableRows);

                        let cursor = startRow;
                        return colItems.map((item, i) => {
                            const span = spans[i];
                            const rowStart = cursor;
                            cursor += span;
                            return (
                                <NeighborhoodCard
                                    key={item.neighborhood_uid}
                                    title={item.title}
                                    image={item.header_image_large || item.header_image_small}
                                    href={`/neighborhoods/${item.slug}`}
                                    colStart={colStart}
                                    rowStart={rowStart}
                                    span={span}
                                    meta={
                                        item.views
                                            ? `${item.views.toLocaleString()} VIEWS`
                                            : undefined
                                    }
                                />
                            );
                        });
                    }))
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
    );
}

export default NeighborhoodCompVar1