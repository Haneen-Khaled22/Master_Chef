import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '../../Pages/Footer/Footer'
import NavBar from '../../Pages/NavBar/NavBar';


function Layout() {
    return (
         <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <NavBar />

            {/* Page Content */}
            <main className="flex-1 pt-8 px-24">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Layout
