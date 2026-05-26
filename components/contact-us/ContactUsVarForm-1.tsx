"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiPhoneCall, BiSend } from 'react-icons/bi'
import { FaMapMarkerAlt } from 'react-icons/fa'
import FloatingInput from '@/components/FloatingInput'
import FloatingTextarea from '@/components/FloatingTextarea'
import { toast } from 'react-toastify'
import { Helpers } from '@/_lib/helper'
import { RootState } from '@/app/GlobalRedux/store'
import { hidePageLoader, showPageLoader } from '@/app/GlobalRedux/app/appSlice'
import { BsGear } from 'react-icons/bs'

const helpers = new Helpers();
const ContactUsFormVar1 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

    const dispatch = useDispatch();
    const brker_info = useSelector((state: RootState) => state.broker);
    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);
    const [sectionHover, setSectionHover] = useState<boolean>(false);

    const init_val = {
        firstname: "",
        lastname: "",
        company_name: "",
        phone: "",
        user_uid: "",
        email: "",
        subject: "",
        message: ""
    }

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

    const [formData, setFormData] = useState(init_val);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {

        const value = e.target.value;
        const isCurrency = e.target.dataset.isCurrency === 'true';
        const isNumber = e.target.dataset.isNumber === 'true';

        setFormData(prevData => {
            const prevVal = { ...prevData }

            let newValue = value;
            if (isCurrency) {
                //newValue = helpers.formatCurrency(value);
            } else if (isNumber) {
                newValue = helpers.formatNumber(value);
            }

            return {
                ...prevVal,
                [e.target.name]: newValue
            }
        })
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevVal: any) => {
            return {
                ...prevVal,
                inquiry: e.target.value
            }
        })
    }

    const handleSubmitClick = async () => {

        const email = formData.email;

        toast.dismiss();
        if (!helpers.validateEmail(email)) {
            toast.error("Provide a valid email address", {
                position: "top-center",
                theme: "colored",
            });
            return false;
        }

        if (!formData.firstname || !formData.lastname || !formData.message || !formData.subject) {
            toast.error("Required fields can not be empty.", {
                position: "top-center",
                theme: "colored",
            });
            return false;
        }

        try {

            var payload = {
                "firstname": formData.firstname,
                "lastname": formData.lastname,
                "email": formData.email,
                "phone": formData.phone,
                "subject": formData.subject,
                "message": formData.message,
                "user_uid": user.user_info?.user_uid,
            };

            dispatch(showPageLoader());
            const response = await window.MLS_Util.SendContactMessage(payload);

            let resp_message = response.message;
            let status_code = response.status_code;
            if (status_code == 200) {
                toast.success(`Message succesfully sent, we'll get back to you as soon as possible.`, {
                    position: "top-center",
                    theme: "colored",
                });
                setFormData(init_val);
            } else {
                toast.error(`${resp_message}`, {
                    position: "top-center",
                    theme: "colored",
                });
            }

        } catch (error) {
            toast.error(`${error}`, {
                position: "top-center",
                theme: "colored",
            });
        } finally {
            dispatch(hidePageLoader());
        }

    }

    useEffect(() => {
        if (user.user_info?.user_uid) {
            setFormData((prev_state: any) => {
                return {
                    ...prev_state,
                    "firstname": user.user_info?.firstname,
                    "lastname": user.user_info?.lastname,
                    "email": user.user_info?.email,
                    "phone": helpers.format_Nigeria_PhoneNumber(user.user_info?.phone_1) ||
                        helpers.format_Nigeria_PhoneNumber(user.user_info?.phone_2)
                }
            })
        }
    }, [user.user_info?.user_uid]);

    useEffect(() => {
        dispatch(hidePageLoader());
    }, []);


    useEffect(() => {
        if (theme) {
            setThemeSett(theme.theme_settings);
        }
    }, [theme]);

    if (themeSett) {
        return (
            <section className="w-full pt-50 pb-20 relative">
                <div className={`container mx-auto max-w-[1150px] flex flex-col  
                ${(is_theme && sectionHover) ? "p-[10px] border-2 border-sky-800 transition-all duration-300" : null}`}>

                    <div className=" grid grid-cols-2 gap-8">

                        <div className=" flex flex-col">
                            <div className="font-bold text-3xl">{raw_data.header || "Let's talk?"}</div>
                            <div className='leading-6 mt-2'>
                                {raw_data.sub_header || "It's all about the humans behind a brand and those experiencing it, we're right there. In the middle."}
                            </div>

                            <div className='grid grid-cols-2 gap-6 divide-x divide-gray-300 mt-14 
                                *:flex *:items-center *:space-x-5'>
                                <div className=''>
                                    <div className='shrink-0 relative'>
                                        <div className=" size-14 hover:shadow-2xl bg-icons-primary flex items-center justify-center text-white cursor-pointer
                                             rounded-full after:size-18 after:absolute after:rounded-full after:bg-icons-primary/50 after:-z-0 ">
                                            <FaMapMarkerAlt size={28} className=" relative z-10" />
                                        </div>
                                    </div>

                                    <div className='flex flex-col space-y-1'>
                                        <div>{brker_info?.contact_info?.address},</div>
                                        <div>{brker_info?.contact_info?.address_2},</div>
                                        <div>{brker_info?.contact_info?.city} {brker_info?.contact_info?.state}.</div>
                                    </div>
                                </div>


                                <div>
                                    <div className='shrink-0 relative'>
                                        <div className=" size-14 hover:shadow-2xl bg-icons-primary flex items-center justify-center text-white cursor-pointer
                                             rounded-full after:size-18 after:absolute after:rounded-full after:bg-icons-primary/50 after:-z-0 ">
                                            <BiPhoneCall size={28} className=" relative z-10" />
                                        </div>
                                    </div>

                                    <div className=' flex flex-col space-y-1'>
                                        <div>{brker_info?.contact_info?.phone_cell}</div>
                                        <div>{brker_info?.contact_info?.phone_local}</div>
                                        <div>{brker_info?.contact_info?.phone_toll_free}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex flex-col space-y-5 mt-4'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <FloatingInput name='firstname' label='First Name' placeholder='Enter your first name'
                                        handleChange={(e) => handleInputChange(e)} value={formData.firstname} required />
                                </div>

                                <div>
                                    <FloatingInput name='lastname' label='Last Name' placeholder='Enter your last name'
                                        handleChange={(e) => handleInputChange(e)} value={formData.lastname} required />
                                </div>
                            </div>
                            <div>
                                <FloatingInput name='email' label='Email' placeholder='Enter your email'
                                    handleChange={(e) => handleInputChange(e)} value={formData.email} required />
                            </div>
                            <div>
                                <FloatingInput name='phone' label='Phone Number' placeholder='Enter your phone number'
                                    handleChange={(e) => handleInputChange(e)} value={formData.phone} required />
                            </div>
                            <div>
                                <FloatingInput name='subject' label='Subject' placeholder='Message subject'
                                    handleChange={(e) => handleInputChange(e)} value={formData.subject} required />
                            </div>
                            <div>
                                <FloatingTextarea name='message' label='Message' placeholder='Enter your message' height='160px'
                                    handleChange={(e) => handleInputChange(e)} value={formData.message} required />
                            </div>

                            <div className='flex justify-end w-full'>
                                <div className='px-7 py-4 text-white bg-buttons-primary rounded hover:shadow-2xl cursor-pointer
                                     flex items-center justify-center space-x-2 ' onClick={handleSubmitClick}>
                                    <span>{raw_data.button_text || "Send Message"}</span>
                                    <BiSend size={25} className='' />
                                </div>
                            </div>
                        </div>

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

}

export default ContactUsFormVar1