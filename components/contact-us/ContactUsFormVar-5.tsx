"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiBuilding, BiEnvelope, BiHome, BiLayerPlus, BiMapPin, BiMessageSquare, BiPhoneCall, BiPhoneIncoming, BiRefresh, BiSend, BiTrash } from 'react-icons/bi'
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
const ContactUsFormVar5 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

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
            <section className="py-16 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
                            Contact Us
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            How can we help you today?
                        </h1>
                        <p className="text-slate-600 text-lg">
                            Whether you&apos;re buying, selling, or just exploring your options,
                            our team is here to assist you every step of the way.
                        </p>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid md:grid-cols-4 gap-4 mb-16">
                        {[
                            { icon: BiPhoneCall, title: "Phone", value: "(555) 234-5678", color: "bg-green-50 text-green-600" },
                            { icon: CgMail, title: "Email", value: "info@skyline.com", color: "bg-blue-50 text-blue-600" },
                            { icon: BiMapPin, title: "Office", value: "123 Market St, SF", color: "bg-orange-50 text-orange-600" },
                            { icon: CgLock, title: "Hours", value: "Mon-Fri 9-6", color: "bg-purple-50 text-purple-600" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <p className="text-slate-500 text-sm mb-1">{item.title}</p>
                                <p className="text-slate-900 font-medium">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Form Section */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                        <div className="grid lg:grid-cols-5">
                            {/* Left - Interest Selection */}
                            <div className="lg:col-span-2 bg-slate-50 p-8 lg:p-12">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-2">I&apos;m interested in...</h2>
                                <p className="text-slate-500 mb-8">Select your primary interest to help us serve you better.</p>

                                <div className="space-y-3">
                                    {interests.map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setSelectedInterest(item.id)}
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${selectedInterest === item.id
                                                ? "border-blue-600 bg-blue-50"
                                                : "border-slate-200 bg-white hover:border-slate-300"
                                                }`}
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedInterest === item.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                                                }`}>
                                                <item.icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className={`font-medium ${selectedInterest === item.id ? "text-blue-900" : "text-slate-900"}`}>
                                                    {item.label}
                                                </p>
                                                <p className="text-sm text-slate-500">{item.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right - Contact Form */}
                            <div className="lg:col-span-3 p-8 lg:p-12">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <BiMessageSquare className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-slate-900">Send us a message</h2>
                                        <p className="text-slate-500 text-sm">We&apos;ll respond within 24 hours</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmitClick} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-sm font-medium text-slate-700 block mb-2">Full Name</label>
                                            <input
                                                value={formData.firstname}
                                                onChange={handleInputChange}
                                                className="h-12 border-slate-200 focus:border-blue-500 rounded-xl"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-700 block mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="h-12 border-slate-200 focus:border-blue-500 rounded-xl"
                                                placeholder="you@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-700 block mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="h-12 border-slate-200 focus:border-blue-500 rounded-xl"
                                            placeholder="(555) 000-0000"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-700 block mb-2">Message</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={4}
                                            className="w-full border border-slate-200 focus:border-blue-500 rounded-xl p-4 text-slate-900 focus:outline-none resize-none"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium">
                                        Send Message
                                    </Button>
                                </form>
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

export default ContactUsFormVar5