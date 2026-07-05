"use client"

import { Helpers } from '@/_lib/helper'
import { RootState } from '@/app/GlobalRedux/store'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ImReply } from 'react-icons/im'
import { RiAdminLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'

const helpers = new Helpers();
const CommentCardVar2 = ({ comm, handleReply }:
    { comm: any, handleReply: (comment_uid: string, comment_parent: string) => void }) => {

    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (themeSett && themeSett != null) {
        return (
            <div key={comm.comment_uid} id={`comment_uid_${comm.comment_uid}`}
                className='comment_list w-full max-w-[100%] p-4 border border-gray-200 bg-white my-3'>
                <div className='w-full flex flex-col xs:flex-row justify-between items-start xs:items-center mb-2'>
                    <div className='font-bold text-base flex flex-col'>
                        {
                            comm.admin_response == "Yes" ? (
                                <span className='flex text-red-600 items-center'>
                                    <RiAdminLine size={20} /> <span className='ml-1'>Admin</span>
                                </span>
                            ) : (
                                <>
                                    <span>{comm.firstname} {comm.lastname}</span>
                                    <span className='text-gray-500 text-sm italic font-normal break-words'>({comm.email})</span>
                                </>
                            )
                        }
                    </div>
                    <div className='mt-2 xs:mt-0'>
                        <button className={`bg-${themeSett.primary_color} text-${themeSett.primary_button_text} rounded flex items-center justify-center py-2 
                            px-4 hover:bg-${helpers.adjustColorShade(themeSett.primary_color, 1)} cursor-pointer hover:drop-shadow-xl`}
                            onClick={() => handleReply(comm.comment_uid, comm.comments)}>
                            <ImReply size={15} /> <span className='text-sm ml-1'>Reply</span>
                        </button>
                    </div>
                </div>

                <div className='w-full'>
                    <div className='w-full'>{comm.comments}</div>
                    {
                        (comm.quoted_comments && comm.quoted_comments != "") && (
                            <div className='w-full mt-2 bg-gray-50 p-4 border border-gray-200 flex flex-col'>
                                <div className='font-bold text-base flex flex-col'>
                                    {
                                        comm.quoted_admin_response == "Yes" ? (
                                            <span className='flex text-red-600 items-center'>
                                                <RiAdminLine size={20} /> <span className='ml-1'>Admin</span>
                                            </span>
                                        ) : (
                                            <>
                                                <span>{comm.quoted_comment_name}</span>
                                                <span className='text-gray-500 text-sm italic 
                                                font-normal break-words'>({comm.quoted_comment_email})</span>
                                            </>
                                        )
                                    }
                                </div>
                                <div className='w-full'>{comm.quoted_comments}</div>
                            </div>
                        )
                    }
                </div>

                <div className='w-full mt-2 flex justify-end'>
                    <span className=' text-gray-500 text-sm font-medium'>
                        {moment(comm.date_added).format("Do MMM, YYYY h:m A")}
                    </span>
                </div>
            </div>
        )
    }
}

export default CommentCardVar2