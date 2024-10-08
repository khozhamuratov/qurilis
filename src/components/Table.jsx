import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTable } from 'react-table'

const EditableTable = () => {
	const initialData = [
		{
			index: 1,
			name: '',
			unit: '',
			numUnit: '',
			volumePeople: '',
			volumeMachine: '',
			peoplesDay: '',
			machineDay: '',
			duration: '',
			shifts: '',
			workers: '',
			team: '',
		},
	]

	const [data, setData] = useState(initialData)

	const columns = React.useMemo(
		() => [
			{ Header: 'Nomeri', accessor: 'index', minWidth: 20 },
			{ Header: 'Ishlarning nomlanishi', accessor: 'name', minWidth: 250 },
			{ Header: "O'lchov birligi", accessor: 'unit', minWidth: 30 },
			{ Header: 'Soni', accessor: 'numUnit', minWidth: 20 },
			{ Header: `Me'yor kishi-soat`, accessor: 'volumePeople', minWidth: 100 },
			{ Header: "Me'yor Mash.-soat", accessor: 'volumeMachine', minWidth: 100 },
			{
				Header: 'Kishi-kun',
				accessor: 'peoplesDay',
				minWidth: 10,
			},
			{ Header: 'Mash-kun', accessor: 'machineDay', minWidth: 50 },
			{
				Header: 'Ishchilar zveno tarkibi va soni',
				accessor: 'duration',
				minWidth: 100,
			},
			{ Header: 'Smenalar soni', accessor: 'shifts', minWidth: 30 },
			{ Header: 'Smenadagi ishchilar soni', accessor: 'workers', minWidth: 50 },
			{ Header: 'Ishlar davomiyligi, kun', accessor: 'team', minWidth: 50 },
		],
		[]
	)

	const { control, handleSubmit, reset } = useForm({
		defaultValues: { rows: data },
	})

	const onSubmit = data => {
		console.log('Отправленные данные:', data)
	}

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data,
		})

	const addRow = () => {
		setData([
			...data,
			{
				index: 1,
				name: '',
				unit: '',
				numUnit: '',
				volumePeople: '',
				volumeMachine: '',
				peoplesDay: '',
				machineDay: '',
				duration: '',
				shifts: '',
				workers: '',
				team: '',
			},
		])
	}

	const removeRow = () => {
		if (data.length > 1) {
			setData(data.slice(0, data.length - 1))
		} else {
			alert('Невозможно удалить последнюю строку')
		}
	}

	return (
		<form className='mx-5 mt-10' onSubmit={handleSubmit(onSubmit)}>
			<table
				{...getTableProps()}
				className='border-collapse border border-gray-300'
			>
				<thead>
					<tr>
						<th
							rowSpan='2'
							className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'
						>
							№
						</th>
						<th
							rowSpan='2'
							className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'
						>
							Ishlarning nomlanishi
						</th>
						<th
							colSpan='2'
							className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'
						>
							Ishlar hajmi
						</th>
						<th
							colSpan='2'
							className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'
						>
							Vaqt me’yori
						</th>
						<th
							colSpan='2'
							className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'
						>
							Mehnat sarfi
						</th>
						<th
							rowSpan='2'
							className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'
						>
							Ishchilar zveno tarkibi va soni
						</th>
						<th
							rowSpan='2'
							className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'
						>
							Smenalar soni
						</th>
						<th
							rowSpan='2'
							className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'
						>
							Smenadagi ishchilar soni
						</th>
						<th
							rowSpan='2'
							className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'
						>
							Ishlar davomiyligi, kun
						</th>
					</tr>
					<tr>
						<th className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'>
							O'lchov birligi
						</th>
						<th className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'>
							Soni
						</th>
						<th className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'>
							Me'yor kishi-soat
						</th>
						<th className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'>
							Me'yor Mash.-soat
						</th>
						<th className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'>
							Kishi-kun
						</th>
						<th className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center bg-gray-100'>
							Mash-kun
						</th>
					</tr>
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, rowIndex) => {
						prepareRow(row)
						const { key, ...rest } = row.getRowProps()
						return (
							<tr key={key} {...rest}>
								{row.cells.map((cell, index) => (
									<td
										key={rowIndex}
										{...cell.getCellProps()}
										className='border border-gray-300 text-[14px] font-normal px-1 py-1 text-center'
									>
										<Controller
											name={`rows[${rowIndex}].${cell.column.id}`}
											control={control}
											render={({ field }) => (
												<React.Fragment>
													<input
														{...field}
														className='w-full text-center focus:outline-none'
														style={{
															minWidth: cell.column.minWidth,
															maxWidth: '100%',
														}}
													/>
												</React.Fragment>
											)}
										/>
									</td>
								))}
							</tr>
						)
					})}
				</tbody>
			</table>
			<div className='mt-4 flex justify-between'>
				<div className='flex items-center justify-center gap-3'>
					<button
						type='button'
						className='bg-green-500 text-white px-4 py-2 rounded'
						onClick={addRow}
					>
						+ Добавить строку
					</button>
					<button
						type='button'
						className='bg-red-500 text-white px-4 py-2 rounded'
						onClick={removeRow}
					>
						- Удалить строку
					</button>
				</div>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded'
				>
					Сохранить
				</button>
			</div>
		</form>
	)
}

export default EditableTable
