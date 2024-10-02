import { useState } from 'react'
import { Link } from 'react-router-dom'

const DropdownButton = ({ label, items }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className='relative'>
			<button
				onClick={toggleDropdown}
				className='flex items-center justify-between gap-3 w-full px-4 py-2 text-left bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none'
			>
				<span>{label}</span>
				<svg
					className={`w-5 h-5 transition-transform duration-200 ${
						isOpen ? 'rotate-180' : 'rotate-0'
					}`}
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M19 9l-7 7-7-7'
					/>
				</svg>
			</button>
			{isOpen && (
				<ul className='absolute z-10 left-0 w-full mt-2 bg-gray-700 text-white rounded-lg shadow-lg'>
					{items.map((item, index) => (
						<li key={index} className='my-[25px]'>
							<Link
								className='text-base w-full p-3 hover:text-slate-900  hover:shadow-transparent'
								to={item.path}
								target={item.target}
							>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default DropdownButton
