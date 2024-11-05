import MenuIcon from '@mui/icons-material/Menu'
import {
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
} from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DropdownButton from '../components/DropdownButton'

const LinkOrganization = [
	{ title: 'Mehnat sarfi', path: 'table', target: '' },
	{ title: 'Kalendar grafik', path: 'chart', target: '' },
	{
		title: 'Shaharsozlik normalari va qoidalari',
		path: 'https://mc.uz/oz/documents/shaharsozlik-normalari-va-qoidalari',
		target: '_blank',
	},
]

const LinkMachine = [
	{ title: 'Texnikalar broni', path: 'reservation', target: '' },
	{ title: 'Texnikalar jadvali', path: 'techno', target: '' },
]

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleDrawer = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<IconButton
				className='w-[50px] h-[60px] absolute z-20'
				onClick={toggleDrawer}
				color='inherit'
			>
				<MenuIcon />
			</IconButton>
			<Drawer
				anchor='left'
				open={isOpen}
				onClose={toggleDrawer}
				sx={{
					'& .MuiDrawer-paper': {
						width: 300,
						backgroundColor: '#1e293b',
						color: 'white',
					},
				}}
			>
				<List sx={{ padding: 2 }}>
					<Link to={'/'}>
						<ListItem>
							<ListItemText
								primary='Qurilishni tashkil etish'
								primaryTypographyProps={{ fontSize: 24, textAlign: 'center' }}
							/>
						</ListItem>
					</Link>
					<Divider />
					<DropdownButton
						label='Qurilishni tashkil etish'
						items={LinkOrganization}
					/>
					<DropdownButton
						label='Qurilish mashinalar va texnikalar'
						items={LinkMachine}
					/>
				</List>
			</Drawer>
		</>
	)
}

export default Sidebar
