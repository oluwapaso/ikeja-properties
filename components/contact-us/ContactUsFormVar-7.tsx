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
import { BsArrowDown, BsArrowRight, BsArrowUp, BsArrowUpRight, BsGear } from 'react-icons/bs'
import { Button } from '../Button'
import { CgLock, CgMail } from 'react-icons/cg'
import { FaLandmark } from 'react-icons/fa6'

const helpers = new Helpers();
const ContactUsFormVar7 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

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
                    "component": "ContactUsVarForm7",
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
            <div className="min-h-screen bg-[#0f0f0f] text-white overflow-hidden">

                {/* Main Content */}
                <section className="relative pt-24">
                    {/* Giant Text Background */}
                    <div className="absolute top-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
                        <div className="text-[20vw] font-black leading-none text-white/[0.03] tracking-tighter whitespace-nowrap">
                            CONTACT
                        </div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-6 py-16">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            {/* Left - Info */}
                            <div className="space-y-16">
                                <div>
                                    <p className="text-red-500 text-sm font-medium mb-4 tracking-wider">GET IN TOUCH</p>
                                    <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
                                        LET&apos;S<br />
                                        TALK<br />
                                        <span className="text-red-500">REAL ESTATE</span>
                                    </h1>
                                    <p className="text-white/50 text-lg max-w-md">
                                        Ready to make your next move? Our team of experts is standing by
                                        to turn your property dreams into reality.
                                    </p>
                                </div>

                                <div className="grid gap-6">
                                    <a href="tel:+15558887777" className="group flex items-center justify-between py-6 border-t border-white/10 hover:border-white/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-red-500 group-hover:border-red-500 transition-all">
                                                <BiPhoneCall className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-white/40 text-xs uppercase tracking-wider">Phone</p>
                                                <p className="text-xl font-medium">+1 (555) 888-7777</p>
                                            </div>
                                        </div>
                                        <BsArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>

                                    <a href="mailto:contact@metro.com" className="group flex items-center justify-between py-6 border-t border-white/10 hover:border-white/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-red-500 group-hover:border-red-500 transition-all">
                                                <CgMail className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-white/40 text-xs uppercase tracking-wider">Email</p>
                                                <p className="text-xl font-medium">contact@metro.com</p>
                                            </div>
                                        </div>
                                        <BsArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>

                                    <div className="group flex items-center justify-between py-6 border-t border-b border-white/10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                                                <BiMapPin className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-white/40 text-xs uppercase tracking-wider">Location</p>
                                                <p className="text-xl font-medium">Chicago, IL</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Form */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12">
                                <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
                                <p className="text-white/50 mb-8">Fill out the form and we&apos;ll be in touch.</p>

                                <form onSubmit={handleSubmitClick} className="space-y-6">
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-white/40 block mb-3">Name</label>
                                        <input
                                            value={formData.firstname}
                                            onChange={handleInputChange}
                                            className="bg-transparent border-0 border-b border-white/20 rounded-none h-12 px-0 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-red-500"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-white/40 block mb-3">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="bg-transparent border-0 border-b border-white/20 rounded-none h-12 px-0 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-red-500"
                                            placeholder="you@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-white/40 block mb-3">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="bg-transparent border-0 border-b border-white/20 rounded-none h-12 px-0 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-red-500"
                                            placeholder="(555) 000-0000"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-white/40 block mb-3">Message</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full bg-transparent border-0 border-b border-white/20 px-0 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500 resize-none"
                                            placeholder="Tell us about your property needs..."
                                        />
                                    </div>

                                    <Button className="w-full h-14 bg-red-500 hover:bg-red-600 text-white font-bold tracking-wider">
                                        SUBMIT <BsArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
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
                                    Change Layout
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
            </div>
        )
    }

}

export default ContactUsFormVar7