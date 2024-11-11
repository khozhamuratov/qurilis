import { Gantt } from 'gantt-task-react'
import 'gantt-task-react/dist/index.css'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ConstructionTimeline = () => {
	const dispatch = useDispatch()
	const { tableData } = useSelector(select => select.table)

	console.log(tableData)
	const initialTasks = tableData.map(item => ({
		id: item.id,
		name: item.name,
		start: item.startDate ? new Date(item.startDate) : new Date(2024, 8, 1),
		end: item.endDate ? new Date(item.endDate) : new Date(2024, 8, 10),
		progress: item.progress || 40,
		type: 'task',
		styles: { backgroundColor: '#6aa84f', color: '#fff' },
	}))

	const [tasks] = useState(initialTasks)

	return (
		<div className='p-5'>
			{tasks.length === 0 ? (
				<p>Ma`lumotlar topilmadi</p>
			) : (
				<>
					<h2 className='text-center mb-4 text-[22px] font-semibold'>
						Qurilish processlarining kalendar grafiki
					</h2>
					<div className='bg-white rounded-md'>
						<Gantt
							handleWidth={70}
							tasks={tasks}
							columnWidth={80}
							barFill={40}
							listCellWidth='250px'
							isEditable={true}
							styles={{
								barBackgroundColor: '#d1e7ff',
								barProgressColor: '#007bff',
								barBorderRadius: 4,
								backgroundColor: '#ffffff',
								gridColor: '#e5e5e5',
								todayLineColor: '#ff6347',
							}}
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default ConstructionTimeline
