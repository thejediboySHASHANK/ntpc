import React, {useState} from 'react'
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

// IMPORTING THE CONSTANTS
import {dept} from "../assets/constants.jsx";
import {desig} from "../assets/constants.jsx";

import Image from "../assets/banner-01.jpg"
const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [empId, setEmpId] = useState('')
    const [password, setPassword] = useState('')
    const [zoneName, setZoneName] = useState('')
    const [zoneLeader, setZoneLeader] = useState('')
    const [department, setDepartment] = useState('')
    const [designation, setDesignation] = useState('')

    const[isLoading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    async function RegisterUser(ev) {
        ev.preventDefault()
        if(name === '') {
            setLoading(false)
            Swal.fire({
                icon: 'warning',
                title: 'Field Missing',
                text: 'Name field is missing'
            })
            return;
        }
        if(email === '') {
            setLoading(false)
            Swal.fire({
                icon: 'warning',
                title: 'Field Missing',
                text: 'Email field is missing'
            })
            return;
        }
        if(empId === '') {
            setLoading(false)
            Swal.fire({
                icon: 'warning',
                title: 'Field Missing',
                text: 'EMP ID field is missing'
            })
            return;
        }
        if(zoneName === '') {
            setLoading(false)
            Swal.fire({
                icon: 'warning',
                title: 'Field Missing',
                text: 'ZONE NAME field is missing'
            })
            return;
        }
        if(department === '') {
            setLoading(false)
            Swal.fire({
                icon: 'warning',
                title: 'Field Missing',
                text: 'Department field is missing'
            })
            return;
        }
        try {
            await axios.post('/register', {
                name,
                email,
                empId,
                zoneName,
                zoneLeader,
                department,
                designation,
                password,
            })
            Swal.fire(
                'Registration Successful!',
                'You can now login!',
                'success'
            )
            setRedirect(true)
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops... Registration Failed',
                text: e
            })
            setLoading(false)
        }


    }
    if (redirect) {
        return <Navigate to="/login" />
    }
    return (
            <div className="mt-4 grow flex items-center justify-around">
                <div className="mb-0">
                    <h1 className="text-4xl text-center mb-6 text-[#002D74]">5S Register</h1>
                    <form className="mx-auto border border-gray-300 py-12 px-6 rounded-3xl" onSubmit={RegisterUser}>
                        <div className="grid grid-cols-2 gap-x-6 mb-4">
                            <div>
                                <span className="ml-2 text-gray-500 font-medium">1. NAME *</span>
                                <input type="text"
                                       placeholder="Please enter name"
                                       value={name}
                                       onChange={ev => setName(ev.target.value)}
                                />
                            </div>
                            <div>
                                <span className="ml-2 text-gray-500 font-medium">2. EMAIL *</span>
                                <input type="email"
                                       placeholder="youremail.com"
                                       value={email}
                                       onChange={ev => setEmail(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-[1fr_2fr] gap-x-6 mb-4">
                            <div>
                                <span className="ml-2 text-gray-500 font-medium">3. EMP ID *</span>
                                <input type="number"
                                       placeholder="Please enter your EMP ID"
                                       value={empId}
                                       onChange={ev => setEmpId(ev.target.value)}
                                />
                            </div>
                            <div>
                                <span className="ml-2 text-gray-500 font-medium">4. ZONE NAME *</span>
                                <input type="text"
                                       placeholder="Please enter Zone name"
                                       value={zoneName}
                                       onChange={ev => setZoneName(ev.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-6 mb-4">
                            <div>
                                <span className="ml-2 text-gray-500 font-medium">5. ZONE LEADER</span>
                                <input type="text"
                                       placeholder="zone leader"
                                       value={zoneLeader}
                                       onChange={ev => setZoneLeader(ev.target.value)}
                                />
                            </div>
                            <div>
                                <span className="ml-2 text-gray-500 font-medium">6. DEPARTMENT *</span>
                                <select
                                    value={department}
                                    onChange={ev => setDepartment(ev.target.value)}
                                    className="w-full border border-gray-300 bg-gray-50 my-2 py-2 px-2 rounded-2xl focus:bg-white"
                                >
                                    {dept.map((depts) => (
                                        <option
                                            key={depts}
                                            className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                                            value={depts}
                                        >
                                            {depts}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-6 mb-4">
                            <div>
                                <span className="ml-2 text-gray-500 font-medium">7. DESIGNATION</span>
                                <select
                                    value={designation}
                                    onChange={ev => setDesignation(ev.target.value)}
                                    className="w-full border border-gray-300 bg-gray-50 my-2 py-2 px-2 rounded-2xl focus:bg-white"
                                >
                                    {desig.map((des) => (
                                        <option
                                            key={des}
                                            className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                                            value={des}
                                        >
                                            {des}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <span className="ml-2 text-gray-500 font-medium">8. PASSWORD *</span>
                                <input type="password"
                                       placeholder="password"
                                       value={password}
                                       onChange={ev => setPassword(ev.target.value)}
                                />
                            </div>
                        </div>


                        <button className={`${isLoading ? 'primary opacity-60' : 'primary'} hover:font-bold`} onClick={() => setLoading(true)}>
                            {isLoading ? (<p>Registering</p>) : (<p>Register</p>)}
                        </button>
                        <div className="text-center py-2 text-gray-500">
                            Already have an account? <Link className="underline text-black" to={'/login'}>Login.</Link>
                        </div>
                    </form>
                </div>
            </div>

    )
}
export default RegisterPage
