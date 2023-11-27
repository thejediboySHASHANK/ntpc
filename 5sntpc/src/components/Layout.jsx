import React from 'react'
import Navbar from "./Navbar.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="p-4 flex flex-col min-h-screen mx-auto" style={{maxWidth: '1600px'}}>
            <Navbar/>
            <Outlet/>
        </div>
    )
}
export default Layout
