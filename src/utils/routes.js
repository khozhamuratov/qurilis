import ChartPage from '../pages/ChartPage'
import Home from '../pages/Home'
import Machine from '../pages/Machine'
import ReservationPage from '../pages/ReservationPage'
import TablePage from '../pages/TablePage'
import TechnicaPage from '../pages/TechnicaPage'

export const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/chart',
		component: ChartPage,
	},
	{
		path: '/table',
		component: TablePage,
	},
	{
		path: '/reservation',
		component: ReservationPage,
	},
	{
		path: '/techno',
		component: TechnicaPage,
	},
	{
		path: '/techno/:slug',
		component: Machine,
	},
]
