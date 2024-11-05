import DeleteIcon from '@mui/icons-material/Delete'
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
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { setTableData } from '../store/TableSlice/tableSlice'

const initialData = [
	{
		id: uuidv4(),
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
		duration: '',
		selectedDate: dayjs(),
	},
]

function CrudTable() {
	const [data, setData] = useState(initialData)
	const { tableData } = useSelector(select => select.table)
	const dispatch = useDispatch()

	const handleChange = (id, field, value) => {
		const updatedData = data.map(row =>
			row.id === id ? { ...row, [field]: value } : row
		)
		console.log(updatedData)

		setData(updatedData)
	}

	const handleDateChange = (id, newDate) => {
		const formattedDate = dayjs(newDate) // Обеспечиваем формат dayjs
		handleChange(id, 'selectedDate', formattedDate)
	}

	useEffect(() => {
		if (tableData.length) {
			setData([...tableData, { ...initialData[0], id: uuidv4() }])
		}
	}, [tableData])

	const handleAddRow = () => {
		setData([
			...data,
			{
				id: uuidv4(),
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
				duration: '',
				selectedDate: null,
			},
		])
	}

	const handleDeleteRow = id => {
		setData(data.filter(row => row.id !== id))
	}

	const handleSaveData = () => {
		const updatedData = data.map(row => {
			const duration = calculateDuration(row)
			const endDate = row.selectedDate
				? dayjs(row.selectedDate).add(duration, 'day').format('YYYY-MM-DD')
				: null

			return {
				...row,
				peoplesDay: calculateKishiKun(row),
				machineDay: calculateMashKun(row),
				duration,
				startDate: row.selectedDate.format('YYYY-MM-DD'),
				endDate,
			}
		})

		dispatch(setTableData(updatedData))
	}
	function strToNum(str) {
		const match = str.match(/^\d+/)
		return match ? Number(match[0]) : null
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

		return result < 1 ? 1 : Math.round(result) + 1
	}

	return (
		<div className='w-full p-4 gap-5'>
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
								width={250}
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
								width={30}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Ishlar davomiyligi, kun
							</TableCell>
							<TableCell
								rowSpan={2}
								width={30}
								sx={{
									textAlign: 'center',
									backgroundColor: '#f5f5f5',
									border: 1,
									borderColor: 'grey.300',
								}}
							>
								Boshlanish sanasi
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
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<MobileDatePicker
											sx={{ width: '120px' }}
											value={row.selectedDate ? dayjs(row.selectedDate) : null}
											onChange={newDate => handleDateChange(row.id, newDate)}
										/>
									</LocalizationProvider>
								</TableCell>
								<TableCell
									sx={{
										textAlign: 'center',
										border: 1,
										borderColor: 'grey.300',
										padding: '0',
									}}
								>
									<Button onClick={() => handleDeleteRow(row.id)}>
										<DeleteIcon className='text-[12px]' />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<div
					aria-required='true'
					className='flex w-[80%] py-5 gap-5 justify-between mx-auto items-center'
				>
					<Button className='w-full !bg-slate-800' onClick={handleSaveData}>
						<p className='text-white'>saqlash</p>
					</Button>
				</div>
			</TableContainer>
		</div>
	)
}

export default CrudTable
