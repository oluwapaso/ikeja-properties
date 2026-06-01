"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiEnvelope, BiLayerPlus, BiMapPin, BiPhoneCall, BiPhoneIncoming, BiRefresh, BiSend, BiTrash } from 'react-icons/bi'
import FloatingInput from '@/components/FloatingInput'
import FloatingTextarea from '@/components/FloatingTextarea'
import { toast } from 'react-toastify'
import { Helpers } from '@/_lib/helper'
import { RootState } from '@/app/GlobalRedux/store'
import { hidePageLoader, showPageLoader } from '@/app/GlobalRedux/app/appSlice'
import { BsArrowDown, BsArrowUp, BsArrowUpRight, BsGear } from 'react-icons/bs'
import { Button } from '../Button'

const helpers = new Helpers();
const ContactUsFormVar3 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

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
                    "category": "contact_us_form",
                    "type": "section",
                    "component": "ContactUsVarForm2",
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
                component_type: "Contact Form"
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
            <section className="pt-32 pb-24 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-24">
                        {/* Left Column */}
                        <div className="space-y-16">
                            <div>
                                <h1 className="text-[#1a1a1a] text-4xl md:text-5xl font-light leading-tight mb-6 tracking-tight">
                                    Let&apos;s find your
                                    <br />
                                    <span className="italic">perfect place</span>
                                </h1>
                                <p className="text-[#666] text-lg leading-relaxed max-w-sm">
                                    We believe everyone deserves a home that feels right.
                                    Tell us what you&apos;re looking for.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="border-t border-[#e5e5e5] pt-6">
                                    <p className="text-xs text-[#999] uppercase tracking-wider mb-2">Address</p>
                                    <p className="text-[#1a1a1a]">245 Valencia Street<br />San Francisco, CA 94103</p>
                                </div>
                                <div className="border-t border-[#e5e5e5] pt-6">
                                    <p className="text-xs text-[#999] uppercase tracking-wider mb-2">Email</p>
                                    <a href="mailto:hello@haven.co" className="text-[#1a1a1a] hover:underline">hello@haven.co</a>
                                </div>
                                <div className="border-t border-[#e5e5e5] pt-6">
                                    <p className="text-xs text-[#999] uppercase tracking-wider mb-2">Phone</p>
                                    <a href="tel:+14155550123" className="text-[#1a1a1a] hover:underline">+1 (415) 555-0123</a>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div>
                            <form onSubmit={handleSubmitClick} className="space-y-8">
                                <div>
                                    <label className="text-xs text-[#999] uppercase tracking-wider block mb-3">Name</label>
                                    <input
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                        placeholder="Your full name"
                                        className="bg-transparent border-0 border-b border-[#e5e5e5] rounded-none h-12 px-0 text-[#1a1a1a] placeholder:text-[#ccc] focus-visible:ring-0 focus-visible:border-[#1a1a1a]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-[#999] uppercase tracking-wider block mb-3">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="you@email.com"
                                        className="bg-transparent border-0 border-b border-[#e5e5e5] rounded-none h-12 px-0 text-[#1a1a1a] placeholder:text-[#ccc] focus-visible:ring-0 focus-visible:border-[#1a1a1a]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-[#999] uppercase tracking-wider block mb-3">Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+1 (555) 000-0000"
                                        className="bg-transparent border-0 border-b border-[#e5e5e5] rounded-none h-12 px-0 text-[#1a1a1a] placeholder:text-[#ccc] focus-visible:ring-0 focus-visible:border-[#1a1a1a]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-[#999] uppercase tracking-wider block mb-3">Message</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell us about your ideal home..."
                                        rows={4}
                                        className="w-full bg-transparent border-0 border-b border-[#e5e5e5] px-0 text-[#1a1a1a] placeholder:text-[#ccc] focus:outline-none focus:border-[#1a1a1a] resize-none"
                                    />
                                </div>
                                <Button className="bg-[#1a1a1a] text-white hover:bg-[#333] rounded-full px-8 h-12 mt-4">
                                    Send Message <BsArrowUpRight className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                {is_theme && (
                    <div className=' absolute z-[1000] right-1.5 top-20 space-x-2 flex items-center justify-end *:bg-gray-800 
                *:text-white *:flex *:items-center *:justify-center *:p-2 *:rounded *:cursor-pointer'>

                        <div id='editor_settings' className='hover:shadow-2xl relative group' onClick={() => handleCompPickerClick("APPEND_SECTION")}
                            onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BiLayerPlus size={17} />

                            <span className='absolute hidden group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                        text-white text-xs'>
                                Add new section after
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={handleSettingsClick} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BsGear size={17} />

                            <span className='absolute hidden group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                        text-white text-xs'>
                                Section settings
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={() => handleCompPickerClick("REPLACE_SECTION")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BiRefresh size={17} />

                            <span className='absolute hidden group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                        text-white text-xs'>
                                Replace Section
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={() => handleMoveClick("UP")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BsArrowUp size={17} />

                            <span className='absolute hidden group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                        text-white text-xs'>
                                Move Section Up
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={() => handleMoveClick("DOWN")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BsArrowDown size={17} />

                            <span className='absolute hidden group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                        text-white text-xs'>
                                Move Section Down
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={() => handleCompPickerClick("REMOVE_SECTION")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BiTrash size={17} />

                            <span className='absolute hidden group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                        text-white text-xs'>
                                Remove Section Down
                            </span>
                        </div>

                    </div>
                )}
            </section>
        )
    }

}

export default ContactUsFormVar3