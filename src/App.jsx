import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import { routes } from './utils/routes'

function App() {
	return (
		<div className='flex'>
			<Routes>
				<Route element={<Layout />}>
					{routes.map(item => (
						<Route
							key={item.path}
							path={item.path}
							element={<item.component />}
						/>
					))}
				</Route>
			</Routes>
		</div>
	)
}

export default App
