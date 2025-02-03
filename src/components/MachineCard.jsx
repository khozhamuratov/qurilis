import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const MachineCard = ({ item }) => {
	console.log(item)
	return (
		<Link className='h-[500px] w-[400px]' to={item.path}>
			<Card className='flex flex-col'>
				<CardContent>
					<Typography gutterBottom variant='h5' component='div'>
						{item.title}
					</Typography>
					<Typography variant='body2' sx={{ color: 'text.secondary' }}>
						{item.params}
					</Typography>
				</CardContent>
				<div className='p-4'>
					<img src={item.img} className='object-cover' alt='Ekskavator' />
				</div>
			</Card>
		</Link>
	)
}

export default MachineCard
