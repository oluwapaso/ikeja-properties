
'use client';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiLock, BiRefresh, BiTrash } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';

import CustomLink from '@/components/CustomLink'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppDispatch, RootState } from '@/app/GlobalRedux/store'
import { hidePageLoader } from '@/app/GlobalRedux/app/appSlice'
import { updateUserInfo, updateUserWholeState } from '@/app/GlobalRedux/user/userSlice'
import FloatingInput from '@/components/FloatingInput'
import { BiLogIn } from 'react-icons/bi'
import { Helpers } from '@/_lib/helper';
import { UserInfo } from "@/components/types";
import { MdLockReset } from 'react-icons/md';

const helpers = new Helpers();
const ForgotPasswordFormVar7 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);
    const redirect = searchParams?.get("redirect") as string || "/home";

    const dispatch = useDispatch<AppDispatch>();
    const reset_params = {
        email: ""
    }

    const [ResetParams, setResetParams] = useState(reset_params);
    const [themeSett, setThemeSett] = useState<any | null>(null);
    const [sectionHover, setSectionHover] = useState<boolean>(false);
    const [isResetting, setIsResetting] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResetParams((prev_state) => {
            return {
                ...prev_state,
                [e.target.name]: e.target.value
            }
        })
    }

    const handlePasswordReset = async () => {
        if (window.MLS_Util) {

            toast.dismiss();
            window.MLS_Util.Init(process.env.NEXT_PUBLIC_API_KEY, process.env.NEXT_PUBLIC_ACCOUNT_ID, process.env.NEXT_PUBLIC_MLS_NUMBER, process.env.NEXT_PUBLIC_PROPERTY_DETAILS_EP);

            const payload = {
                "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
                ...ResetParams,
            }

            try {

                setIsResetting(true);
                const response = await window.MLS_Util.StartPasswordReset(payload);

                let resp_message = response.message;
                let status_code = response.status_code;
                if (status_code == 200) {

                    toast.success("Reset link successfully sent to your email address, follow the link to set new a password", {
                        position: "top-center",
                        theme: "colored"
                    });

                    dispatch(updateUserInfo({} as UserInfo));
                    dispatch(updateUserWholeState({ isLogged: false }));
                    setResetParams(reset_params);

                } else {
                    dispatch(updateUserWholeState({ isLogged: false }));
                    toast.error(`${resp_message || resp_message.message}`, {
                        position: "top-center",
                        theme: "colored"
                    });
                }

            } catch (error) {
                dispatch(updateUserWholeState({ isLogged: false }));
                toast.error(`${error}`, {
                    position: "top-center",
                    theme: "colored"
                });
            } finally {
                setIsResetting(false);
            }

        }
    }

    const handleSettingsClick = () => {
        // Send a message to the parent window 
        window.parent.postMessage(
            {
                type: 'OPEN_EDITOR_SETTINGS',
                data: {
                    "category": "forget_password",
                    "type": "section",
                    "component": "ForgotPasswordFormVar7",
                    ...raw_data,
                }
            },
            '*' // In production, replace '*' with your parent URL for security
        );
    };

    const handleCompPickerClick = (event_type: string) => {
        // Send a message to the parent window
        window.parent.postMessage(
            {
                type: event_type,
                component_index: raw_data?.component_index,
                component_type: "Forget Password"
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

    useEffect(() => {
        dispatch(hidePageLoader());
    }, []);

    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (user.isLogged) {
        router.push(`${themeSett.channel_website}/home`);
    } else {

        if (themeSett) {
            return (
                <section className="min-h-screen flex items-center justify-center bg-black px-6 py-35 overflow-hidden relative">
                    {/* Luxury gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-900/20 to-transparent rounded-full blur-3xl"></div>

                    <div className="w-full max-w-lg relative z-10">
                        {/* Premium Card */}
                        <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-amber-500/30 rounded-3xl p-10 shadow-2xl">
                            {/* Gold accent line */}
                            <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r 
                            from-transparent via-${helpers.adjustColorShade(themeSett.primary_color, -1)} to-transparent rounded-full`}></div>

                            {/* Header */}
                            <div className="text-center mb-10">
                                <div className={`inline-flex items-center justify-center w-16 h-16 
                                bg-gradient-to-br rounded-2xl mb-6 shadow-2xl shadow-amber-900/50 
                                from-${helpers.adjustColorShade(themeSett.primary_color, 1)} 
                                to-${helpers.adjustColorShade(themeSett.primary_color, 3)} `}>
                                    <MdLockReset className={`text-${themeSett.primary_button_text} w-8 h-8`} />
                                </div>
                                <h1 className={`text-gray-300 text-4xl font-bold mb-2 tracking-tight`}>{raw_data.header || "Forgot Password?"}</h1>
                                <p className={`text-gray-300 font-ligh`}>{raw_data.sub_header || "Enter account email below. We will send you a link to reset your password."}</p>
                            </div>

                            {/* Form */}
                            <div className="space-y-6">
                                <div className='w-full'>
                                    <FloatingInput name='email' label='Account Email' placeholder='Account Email'
                                        handleChange={(e) => handleChange(e)} value={ResetParams.email} required />
                                </div>

                                <div className='w-full mt-2'>
                                    {!isResetting ?
                                        <button className={`w-full cursor-pointer bg-${themeSett.primary_color} 
                                            text-${themeSett.primary_button_text} flex items-center justify-center py-4 px-4 rounded space-x-1.5 
                                            font-medium hover:shadow-2xl hover:bg-${helpers.adjustColorShade(themeSett.primary_color, 1)}`}
                                            onClick={handlePasswordReset}> <span>{raw_data.button_text || "Send Reset Link"}</span> <BiLogIn size={16} /> </button> :
                                        <div className={`w-full border-2 border-${themeSett.primary_color} 
                                            text-${themeSett.primary_color} text-center py-4 px-4 rounded flex items-center 
                                            justify-center cursor-not-allowed font-medium`}>
                                            <span>Sending Link... Please Wait</span> <AiOutlineLoading3Quarters size={16}
                                                className='animate-spin ml-2' />
                                        </div>
                                    }
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-8">
                                <div className="flex-1 h-px bg-amber-500/10"></div>
                                <span className="text-gray-300 text-xs font-light uppercase">Or</span>
                                <div className="flex-1 h-px bg-amber-500/10"></div>
                            </div>

                            {/* Footer */}
                            <p className="text-center text-gray-300 text-sm mt-8 font-light">
                                <CustomLink href={`${themeSett.channel_website}/login`} className='text-sky-700'>Back to login</CustomLink>
                            </p>

                            {/* Security badge */}
                            <div className="mt-8 pt-6 border-t border-amber-500/10 flex items-center justify-center gap-2 text-gray-300 text-xs">
                                <BiLock size={14} />
                                <span>Secured & Verified</span>
                            </div>
                        </div>
                    </div>

                    {is_theme && (
                        <div className=' absolute z-[1000] right-1.5 top-20 space-x-2 flex items-center justify-end *:bg-gray-800 
                    *:text-white *:flex *:items-center *:justify-center *:p-2 *:rounded *:cursor-pointer'>

                            <div id='editor_settings' className='hover:shadow-2xl relative group'
                                onClick={handleSettingsClick} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                                <BsGear size={17} />

                                <span className='absolute hidden whitespace-nowrap group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                                text-white text-xs'>
                                    Section settings
                                </span>
                            </div>

                            <div id='editor_settings' className='hover:shadow-2xl relative group'
                                onClick={() => handleCompPickerClick("CHANGE_LAYOUT")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                                <BiRefresh size={17} />

                                <span className='absolute hidden whitespace-nowrap group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                            text-white text-xs'>
                                    Replace Section
                                </span>
                            </div>

                            <div id='editor_settings' className='hover:shadow-2xl relative group'
                                onClick={() => handleCompPickerClick("REMOVE_SECTION")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                                <BiTrash size={17} />

                                <span className='absolute hidden right-0 whitespace-nowrap group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                            text-white text-xs'>
                                    Remove Section Down
                                </span>
                            </div>

                        </div>
                    )}
                </section>
            );
        }
    }
}

export default ForgotPasswordFormVar7