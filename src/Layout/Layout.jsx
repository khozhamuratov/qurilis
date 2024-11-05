import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
	return (
		<div className='w-full flex flex-col bg-slate-200 '>
			<Sidebar />
			<div className='w-full h-screen'>
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
