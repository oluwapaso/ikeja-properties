"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiBuilding, BiEnvelope, BiHome, BiLayerPlus, BiMapPin, BiMessageSquare, BiPhoneCall, BiPhoneIncoming, BiRefresh, BiSend, BiStar, BiTrash } from 'react-icons/bi'
import FloatingInput from '@/components/FloatingInput'
import FloatingTextarea from '@/components/FloatingTextarea'
import { toast } from 'react-toastify'
import { Helpers } from '@/_lib/helper'
import { RootState } from '@/app/GlobalRedux/store'
import { hidePageLoader, showPageLoader } from '@/app/GlobalRedux/app/appSlice'
import { BsArrowDown, BsArrowUp, BsArrowUpRight, BsGear } from 'react-icons/bs'
import { Button } from '../Button'
import { CgLock, CgMail } from 'react-icons/cg'
import { FaLandmark } from 'react-icons/fa6'

const helpers = new Helpers();
const ContactUsFormVar6 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

    const dispatch = useDispatch();
    const brker_info = useSelector((state: RootState) => state.broker);
    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);
    const [themeSett, setThemeSett] = useState<any | null>(null);
    const [sectionHover, setSectionHover] = useState<boolean>(false);
    const [selectedInterest, setSelectedInterest] = useState("")

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

    const interests = [
        { id: "buying", icon: BiHome, label: "Buying", desc: "Looking to purchase" },
        { id: "selling", icon: BiBuilding, label: "Selling", desc: "List your property" },
        { id: "investing", icon: FaLandmark, label: "Investing", desc: "Investment opportunities" },
    ]

    if (themeSett) {

        return (
            <section className="py-12 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    {/* Hero */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm mb-6">
                            <BiStar className="h-4 w-4 fill-rose-400 text-rose-400" />
                            <span>We&apos;re here to help you find your happy place</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-semibold text-[#3d3027] mb-4 leading-tight">
                            Let&apos;s start a<br />
                            <span className="text-rose-500">conversation</span>
                        </h1>
                        <p className="text-[#6b5c4c] text-lg max-w-xl mx-auto">
                            Finding a home should feel exciting, not stressful.
                            Tell us what your dream looks like.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl p-6 shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center mb-4">
                                    <BiPhoneCall className="h-5 w-5 text-rose-600" />
                                </div>
                                <h3 className="text-[#3d3027] font-medium mb-1">Give us a call</h3>
                                <p className="text-[#6b5c4c] text-sm mb-3">We&apos;re available Mon-Sat</p>
                                <a href="tel:+15551234567" className="text-[#3d3027] font-medium hover:text-rose-600 transition-colors">
                                    +1 (555) 123-4567
                                </a>
                            </div>

                            <div className="bg-white rounded-3xl p-6 shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-4">
                                    <CgMail className="h-5 w-5 text-amber-600" />
                                </div>
                                <h3 className="text-[#3d3027] font-medium mb-1">Drop us an email</h3>
                                <p className="text-[#6b5c4c] text-sm mb-3">We reply within 24 hours</p>
                                <a href="mailto:hello@homely.co" className="text-[#3d3027] font-medium hover:text-rose-600 transition-colors">
                                    hello@homely.co
                                </a>
                            </div>

                            <div className="bg-white rounded-3xl p-6 shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
                                    <BiMapPin className="h-5 w-5 text-green-600" />
                                </div>
                                <h3 className="text-[#3d3027] font-medium mb-1">Visit our office</h3>
                                <p className="text-[#6b5c4c] text-sm mb-3">Come say hello!</p>
                                <p className="text-[#3d3027] font-medium">
                                    456 Oak Street<br />
                                    Austin, TX 78701
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm">
                                <h2 className="text-2xl font-semibold text-[#3d3027] mb-2">Send us a message</h2>
                                <p className="text-[#6b5c4c] mb-8">We&apos;d love to hear from you!</p>

                                <form onSubmit={handleSubmitClick} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-sm text-[#3d3027] block mb-2">Your Name</label>
                                            <input
                                                value={formData.firstname}
                                                onChange={handleInputChange}
                                                className="h-12 border-[#e8ddd0] focus:border-rose-400 rounded-xl bg-[#fef9f3]"
                                                placeholder="What should we call you?"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-[#3d3027] block mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="h-12 border-[#e8ddd0] focus:border-rose-400 rounded-xl bg-[#fef9f3]"
                                                placeholder="(555) 000-0000"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm text-[#3d3027] block mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="h-12 border-[#e8ddd0] focus:border-rose-400 rounded-xl bg-[#fef9f3]"
                                            placeholder="you@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-[#3d3027] block mb-2">Your Message</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={5}
                                            className="w-full border border-[#e8ddd0] focus:border-rose-400 rounded-xl bg-[#fef9f3] p-4 text-[#3d3027] focus:outline-none resize-none"
                                            placeholder="Tell us about your dream home... What matters most to you?"
                                        />
                                    </div>

                                    <Button className="w-full h-12 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-medium">
                                        Send Message
                                    </Button>
                                </form>

                                <div className="mt-8 pt-8 border-t border-[#e8ddd0]">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-amber-200 border-2 border-white" />
                                            ))}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1 mb-1">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <BiStar key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                ))}
                                            </div>
                                            <p className="text-sm text-[#6b5c4c]">Trusted by 500+ happy homeowners</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {is_theme && (
                    <div className=' absolute z-[1000] right-1.5 top-1 space-x-2 flex items-center justify-end *:bg-gray-800 
                    *:text-white *:flex *:items-center *:justify-center *:p-2 *:rounded *:cursor-pointer'>

                        <div id='editor_settings' className='hover:shadow-2xl relative group' onClick={() => handleCompPickerClick("APPEND_SECTION")}
                            onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BiLayerPlus size={17} />

                            <span className='absolute hidden right-0 whitespace-nowrap group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                            text-white text-xs'>
                                Add new section after
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={handleSettingsClick} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BsGear size={17} />

                            <span className='absolute hidden right-0 whitespace-nowrap group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                            text-white text-xs'>
                                Section settings
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={() => handleCompPickerClick("REPLACE_SECTION")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BiRefresh size={17} />

                            <span className='absolute hidden right-0 whitespace-nowrap group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                            text-white text-xs'>
                                Replace Section
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={() => handleMoveClick("UP")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BsArrowUp size={17} />

                            <span className='absolute hidden right-0 whitespace-nowrap group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                            text-white text-xs'>
                                Move Section Up
                            </span>
                        </div>

                        <div id='editor_settings' className='hover:shadow-2xl relative group'
                            onClick={() => handleMoveClick("DOWN")} onMouseOver={handleHover} onMouseOut={handleMouseExist}>
                            <BsArrowDown size={17} />

                            <span className='absolute hidden right-0 whitespace-nowrap group-hover:block bottom-full px-2 py-2 w-fit rounded bg-gray-800 
                            text-white text-xs'>
                                Move Section Down
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
        )
    }

}

export default ContactUsFormVar6