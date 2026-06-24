"use client"
import { Helpers } from '@/_lib/helper';
import React, { useState } from 'react'
import { FaAsterisk } from 'react-icons/fa6'
import { FiInfo } from 'react-icons/fi';
import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';

const helpers = new Helpers();
const FloatingPasswordInput = ({ name, label, placeholder, handleChange, handleBlur, type, required = false, value, disabled_field,
    subtext, autoComplete = "on", ...rest }: {
        name: string, label: string, placeholder: string, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        handleBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void, type?: string, required?: boolean,
        value?: string, disabled_field?: boolean, subtext?: string, autoComplete?: string
    }) => {

    let input_type = "text";
    if (type && type != "") {
        input_type = type;
    }

    const [curr_type, setCurrType] = useState<"password" | "text">("password");
    const handleType = (type: "show" | "hide") => {
        if (type == "show") {
            setCurrType("text");
        } else {
            setCurrType("password");
        }
    }

    return (
        <div className={`w-full bg-white dark:bg-dark-light border-2 border-gray-300 dark:border-gray-500 px-5 py-3 flex flex-col rounded-md 
            ${disabled_field && "!opacity-45 !cursor-not-allowed"}`} id='parent_id'>
            <div className='w-full flex items-center text-base font-medium'>
                <span className=' dark:text-dark-text'>{label}</span>
                {required && <FaAsterisk className='text-red-600 dark:text-red-400 ml-1' size={12} />}
            </div>
            <div className='w-full flex items-center relative'>
                <input type={curr_type} name={name} value={value} className='w-full h-11 font-normal text-base pl-1 outline-none 
                    placeholder:font-light placeholder:text-base appearance-none text-gray-700 dark:text-dark-text 
                    dark:bg-transparent' placeholder={placeholder} required={required}
                    disabled={disabled_field || false} onChange={(e) => { handleChange(e) }} {...rest}
                    onBlur={(e) => { if (handleBlur) { handleBlur(e) } }}
                    autoComplete={`${autoComplete}${helpers.GenarateRandomString(8)}`} />

                {curr_type == "password"
                    ? <div className='cursor-pointer' onClick={() => handleType("show")}>
                        <PiEyeLight size={30} className='dark:text-dark-text' />
                    </div>
                    : <div className='cursor-pointer' onClick={() => handleType("hide")}>
                        <PiEyeSlash size={30} className='dark:text-dark-text' />
                    </div>}

            </div>
            {subtext &&
                <div className='w-full flex items-start text-sm text-sky-600 font-medium italic'>
                    <div className='mr-1 w-fit mt-1'><FiInfo size={13} /></div> <div className=' flex-grow mr-auto'>{subtext}</div>
                </div>
            }
        </div>
    )
}

export default FloatingPasswordInput