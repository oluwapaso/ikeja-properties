import React from 'react';
import { BlogPost } from '../types';
import moment from 'moment';
import CustomLinkMain from '../CustomLink';

export default function BlogCardVar5({ blog_post, is_theme }: { blog_post: BlogPost, is_theme: boolean }) {

    const { post_uid, company_uid, title, slug, category_uid, category_name, summary, post_body, header_image_large, header_image_small,
        clicks, views, comments, channels, date_added, } = blog_post
    return (
        <CustomLinkMain href={`/blog-post/${slug}`} is_theme={is_theme} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            {/* Image Container */}
            <div className="w-full h-48 sm:h-56 overflow-hidden bg-gray-200">
                <div className="relative w-full h-full object-cover hover:scale-105 transition-transform duration-300 !bg-cover !bg-center"
                    style={{ background: `url('${header_image_large}')` }}>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-5 sm:p-6">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-gray-700 transition-colors">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                    {summary}
                </p>

                {/* Author and Date */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 pt-3 border-t border-gray-100">

                    <span className="font-medium text-gray-700 flex items-center space-x-1.5">
                        <span className="font-medium">Views:</span> <span>{views}</span>
                    </span>
                    <span className="mx-1">•</span>
                    <span>{moment(date_added).format("Do MMM, YYYY")}</span>
                </div>
            </div>
        </CustomLinkMain>
    );
}