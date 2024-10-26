import { configureStore } from '@reduxjs/toolkit'
import tableSlice from './TableSlice/tableSlice'

export const store = configureStore({
	reducer: {
		table: tableSlice,
	},
	devTools: process.env.NODE_ENV === 'production' ? false : true,
})
