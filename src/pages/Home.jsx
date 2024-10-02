import React from 'react'

const Home = () => {
	return (
		<div className='w-full h-screen'>
			<div className='bg-[url(background.jpg)] w-full h-screen top-0 left-0 absolute bg-cover bg-no-repeat'></div>
			{/* <img
				className='w-full h-screen object-cover absolute'
				src='background.jpg'
				alt='LOGO'
			/> */}
			<p className='z-10 text-[40px] font-serif text-slate-800 absolute right-0 mr-7 mt-7 text-right w-full'>
				Qurilish-montaj ishlarini taqvimiy rejalashtirish
			</p>
		</div>
	)
}

export default Home
