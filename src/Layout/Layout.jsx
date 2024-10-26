import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
	return (
		<div className='flex'>
			<Sidebar />
			<div className='bg-slate-200'>
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
