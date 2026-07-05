"use client"
import React, { useEffect, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import CustomLinkMain from '../CustomLink';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { RootState } from '@/app/GlobalRedux/store';
import { useSelector } from 'react-redux';

const BlogCategoryLists = ({ curr_cat }: { curr_cat?: string }) => {

    const [categories, setCategories] = useState<any[]>([]);
    const [catsLoaded, setCatsLoaded] = useState<boolean>(false);
    const [catsError, setCatsError] = useState("");
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const FetchBlogPostsCats = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
        }

        const response = await window.MLS_Util.LoadBlogPostCategories(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setCategories(response.data.all_categories);
        } else {
            setCatsError(resp_message);
        }

        setCatsLoaded(true);

    }

    useEffect(() => {
        FetchBlogPostsCats();
    }, []);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    return (
        <div className='w-full mb-5 p-4 rounded bg-white'>
            <div className='w-full font-play-fair-display text-xl pb-2 border-b border-gray-300'>Categories</div>

            {!catsLoaded && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
            </div>}

            {(catsLoaded && categories) &&
                <ul className='w-full *:border-b *:border-gray-300 *:cursor-pointer *:px-1 *:py-3'>
                    <CustomLinkMain href={`${themeSett.theme_prefix}/blog-posts?page=1`} className={`w-full flex items-center  text-base font-normal hover:bg-gray-100`}>
                        <FaChevronRight size={15} /> <span className='ml-1 flex-grow'>All Categories</span>
                    </CustomLinkMain>

                    {categories.map((cat) => (
                        <CustomLinkMain href={`${themeSett.theme_prefix}/blog-posts?ref=${cat.category_uid}&tag=${cat.name}&page=1`}
                            className={`w-full flex items-center text-base font-normal hover:bg-gray-100 line-clamp-1
                            ${(curr_cat && curr_cat == cat.category_uid) ? "bg-gray-200" : ""}`}>
                            <FaChevronRight size={15} className='shrin-0' />
                            <span className='ml-1 flex-grow line-clamp-1'>{cat.name}</span>
                        </CustomLinkMain>
                    ))
                    }
                </ul>
            }

            {(catsLoaded && catsError != "") &&
                <div className='col-span-full h-[250px] bg-white text-red-600 flex items-center justify-center'>
                    {catsError}
                </div>
            }
        </div>
    )
}

export default BlogCategoryLists