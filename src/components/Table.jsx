import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTable } from 'react-table'

const EditableTable = () => {
	const initialData = [
		{
			name: '',
			unit: '',
			volume: '',
			labor: '',
			machineName: '',
			machineCount: 0,
			duration: 0,
			shifts: 0,
			workers: 0,
			team: '',
		},
	]

	const [data, setData] = useState(initialData)

	const columns = React.useMemo(
		() => [
			{ Header: 'Nomi', accessor: 'name', minWidth: 250 },
			{ Header: "O'l. bir.", accessor: 'unit', minWidth: 50 },
			{ Header: 'Ish hajmlari miqdori', accessor: 'volume', minWidth: 100 },
			{ Header: 'Mehnat sarfi, kishi-kun', accessor: 'labor', minWidth: 100 },
			{
				Header: 'Talab etiladigan mashinalar',
				accessor: 'machineName',
				minWidth: 120,
			},
			{ Header: 'Mash-smena soni', accessor: 'machineCount', minWidth: 50 },
			{ Header: 'Ish davomiyligi, kunlar', accessor: 'duration', minWidth: 50 },
			{ Header: 'Smena soni', accessor: 'shifts', minWidth: 30 },
			{ Header: 'Smenadagi ishchilar soni', accessor: 'workers', minWidth: 50 },
			{ Header: 'Brigada tarkibi', accessor: 'team', minWidth: 130 },
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
				name: '',
				unit: '',
				volume: '',
				labor: '',
				machineName: '',
				machineCount: 0,
				duration: 0,
				shifts: 0,
				workers: 0,
				team: '',
			},
		])
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
				<button
					type='button'
					className='bg-green-500 text-white px-4 py-2 rounded'
					onClick={addRow}
				>
					+ Добавить строку
				</button>
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