import { GanttComponent } from '@syncfusion/ej2-react-gantt'
import 'gantt-task-react/dist/index.css'
import React, { useState } from 'react'

const ConstructionTimeline = () => {
	const initialTasks = [
		{
			TaskID: '1',
			TaskName: 'Земляные работы',
			StartDate: new Date(2024, 8, 1),
			EndDate: new Date(2024, 8, 10),
			progress: 40,
			type: 'task',
			styles: { backgroundColor: '#6aa84f', color: '#fff' },
		},
		{
			TaskID: '2',
			TaskName: 'Фундамент',
			StartDate: new Date(2024, 8, 11),
			EndDate: new Date(2024, 8, 20),
			progress: 60,
			dependencies: ['1'],
			type: 'task',
			styles: { backgroundColor: '#f6b26b', color: '#fff' },
		},
		{
			TaskID: '3',
			TaskName: 'Возведение стен',
			StartDate: new Date(2024, 8, 21),
			EndDate: new Date(2024, 8, 30),
			progress: 20,
			dependencies: ['2'],
			type: 'task',
			styles: { backgroundColor: '#e06666', color: '#fff' },
		},
		{
			TaskID: '4',
			TaskName: 'Параллельная работа 1',
			StartDate: new Date(2024, 8, 5),
			EndDate: new Date(2024, 8, 10),
			progress: 50,
			type: 'task',
			styles: { backgroundColor: '#2b7a78', color: '#fff' },
		},
		{
			TaskID: '5',
			TaskName: 'Параллельная работа 2',
			StartDate: new Date(2024, 8, 5),
			EndDate: new Date(2024, 8, 10),
			progress: 30,
			type: 'task',
			styles: { backgroundColor: '#f15a22', color: '#fff' },
		},
	]

	const [tasks, setTasks] = useState(initialTasks)

	const onTaskUpdate = updatedTask => {
		const updatedTasks = tasks.map(task =>
			task.id === updatedTask.id ? { ...task, ...updatedTask } : task
		)
		setTasks(updatedTasks)
	}

	let data = [
		{
			TaskID: 1,
			TaskName: 'Project Initiation',
			StartDate: new Date('04/02/2019'),
			EndDate: new Date('04/21/2019'),
			subtasks: [
				{
					TaskID: 2,
					TaskName: 'Identify Site location',
					StartDate: new Date('04/02/2019'),
					Duration: 4,
					Progress: 50,
				},
				{
					TaskID: 3,
					TaskName: 'Perform Soil test',
					StartDate: new Date('04/02/2019'),
					Duration: 4,
					Progress: 50,
				},
				{
					TaskID: 4,
					TaskName: 'Soil test approval',
					StartDate: new Date('04/02/2019'),
					Duration: 4,
					Progress: 50,
				},
			],
		},
		{
			TaskID: 5,
			TaskName: 'Project Estimation',
			StartDate: new Date('04/02/2019'),
			EndDate: new Date('04/21/2019'),
			subtasks: [
				{
					TaskID: 6,
					TaskName: 'Develop floor plan for estimation',
					StartDate: new Date('04/04/2019'),
					Duration: 3,
					Progress: 50,
				},
				{
					TaskID: 7,
					TaskName: 'List materials',
					StartDate: new Date('04/04/2019'),
					Duration: 3,
					Progress: 50,
				},
				{
					TaskID: 8,
					TaskName: 'Estimation approval',
					StartDate: new Date('04/04/2019'),
					Duration: 3,
					Progress: 50,
				},
			],
		},
	]
	let taskSettings = {
		id: 'TaskID',
		name: 'TaskName',
		startDate: 'StartDate',
		endDate: 'EndDate',
		duration: 'Duration',
		progress: 'Progress',
		child: 'subtasks',
	}

	return (
		<div className='p-5 bg-[#f9f9f9]'>
			<h2 className='text-center'>Календарный график строительных процессов</h2>
			<div>
				{/* <Gantt
					arrowIndent={0}
					rowHeight={30} // Height of each task row
					columnWidth={30} // Width of each column
					taskListWidth={200} // Width of task list on the left
					barFill={80} // Width of the task bars
					handleWidth={8} // Width of the drag handles
					tasks={tasks}
					onTaskUpdate={onTaskUpdate} // Function to handle task updates
					styles={{
						grid: { stroke: '#ccc' }, // Grid line color
						task: { stroke: '#000' }, // Task border color
					}}
				/> */}
				<GanttComponent
					dataSource={initialTasks}
					treeColumnIndex={1}
					taskFields={taskSettings}
				></GanttComponent>
			</div>
		</div>
	)
}

export default ConstructionTimeline
