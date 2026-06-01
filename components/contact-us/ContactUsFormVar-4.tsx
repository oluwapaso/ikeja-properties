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
import { CgMail } from 'react-icons/cg'

const helpers = new Helpers();
const ContactUsFormVar4 = ({ is_theme = false, raw_data = {} }: { is_theme?: boolean, raw_data?: any }) => {

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
            <section className="min-h-screen flex flex-col lg:flex-row relative">
                {/* Left Side - Dark with Image */}
                <div className="lg:w-1/2 bg-[#1c3d2e] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200')] bg-cover bg-center opacity-30" />
                    <div className="relative z-10 p-8 lg:p-16 h-full flex flex-col justify-between min-h-[50vh] lg:min-h-screen">
                        {/* Logo */}
                        <div className="text-white text-2xl font-semibold">Evergreen<span className="text-emerald-400">.</span></div>

                        {/* Content */}
                        <div className="py-12 lg:py-0">
                            <p className="text-emerald-400 text-sm tracking-wider mb-4">CONTACT US</p>
                            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
                                Ready to find your
                                <br />
                                <span className="font-medium">dream home?</span>
                            </h1>
                            <p className="text-white/70 text-lg max-w-md leading-relaxed">
                                Our team of experienced agents is here to guide you through every step
                                of your real estate journey.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
                                    <BiPhoneIncoming className="h-4 w-4 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-white/50 text-xs">Call us</p>
                                    <p className="text-white text-sm">(555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
                                    <CgMail className="h-4 w-4 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-white/50 text-xs">Email us</p>
                                    <p className="text-white text-sm">hello@evergreen.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
                                    <BiMapPin className="h-4 w-4 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-white/50 text-xs">Visit us</p>
                                    <p className="text-white text-sm">Portland, OR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:w-1/2 bg-white p-8 lg:p-16 flex items-center">
                    <div className="w-full max-w-lg mx-auto">
                        <h2 className="text-2xl font-medium text-[#1a1a1a] mb-2">Get in touch</h2>
                        <p className="text-[#666] mb-8">Fill out the form below and we&apos;ll get back to you shortly.</p>

                        <form onSubmit={handleSubmitClick} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-[#333] block mb-2">Full Name</label>
                                    <input
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                        className="h-12 border-[#e5e5e5] focus:border-emerald-500 rounded-lg bg-[#fafafa]"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-[#333] block mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="h-12 border-[#e5e5e5] focus:border-emerald-500 rounded-lg bg-[#fafafa]"
                                        placeholder="(555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-[#333] block mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="h-12 border-[#e5e5e5] focus:border-emerald-500 rounded-lg bg-[#fafafa]"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-[#333] block mb-2">Message</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={4}
                                    className="w-full border border-[#e5e5e5] focus:border-emerald-500 rounded-lg bg-[#fafafa] p-3 text-[#333] focus:outline-none resize-none"
                                    placeholder="Tell us about what you're looking for..."
                                />
                            </div>

                            <Button className="w-full h-12 bg-[#1c3d2e] hover:bg-[#2a5a44] text-white rounded-lg">
                                Send Message <BiSend className="ml-2 h-4 w-4" />
                            </Button>
                        </form>

                        <p className="text-center text-[#999] text-sm mt-6">
                            By submitting, you agree to our{" "}
                            <a href="#" className="text-[#1c3d2e] hover:underline">Privacy Policy</a>
                        </p>
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

export default ContactUsFormVar4