import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
	return (
		<div className='flex w-full'>
			<Sidebar />
			<div className='bg-slate-200 w-full'>
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
