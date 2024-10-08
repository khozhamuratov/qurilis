import React from 'react'
import { Link } from 'react-router-dom'
import DropdownButton from '../components/DropdownButton'

const LinkOrganization = [
	{
		title: 'Mehnat sarfi',
		path: 'table',
		target: '',
	},
	{
		title: 'Kalendar grafik',
		path: 'chart',
		target: '',
	},
	{
		title: 'Shaharsozlik normalari va qoidalari',
		path: 'https://mc.uz/oz/documents/shaharsozlik-normalari-va-qoidalari',
		target: '_blank',
	},
]
const LinkMachine = [
	{
		title: 'Texnikalar broni',
		path: 'reservation',
		target: '',
	},
	{
		title: 'Texnikalar jadvali',
		path: 'techno',
		target: '',
	},
]

const Sidebar = () => {
	return (
		<section className='min-w-[340px] p-7 z-10 bg-slate-800 font-serif text-white h-screen'>
			<div className='flex flex-col gap-7'>
				<Link to='/' className='text-[28px] text-center'>
					Qurilishni tashkil etish
				</Link>
				<DropdownButton
					label={'Qurilishni tashkil etish'}
					items={LinkOrganization}
				/>
				<DropdownButton
					label={'Qurilish mashinalar va texnikalar'}
					items={LinkMachine}
				/>
			</div>
		</section>
	)
}

export default Sidebar
