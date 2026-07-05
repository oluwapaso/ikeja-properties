'use client';

import { BsArrowRight } from 'react-icons/bs';
import { BlogPost } from '../types';
import moment from 'moment';
import CustomLinkMain from '../CustomLink';

export function BlogCardVar2({ blog_post, is_theme }: { blog_post: BlogPost, is_theme: boolean }) {

    const { post_uid, company_uid, title, slug, category_uid, category_name, summary, post_body, header_image_large, header_image_small,
        clicks, views, comments, channels, date_added, } = blog_post

    return (
        <CustomLinkMain href={`/blog-post/${slug}`} is_theme={is_theme} className="group flex flex-col h-full overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-lg transition-shadow duration-300">
            {/* Image Container */}
            <div className="relative w-full h-48 sm:h-56 overflow-hidden !bg-cover !bg-center"
                style={{ background: `url('${header_image_large}')` }}>
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-1 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl cursor-pointer font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2 flex-grow text-gray-600">
                    {summary}
                </p>

                {/* Footer with Author and Date */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-300">
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-sm font-medium text-foreground flex items-center space-x-1.5">
                            <span className=' font-medium'>Views:</span>
                            <span>{views}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{moment(date_added).format("Do MMM, YYYY")}</p>
                    </div>
                    <BsArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary opacity-0 cursor-pointer 
                    group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </CustomLinkMain>
    );
}
