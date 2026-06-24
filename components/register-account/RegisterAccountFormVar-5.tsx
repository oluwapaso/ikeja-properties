
'use client';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiRefresh, BiTrash, BiUserPlus } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';

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
import useRequiredFields from '@/_hooks/useReqiredFields';
import CustomLink from '@/components/CustomLink'

const helpers = new Helpers();
const RegisterAccountFormVar5 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);
    const [sectionHover, setSectionHover] = useState<boolean>(false);

    const [themeSett, setThemeSett] = useState<any | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const reg_params = {
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: ""
    }

    const [RegParams, setRegParams] = useState(reg_params);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegParams((prev_state) => {
            return {
                ...prev_state,
                [e.target.name]: e.target.value
            }
        })
    }


    const handleBlur = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = e.target.value;
        const isCurrency = e.target.dataset.isCurrency === 'true';
        const isNumber = e.target.dataset.isNumber === 'true';
        const isPhone = e.target.dataset.isPhone === 'true';
        const maxLen = parseInt(e.target.dataset.maxLen as string);
        // const minNumber = parseInt(e.target.dataset.min as string); 

        setRegParams((prev_val: any) => {
            const prevVal = { ...prev_val }

            let newValue = value;
            if (isNumber) {
                newValue = helpers.formatWholeNumber(value); ///minNumber.toString() 
            } else if (isPhone && value != "") {
                newValue = helpers.format_Nigeria_PhoneNumber(value);
            }

            if (maxLen && maxLen > 0) {
                newValue = newValue.substring(0, maxLen);
            }

            return {
                ...prevVal,
                [e.target.name]: newValue,
            }
        })
    }

    const handleRegister = async () => {
        if (window.MLS_Util) {

            toast.dismiss();
            const { validateFields, errorFields } = useRequiredFields();
            window.MLS_Util.Init(process.env.NEXT_PUBLIC_API_KEY, process.env.NEXT_PUBLIC_ACCOUNT_ID, process.env.NEXT_PUBLIC_MLS_NUMBER, process.env.NEXT_PUBLIC_PROPERTY_DETAILS_EP);

            toast.dismiss();
            if (!helpers.validateEmail(RegParams.email)) {
                errorFields(["email"]);
                toast.error("Provide a valid email address", {
                    position: "top-center",
                    theme: "colored"
                });
                return false;
            }

            let error_msg: string = ""
            if (RegParams.password.length < 5) {
                error_msg = "Password can't be less that 5 characters"
                errorFields(["password"]);
            } else if (RegParams.password != RegParams.confirm_password) {
                error_msg = "Password must match"
                errorFields(["password", "confirm_password"]);
            }

            if (error_msg != "") {
                toast.error(error_msg, {
                    position: "top-center",
                    theme: "colored"
                });
                return false;
            }

            var fields = ['firstname', 'lastname', 'phone_number'];
            const isValid = validateFields(fields);

            if (!isValid) {
                toast.error("Required field can't be empty", {
                    position: "top-center",
                    theme: "colored"
                });
                return false;
            }

            const payload = {
                "account_id": process.env.NEXT_PUBLIC_ACCOUNT_ID,
                "firstname": RegParams.firstname,
                "lastname": RegParams.lastname,
                "email": RegParams.email,
                "phone_number": RegParams.phone_number,
                "password": RegParams.password,
                "confirm_password": RegParams.confirm_password,
            }

            try {

                setIsSubmitting(true);
                const response = await window.MLS_Util.RegisterUser(payload);

                let resp_message = response.message;
                let status_code = response.status_code;
                if (status_code == 200) {

                    toast.success("Account registered successfully, you can now login with your credentials.", {
                        position: "top-center",
                        theme: "colored"
                    });

                    dispatch(updateUserInfo({} as UserInfo));
                    dispatch(updateUserWholeState({ isLogged: false }));
                    setRegParams(reg_params);

                } else {
                    setIsSubmitting(false);
                    toast.error(`${resp_message || resp_message.message}`, {
                        position: "top-center",
                        theme: "colored"
                    });
                }

            } catch (error) {
                setIsSubmitting(false);
                toast.error(`${error}`, {
                    position: "top-center",
                    theme: "colored"
                });
            } finally {
                setIsSubmitting(false);
            }

        }
    }

    const handleSettingsClick = () => {
        // Send a message to the parent window 
        window.parent.postMessage(
            {
                type: 'OPEN_EDITOR_SETTINGS',
                data: {
                    "category": "register",
                    "type": "section",
                    "component": "RegisterAccountFormVar5",
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
                component_type: "Register"
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
                <section className="min-h-screen flex items-center justify-center bg-gradient-to-br 
                from-${themeSett.primary_color} to-${themeSett.primary_color} px-6 py-35 relative">
                    <div className="w-full max-w-lg">
                        {/* Card */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
                            {/* Bold Header Bar */}
                            <div className={`h-1 bg-gradient-to-r from-${helpers.adjustColorShade(themeSett.primary_color, -2)} 
                            via-${helpers.adjustColorShade(themeSett.primary_color, -1)} 
                            to-${themeSett.primary_color}`}></div>

                            <div className="p-8">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br rounded-full mb-4
                                    from-${helpers.adjustColorShade(themeSett.primary_color, -1)} 
                                    to-${helpers.adjustColorShade(themeSett.primary_color, 2)}`}>
                                        <BiUserPlus className={`w-8 h-8 text-${themeSett.primary_button_text}`} />
                                    </div>
                                    <h1 className="text-3xl font-black text-gray-900 mb-1">{raw_data.header || "Create a New Account"}</h1>
                                    <p className="text-gray-700 font-medium">{raw_data.sub_header || "Provide your info to register a new account."}</p>
                                </div>

                                {/* Form */}
                                <div className="space-y-5 w-full flex flex-col">

                                    <div className="w-full mt-4 grid grid-cols-2 gap-4">
                                        <div className=''>
                                            <FloatingInput name='firstname' label='Firstname' placeholder='Firstname'
                                                handleChange={(e) => handleChange(e)} value={RegParams.firstname} required />
                                        </div>

                                        <div className=''>
                                            <FloatingInput name='lastname' label='Lastname' placeholder='Lastname'
                                                handleChange={(e) => handleChange(e)} value={RegParams.lastname} required />
                                        </div>
                                    </div>

                                    <div className='w-full mt-4'>
                                        <FloatingInput name='email' label='Email Adddress' placeholder='Email Adddress'
                                            handleChange={(e) => handleChange(e)} value={RegParams.email} required />
                                    </div>

                                    <div className='w-full mt-4'>
                                        <FloatingInput name='phone_number' label='Phone Number' placeholder='Phone Number'
                                            handleChange={(e) => handleChange(e)} value={RegParams.phone_number}
                                            handleBlur={(e) => handleBlur(e)} required data-is-phone />
                                    </div>

                                    <div className='w-full mt-4'>
                                        <FloatingInput name='password' label='Password' placeholder='Password' type="password"
                                            handleChange={(e) => handleChange(e)} value={RegParams.password} required />
                                    </div>

                                    <div className='w-full mt-4'>
                                        <FloatingInput name='confirm_password' label='Confirm Password' type="password" required
                                            placeholder='Confirm Password' handleChange={(e) => handleChange(e)}
                                            value={RegParams.confirm_password} />
                                    </div>

                                    <div className='w-full mt-2'>
                                        {!isSubmitting ?
                                            <button className={`w-full cursor-pointer bg-${themeSett.primary_color} 
                                                text-${themeSett.primary_button_text} flex items-center justify-center py-4 px-4 rounded space-x-1.5 
                                                font-medium hover:shadow-2xl hover:bg-${helpers.adjustColorShade(themeSett.primary_color, 1)}`}
                                                onClick={handleRegister}> <span>{raw_data.button_text || "Register"}</span> <BiLogIn size={16} /> </button> :
                                            <div className={`w-full border-2 border-${themeSett.primary_color} 
                                                text-${themeSett.primary_color} text-center py-4 px-4 rounded flex items-center 
                                                justify-center cursor-not-allowed font-medium`}>
                                                <span>Registering Account... Please Wait</span> <AiOutlineLoading3Quarters size={16}
                                                    className='animate-spin ml-2' />
                                            </div>
                                        }
                                    </div>
                                </div>

                                {/* Social Login */}
                                <div className="mt-6 space-y-3">
                                    <p className="text-center text-gray-600 font-semibold">Or</p>
                                </div>

                                {/* Footer */}
                                <p className="text-center text-gray-700 text-sm mt-6 font-medium">
                                    Already have an account? <CustomLink href={`${themeSett.channel_website}/login`}
                                        className='text-sky-700'>Click here to login</CustomLink>
                                </p>
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

export default RegisterAccountFormVar5