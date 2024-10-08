import { Gantt } from 'gantt-task-react'
import 'gantt-task-react/dist/index.css'
import React, { useState } from 'react'

const ConstructionTimeline = () => {
	const initialTasks = [
		{
			id: '1',
			name: 'Земляные работы',
			start: new Date(2024, 8, 1),
			end: new Date(2024, 8, 10),
			progress: 40,
			type: 'task',
			styles: { backgroundColor: '#6aa84f', color: '#fff' },
		},
		{
			id: '2',
			name: 'Фундамент',
			start: new Date(2024, 8, 11),
			end: new Date(2024, 8, 20),
			progress: 60,
			dependencies: ['1'],
			type: 'task',
			styles: { backgroundColor: '#f6b26b', color: '#fff' },
		},
		{
			id: '3',
			name: 'Возведение стен',
			start: new Date(2024, 8, 21),
			end: new Date(2024, 8, 30),
			progress: 20,
			dependencies: ['2'],
			type: 'task',
			styles: { backgroundColor: '#e06666', color: '#fff' },
		},
		{
			id: '4',
			name: 'Параллельная работа 1',
			start: new Date(2024, 8, 5),
			end: new Date(2024, 8, 10),
			progress: 50,
			type: 'task',
			styles: { backgroundColor: '#2b7a78', color: '#fff' },
		},
		{
			id: '5',
			name: 'Параллельная работа 2',
			start: new Date(2024, 8, 5),
			end: new Date(2024, 8, 10),
			progress: 30,
			type: 'task',
			styles: { backgroundColor: '#f15a22', color: '#fff' },
		},
	]

	const [tasks] = useState(initialTasks)

	return (
		<div className='p-5 bg-[#f9f9f9]'>
			<h2 className='text-center'>Календарный график строительных процессов</h2>
			<Gantt
				tasks={tasks}
				columnWidth={60} // Ширина столбцов
				barFill={80} // Заполнение строки задачи
				handleWidth={0} // Отключение ручек перетаскивания
				listCellWidth='155px' // Ширина колонки списка задач
				// Отключаем редактирование и перетаскивание задач
				isEditable={false}
			/>
		</div>
	)
}

export default ConstructionTimeline
