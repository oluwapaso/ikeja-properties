
"use client"
import React, { useEffect, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import CustomLinkMain from '../CustomLink';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { RootState } from '@/app/GlobalRedux/store';
import { useSelector } from 'react-redux';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { BiLinkExternal } from 'react-icons/bi';

const RelatedBlogPosts = ({ category_name, post_uid, variation = "side", is_theme = false }:
    { category_name: string, post_uid: string, variation?: string, is_theme?: boolean }) => {

    const [posts, setposts] = useState<any[]>([]);
    const [postsLoaded, setpostsLoaded] = useState<boolean>(false);
    const [postsError, setPostsError] = useState("");
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    const FetchBlogPostsCats = async () => {

        const payload = {
            "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
            "category_name": category_name,
            "post_uid": post_uid,
            "size": 3,
        }

        const response = await window.MLS_Util.LoadRelatedBlogPosts(payload);

        let resp_message = response.message;
        let status_code = response.status_code;
        if (status_code == 200) {
            setposts(response.data.related_posts);
        } else {
            setPostsError(resp_message);
        }

        setpostsLoaded(true);

    }

    useEffect(() => {
        FetchBlogPostsCats();
    }, []);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (themeSett && themeSett != null) {
        return (
            <div className='w-full mb-5'>
                <div className='w-full flex justify-between items-center text-xl'>
                    <span>Related Blog Posts</span>
                    {variation == "grid" &&
                        <CustomLinkMain href={`/blog-posts`} is_theme={is_theme} className={`flex items-center gap-2 rounded 
                            cursor-pointer border border-${themeSett.primary_color} px-4 py-1.5 text-sm font-medium 
                            text-${themeSett.primary_color} transition-colors hover:bg-${themeSett.primary_color} 
                            hover:text-${themeSett.primary_button_text} `}>
                            <span>See All Post</span>
                            <BiLinkExternal className="h-4 w-4" />
                        </CustomLinkMain>
                    }
                </div>

                {!postsLoaded && <div className='col-span-full h-[250px] bg-white flex items-center justify-center'>
                    <AiOutlineLoading3Quarters size={30} className='animate animate-spin' />
                </div>}

                {(postsLoaded && posts) &&
                    <ul className={`w-full mt-2 ${variation == "side"
                        ? "*:border-b *:border-gray-300 *:cursor-pointer *:px-1 *:py-3"
                        : " grid grid-cols-3 gap-5 *:rounded"} `}>
                        {posts.map((post) => {
                            //../../ in `../${blog_post.header_image_large}` is for testing, remove this in production
                            const header_image_large = post.header_image_large ? `../../${post.header_image_large}` : "../../no-image-found.jpg"
                            return (<CustomLinkMain href={`/blog-post/${post.slug}`} key={post.post_uid}
                                is_theme={is_theme} className={`w-full flex flex-col text-base font-normal space-y-1.5`}>
                                <div className={`w-full h-[245px] relative rounded-t-md overflow-hidden z-10 !bg-center !bg-cover 
                                !bg-no-repeat cursor-pointer`} style={{ backgroundImage: `url('${header_image_large}')` }}>
                                </div>
                                <div className='w-full flex flex-col'>
                                    <span className='ml-1 flex-grow font-semibold text-sm line-clamp-2'>{post.title}</span>
                                    <span className='ml-1 flex-grow line-clamp-4 text-sm'>{post.summary}</span>

                                    <div className={`px-2 mt-1 mb-2`}>
                                        <div className={`w-fit px-4 py-1 mt-1 text-sm bg-white border-1 border-${themeSett.primary_color} flex 
                                    items-center justify-center text-${themeSett.primary_color} hover:bg-${themeSett.primary_color} 
                                    hover:text-${themeSett.primary_button_text} cursor-pointer rounded space-x-2.5 hover:shadow-2xl`}>
                                            <span>Read Article</span>
                                            <FaArrowRightLong size={18} />
                                        </div>
                                    </div>
                                </div>
                            </CustomLinkMain>)
                        })
                        }
                    </ul>
                }

                {(postsLoaded && postsError != "") &&
                    <div className='col-span-full h-[250px] bg-white text-red-600 flex items-center justify-center'>
                        {postsError}
                    </div>
                }
            </div>
        )
    }
}

export default RelatedBlogPosts