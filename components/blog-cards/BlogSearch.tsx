"use client"
import { Helpers } from '@/_lib/helper'
import { showPageLoader } from '@/app/GlobalRedux/app/appSlice'
import { AppDispatch, RootState } from '@/app/GlobalRedux/store'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

const helpers = new Helpers();
const BlogSearch = ({ keyword, setKeyword, setBlogPostLoaded }:
    {
        keyword: string, setKeyword: React.Dispatch<React.SetStateAction<string>>,
        setBlogPostLoaded: React.Dispatch<React.SetStateAction<boolean>>
    }) => {

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }

    const handleSearch = () => {
        if (keyword && keyword != "") {
            // setBlogPostLoaded(false);
            startTransition(() => {
                // dispatch(showPageLoader());
                router.push(`${themeSett.theme_prefix}/search-posts?keyword=${keyword}&version=${moment().unix()}&page=1`);
            })
        }
    }

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (themeSett) {
        return (
            <div className='w-full mb-5'>
                <div className=''>
                    <div className='flex items-center'>
                        <div className='flex-grow'>
                            <input className='w-full h-11 border-2 border-gray-300 px-2 outline-0 hover:border-sky-600 font-normal 
                            focus:shadow-md' type='number appearance-none' placeholder='Search...'
                                value={keyword} name='keyword' onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={`flex items-center justify-center py-2 h-11 px-4 bg-${themeSett.primary_color} border 
                            border-${themeSett.primary_color} text-${themeSett.primary_button_text} cursor-pointer
                            hover:bg-${helpers.adjustColorShade(themeSett.primary_color, 1)} hover:shadow-lg`}
                            onClick={handleSearch}><IoSearchSharp size={20} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogSearch