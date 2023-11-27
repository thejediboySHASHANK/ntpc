import React, {useContext, useState} from 'react'
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {UserContext, UserContextProvider} from "../context/UserContext.jsx";

const LoginPage = () => {
    const [empId, setEmpId] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUser}= useContext(UserContext)

    async function handleLogin (ev) {
        ev.preventDefault()
        try {
            const {data} = await axios.post('/login', {empId, password})
            Swal.fire(
                'Welcome Back!',
                'Login Successful',
                'success'
            )
            setUser(data)
            setRedirect(true)
        } catch (e) {
            console.log (e)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.response.data
            })
        }
    }

    if (redirect) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className="mt-12 grow flex items-center justify-around">
            <div className="mb-60">
                <h1 className="text-4xl text-center mb-4 text-[#002D74]">5S Login</h1>
                <form className="mx-auto border border-gray-300 p-12 rounded-3xl" onSubmit={handleLogin}>
                    <span className="ml-2 text-gray-500 font-medium">EMP ID *</span>
                    <input type="number"
                           placeholder="Please enter EMP ID"
                           value={empId}
                           onChange={ev => setEmpId(ev.target.value)}
                    />

                    <div className="mb-4"></div>

                    <span className="ml-2 text-gray-500 font-medium">PASSWORD *</span>
                    <input type="password"
                           placeholder="password"
                           value={password}
                           onChange={ev => setPassword(ev.target.value)}
                    />
                    <button className="primary mt-4">Login</button>

                    <div className="text-center py-2 text-gray-500">
                        Do not have an account yet? <Link className="underline text-black" to={'/register'}>Register now.</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}
export default LoginPage
