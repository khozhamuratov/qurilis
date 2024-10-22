import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material'
import React, { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

const initialData = [
	{
		id: 1,
		name: '',
		unit: '',
		numUnit: '',
		volumePeople: '',
		volumeMachine: '',
		peoplesDay: '',
		machineDay: '',
		nameTeam: '',
		numTeam: '',
		shifts: '',
		workers: '',
		duration: '', // Calculated field
	},
]

function CrudTable() {
	const [data, setData] = useState(initialData)
	const [value, setValue] = useState({
		startDate: null,
		endDate: null,
	})
	const handleChange = (id, field, value) => {
		const updatedData = data.map(row =>
			row.id === id ? { ...row, [field]: value } : row
		)
		setData(updatedData)
	}

	const handleAddRow = () => {
		setData([
			...data,
			{
				id: data.length + 1,
				name: '',
				unit: '',
				numUnit: '',
				volumePeople: '',
				volumeMachine: '',
				peoplesDay: '',
				machineDay: '',
				nameTeam: '',
				numTeam: '',
				shifts: '',
				workers: '',
				duration: '', // Calculated field
			},
		])
	}

	function strToNum(str) {
		const match = str.match(/^\d+/)
		return match ? Number(match[0]) : null
	}

	const handleDeleteRow = id => {
		setData(data.filter(row => row.id !== id))
	}

	const handleSaveData = () => {
		const updatedData = data.map(row => ({
			...row,
			peoplesDay: calculateKishiKun(row),
			machineDay: calculateMashKun(row),
			duration: calculateDuration(row),
			startDate: value.startDate,
		}))
		console.log('Data saved:', updatedData)
	}

	const calculateKishiKun = row => {
		const unit = strToNum(row.unit)
		const unitsNum = row.numUnit / unit
		const result = (row?.volumePeople * unitsNum) / 8.2

		return result ? result.toFixed(2) : 0
	}

	const calculateMashKun = row => {
		const unit = strToNum(row.unit)
		const unitsNum = row.numUnit / unit
		const result = (row?.volumeMachine * unitsNum) / 8.2

		return result ? result.toFixed(2) : 0
	}

	const calculateDuration = row => {
		const kishiKun = calculateKishiKun(row)
		const mashKun = calculateMashKun(row)
		let result

		if ((kishiKun && mashKun) || kishiKun) {
			result = parseFloat(kishiKun)

			if (row.numTeam) {
				result = (result / row.numTeam).toFixed(2)

				console.log(result)
			}
			if (row.shifts) {
				result = result / row.shifts
			}
		} else {
			result = parseFloat(mashKun)

			if (row.numTeam) {
				result = (result / row.numTeam).toFixed(2)
			} else if (row.shifts) {
				result = result / row.shifts
			}
		}

		return result < 1 ? 1 : Math.round(result)
	}

	return (
		<div className='flex flex-col items-start justify-center p-4 gap-5'>
			<TableContainer
				component={Paper}
				sx={{ maxWidth: '100%', overflowX: 'auto', fontSize: 12 }}
			>
				<Table
					sx={{
						minWidth: 650,
						border: 1,
						borderColor: 'grey.300',
						borderCollapse: 'collapse',
					}}
				>
					<TableHead>
						<TableRow>
							<TableCell
								rowSpan={2}
								width={10}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								№
							</TableCell>
							<TableCell
								rowSpan={2}
								width={350}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Ishlarning nomlanishi
							</TableCell>
							<TableCell
								colSpan={2}
								width={100}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Ishlar hajmi
							</TableCell>
							<TableCell
								colSpan={2}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Vaqt me’yori
							</TableCell>
							<TableCell
								colSpan={2}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Mehnat sarfi
							</TableCell>
							<TableCell
								rowSpan={2}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Ishchilar zveno tarkibi
							</TableCell>{' '}
							<TableCell
								rowSpan={2}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Soni
							</TableCell>
							<TableCell
								rowSpan={2}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Smenalar soni
							</TableCell>
							<TableCell
								rowSpan={2}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Smenadagi ishchilar soni
							</TableCell>
							<TableCell
								rowSpan={2}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Ishlar davomiyligi, kun
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell
								width={50}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								O'lchov birligi
							</TableCell>
							<TableCell
								width={100}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Soni
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Me'yor kishi-soat
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Me'yor Mash.-soat
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Kishi-kun
							</TableCell>
							<TableCell
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Mash-kun
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) => (
							<TableRow key={row.id}>
								<TableCell
									sx={{
										textAlign: 'center',
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
									}}
								>
									{index + 1}
								</TableCell>
								<TableCell
									sx={{
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
										width: '100%',
									}}
								>
									<TextField
										fullWidth
										value={row.name}
										onChange={e => handleChange(row.id, 'name', e.target.value)}
										variant='outlined'
										size='small'
										sx={{ borderRadius: 0, width: '100%' }}
									/>
								</TableCell>
								<TableCell
									sx={{
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
										width: '100%',
									}}
								>
									<TextField
										fullWidth
										value={row.unit}
										onChange={e => handleChange(row.id, 'unit', e.target.value)}
										variant='outlined'
										size='small'
										sx={{ borderRadius: 0, width: '100%' }}
									/>
								</TableCell>
								<TableCell
									sx={{
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
										width: '100%',
									}}
								>
									<TextField
										fullWidth
										value={row.numUnit}
										onChange={e =>
											handleChange(row.id, 'numUnit', e.target.value)
										}
										variant='outlined'
										size='small'
										sx={{ borderRadius: 0, width: '100%' }}
									/>
								</TableCell>
								<TableCell
									sx={{
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
										width: '100%',
									}}
								>
									<TextField
										fullWidth
										value={row.volumePeople}
										onChange={e =>
											handleChange(row.id, 'volumePeople', e.target.value)
										}
										variant='outlined'
										size='small'
										sx={{ borderRadius: 0, width: '100%' }}
									/>
								</TableCell>
								<TableCell
									sx={{
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
										width: '100%',
									}}
								>
									<TextField
										fullWidth
										value={row.volumeMachine}
										onChange={e =>
											handleChange(row.id, 'volumeMachine', e.target.value)
										}
										variant='outlined'
										size='small'
										sx={{ borderRadius: 0, width: '100%' }}
									/>
								</TableCell>
								<TableCell
									sx={{
										textAlign: 'center',
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
									}}
								>
									{calculateKishiKun(row)}
								</TableCell>
								<TableCell
									sx={{
										textAlign: 'center',
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
									}}
								>
									{calculateMashKun(row)}
								</TableCell>
								<TableCell
									sx={{
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
										width: '100%',
									}}
								>
									<TextField
										fullWidth
										value={row.nameTeam}
										onChange={e =>
											handleChange(row.id, 'nameTeam', e.target.value)
										}
										variant='outlined'
										size='small'
										sx={{ borderRadius: 0, width: '100%' }}
									/>
								</TableCell>
								<TableCell
									sx={{
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
										width: '100%',
									}}
								>
									<TextField
										fullWidth
										value={row.numTeam}
										onChange={e =>
											handleChange(row.id, 'numTeam', e.target.value)
										}
										variant='outlined'
										size='small'
										className='text-[10px]'
										sx={{ borderRadius: 0, width: '100%' }}
									/>
								</TableCell>
								<TableCell
									sx={{
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
										width: '100%',
									}}
								>
									<TextField
										fullWidth
										value={row.shifts}
										onChange={e =>
											handleChange(row.id, 'shifts', e.target.value)
										}
										variant='outlined'
										size='small'
										sx={{ borderRadius: 0, width: '100%' }}
									/>
								</TableCell>
								<TableCell
									sx={{
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
										width: '100%',
									}}
								>
									<TextField
										fullWidth
										value={row.workers}
										onChange={e =>
											handleChange(row.id, 'workers', e.target.value)
										}
										variant='outlined'
										size='small'
										sx={{ borderRadius: 0, width: '100%' }}
									/>
								</TableCell>
								<TableCell
									sx={{
										textAlign: 'center',
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
									}}
								>
									{calculateDuration(row)}
								</TableCell>
								<TableCell
									sx={{
										textAlign: 'center',
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
									}}
								>
									<Button
										onClick={() => handleDeleteRow(row.id)}
										className='!bg-red-400'
									>
										<p className='text-[12px] text-black'>Ochirish</p>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<div className='flex w-[80%] py-5 gap-5 justify-between mx-auto items-center'>
					<Datepicker
						toggleClassName={'w-[40px]'}
						asSingle={true}
						useRange={false}
						inputClassName={
							'text-[14px] shadow-lg bg-slate-800 px-3 py-2 rounded-md w-full'
						}
						containerClassName={'w-[800px] flex items-center justify center'}
						placeholder='Qurilish boshlanadigan datani kiriting'
						value={value}
						onChange={newValue => setValue(newValue)}
					/>

					<Button
						className='w-full !bg-green-300'
						onClick={handleAddRow}
						color='primary'
					>
						Qator qoshish
					</Button>
					<Button
						className='w-full !bg-blue-300'
						onClick={handleSaveData}
						color='success'
					>
						saqlash
					</Button>
				</div>
			</TableContainer>
		</div>
	)
}

export default CrudTable
