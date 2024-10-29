import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const MachineCard = ({ item }) => {
	console.log(item)
	return (
		<Card className='rounded-md flex flex-col' sx={{ maxWidth: 345 }}>
			<CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					{item.title}
				</Typography>
				<Typography variant='body2' sx={{ color: 'text.secondary' }}>
					{item.params}
				</Typography>
			</CardContent>
			<div className='p-4'>
				<CardMedia
					component='img'
					height='200'
					src={item.img}
					className='mt-auto inline-block w-[200px] h-[200px] overflow-visible object-cover p-4'
					alt='Ekskavator'
				/>
			</div>
		</Card>
	)
}

export default MachineCard
