import { Box, MenuItem, Select, Typography } from '@mui/material';
import { useField } from 'react-final-form';

import Sprite from 'components/Sprite';
import { RoomTypes } from 'utils/data';
import useShowUnused from 'utils/useShowUnused';

type Props = {
	index: number;
};

const RoomTypeSelect = ({ index }: Props) => {
	const {
		input: { value, onChange }
	} = useField<number>(`world.rooms[${index}].type`, {
		subscription: { value: true }
	});

	const [showUnused] = useShowUnused();

	return (
		<Typography
			component="label"
			variant="caption"
			color="text.secondary"
			sx={{ flexGrow: 1 }}
		>
			Type
			<Select
				variant="standard"
				size="small"
				value={value}
				onChange={onChange}
				renderValue={s => RoomTypes[s]?.name ?? `Unknown #${s}`}
				sx={{ mt: '0 !important' }}
				fullWidth
			>
				{Object.keys(RoomTypes)
					.filter(k => Number(k) >= 0)
					.filter(
						type =>
							!!showUnused || !RoomTypes[type as never].name?.match(/^UNUSED /)
					)
					.map(type => (
						<MenuItem key={type} value={type}>
							<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
								<Sprite
									img={RoomTypes[type as never].sprite?.[0]}
									width={6}
									height={6}
									mr={2}
								/>
								{RoomTypes[type as never].name}
							</Box>
						</MenuItem>
					))}
			</Select>
		</Typography>
	);
};

export default RoomTypeSelect;
