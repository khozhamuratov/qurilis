import React from 'react'
import {
	Buldozer,
	Ekskovator,
	EksPogruzchik,
	Greyder,
	MiniEkskovator,
	Pogruzchik,
	Samosval,
	Yotquzuvchi,
} from '../assets/index'
import MachineCard from '../components/MachineCard'

const TechnicaPage = () => {
	const MachineData = [
		{
			id: 1,
			title: 'Qurilish ekskovatori',
			params: '14 ta texnika modeli',
			path: 'ekskovator',
			img: Ekskovator,
		},
		{
			id: 2,
			title: 'Qurilish buldozerlari',
			params: '12 ta texnika modeli',
			path: 'buldozer',
			img: Buldozer,
		},
		{
			id: 3,
			title: 'Qurilish pogruzchiklari',
			params: '6 ta texnika modeli',
			path: 'pogruzchiklar',
			img: Pogruzchik,
		},
		{
			id: 4,
			title: 'Qurilish mini-ekskovatorlari',
			params: '2 ta texnika modeli',
			path: 'mini-ekskovator',
			img: MiniEkskovator,
		},
		{
			id: 5,
			title: 'Qurilish ekskovator-pogruzchiklari',
			params: '3 ta texnika modeli',
			path: 'ekskovator-pogruzchik',
			img: EksPogruzchik,
		},
		{
			id: 6,
			title: 'Greyderlar',
			params: '1 ta texnika modeli',
			path: 'greyder',
			img: Greyder,
		},
		{
			id: 7,
			title: 'Quvur yotqizuvchi',
			params: '3 ta texnika modeli',
			path: 'yotqizuvchi',
			img: Yotquzuvchi,
		},
		{
			id: 8,
			title: 'Qurilish samosvali',
			params: '1 ta texnika modeli',
			path: 'samosval',
			img: Samosval,
		},
	]

	return (
		<div className='p-3'>
			<h1>Qurilish texnikalari</h1>

			<div
				className='grid grid-cols-4 gap-4'
				style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}
			>
				{MachineData.map(item => (
					<MachineCard key={item.id} item={item} />
				))}
			</div>
		</div>
	)
}

export default TechnicaPage
