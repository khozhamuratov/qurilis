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
		<div className='p-5 bg-[#f9f9f9]'>
			<h2 className='text-center'>Календарный график строительных процессов</h2>
			{tasks.length === 0 ? (
				<p>Нет данных</p>
			) : (
				<Gantt
					tasks={tasks}
					columnWidth={60}
					barFill={80}
					handleWidth={0}
					listCellWidth='155px'
					isEditable={false}
				/>
			)}
		</div>
	)
}

export default ConstructionTimeline
