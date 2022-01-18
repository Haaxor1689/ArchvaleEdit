import {
	Box,
	Typography,
	IconButton,
	FormControl,
	InputLabel,
	Input,
	Select,
	MenuItem
} from '@mui/material';
import { useField } from 'react-final-form';

import trash from 'assets/trash.png';
import Sprite from 'components/Sprite';
import { parseToHex } from 'utils';
import questionMark from 'assets/questionMark.png';
import RoomObjects, { ParsedObject } from 'utils/data/roomObjects';

type Props = {
	id: string;
	o: ParsedObject;
	i: number;
	onDelete: (i: number) => void;
};

const ObjectInfo = ({ id, o, i, onDelete }: Props) => {
	const meta = RoomObjects[o.type];
	const {
		input: { value, onChange }
	} = useField<string>(id, {
		subscription: { value: true }
	});

	const onAttribChange = (val: string, start: number, end: number) => {
		onChange({
			target: {
				value:
					value.slice(0, start) +
					parseToHex(Number(val), end - start) +
					value.slice(end)
			}
		});
	};

	return (
		<>
			<Box sx={{ display: 'flex', gap: 3, mb: -2 }}>
				<Sprite
					img={meta?.getIcon?.(o) ?? meta?.icon ?? questionMark}
					width={8}
					height={8}
					onClick={() => console.log(o)}
					sx={{ cursor: 'help' }}
				/>
				<Typography
					variant="caption"
					color="text.secondary"
					sx={{ flexGrow: 1 }}
				>
					Object
					<Typography color="text.primary" variant="h4">
						{meta?.name ?? `Unknown #${o.type}`}
					</Typography>
				</Typography>

				<IconButton
					onClick={() => onDelete(i)}
					sx={{
						justifySelf: 'flex-end',
						alignSelf: 'center'
					}}
				>
					<Sprite img={trash} size={0.3} />
				</IconButton>
			</Box>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					columnGap: 4,
					rowGap: 1
				}}
			>
				<Typography
					component="div"
					variant="caption"
					color="text.secondary"
					sx={{ flexGrow: 1 }}
				>
					Object
					<Select
						variant="standard"
						size="small"
						value={o.type}
						onChange={e => onAttribChange(e.target.value as string, 0, 4)}
						renderValue={selected => RoomObjects[selected]?.name}
						sx={{ mt: '0 !important' }}
						fullWidth
					>
						{Object.keys(RoomObjects).map(type => (
							<MenuItem key={type} value={type}>
								<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
									<Sprite
										img={
											RoomObjects[type as never]?.getIcon?.(o) ??
											RoomObjects[type as never]?.icon ??
											questionMark
										}
										width={6}
										height={6}
										mr={2}
									/>
									{RoomObjects[type as never]?.name ?? `Unknown #${type}`}
								</Box>
							</MenuItem>
						))}
					</Select>
				</Typography>

				<FormControl
					variant="standard"
					sx={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						alignItems: 'flex-end'
					}}
				>
					<InputLabel htmlFor={`${i}-x`}>Coordinates</InputLabel>
					<Input
						id={`${i}-x`}
						value={o.x}
						onChange={e => onAttribChange(e.target.value, 5, 8)}
						type="number"
						startAdornment={
							<Typography variant="body2" sx={{ pointerEvents: 'none', mr: 1 }}>
								X:
							</Typography>
						}
					/>
					<FormControl variant="standard">
						<Input
							value={o.y}
							onChange={e => onAttribChange(e.target.value, 9, 12)}
							type="number"
							startAdornment={
								<Typography
									variant="body2"
									sx={{ pointerEvents: 'none', mr: 1 }}
								>
									Y:
								</Typography>
							}
						/>
					</FormControl>
				</FormControl>

				{meta?.attributes?.map(a => (
					<Typography
						key={a.key}
						component="div"
						variant="caption"
						color="text.secondary"
					>
						{a.name}
						<Box>{a.getValue?.(o[a.key], onAttribChange) ?? a.key}</Box>
					</Typography>
				))}
			</Box>
		</>
	);
};
export default ObjectInfo;
