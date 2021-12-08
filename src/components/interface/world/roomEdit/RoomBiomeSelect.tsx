import { Box, MenuItem, Select, Typography } from '@mui/material';
import { useField } from 'react-final-form';

import Sprite from 'components/Sprite';
import { Biomes } from 'utils/data';
import useShowUnused from 'utils/useShowUnused';

type Props = {
	index: number;
};

const RoomBiomeSelect = ({ index }: Props) => {
	const {
		input: { value, onChange }
	} = useField<number>(`world.rooms[${index}].biome_type`, {
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
			Biome
			<Select
				variant="standard"
				size="small"
				value={value}
				onChange={onChange}
				renderValue={s => Biomes[s]?.name ?? `Unknown #${s}`}
				sx={{ mt: '0 !important' }}
				fullWidth
			>
				{Object.keys(Biomes)
					.filter(
						type =>
							!!showUnused || !Biomes[type as never].name?.match(/^UNUSED /)
					)
					.map(type => (
						<MenuItem key={type} value={type}>
							<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
								<Sprite
									img={`${process.env.PUBLIC_URL}/assets/biomes/s_map_texture_${
										Biomes[type as never]?.sprite ?? 'empty'
									}_0.png`}
									width={6}
									height={6}
									mr={2}
								/>
								{Biomes[type as never].name}
							</Box>
						</MenuItem>
					))}
			</Select>
		</Typography>
	);
};

export default RoomBiomeSelect;
