import React, {useContext} from 'react'
import NTPC from "../assets/1280px-NTPC_Logo.svg.png";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";

const Navbar = () => {
    const {user} = useContext(UserContext)
    return (
        <div>
            {/*border-b-2 border-gray-200*/}
            <header className="flex justify-between">
                <Link to={'/'}>
                    <img className="w-40 h-20 block" src={NTPC} alt="logo" draggable="false"/>
                </Link>
                <div className="flex gap-4 rounded-full py-6 px-4">
                    <div className="text-xl flex gap-1 hover:underline hover:text-primary cursor-pointer">
                        About 5S
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-5 h-5 mt-1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                        </svg>
                    </div>
                    <div className="border-l border-gray-300 h-8"></div>
                    <div className="text-xl hover:underline hover:text-primary cursor-pointer">Departments</div>
                    <div className="border-l border-gray-300 h-8"></div>
                    <div className="text-xl hover:underline hover:text-primary cursor-pointer">Charts</div>
                </div>
                <Link to={user ? '/account' : "/login"} className="flex items-center gap-2 rounded-full py-4 px-4 cursor-pointer">
                    <Link to={'/'} className="flex border border-gray-300 rounded-2xl py-2 px-4 items-center mr-2 md:mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                        </svg>
                    </Link>
                    <div className="border border-gray-300 py-2 px-6 rounded-full flex gap-3 overflow-hidden">
                        {!!user ? (
                            <div>
                                <span className="text-lg font-semibold hover:text-primary">{user.name}</span>
                            </div>
                        ) : (
                            <span className="text-lg font-semibold hover:text-primary">Login / Register</span>
                        )}
                        <div className="bg-primary text-white rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-6 h-6 relative top-1.5">
                                <path fill-rule="evenodd"
                                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </Link>
            </header>
        </div>
    )
}
export default Navbar
