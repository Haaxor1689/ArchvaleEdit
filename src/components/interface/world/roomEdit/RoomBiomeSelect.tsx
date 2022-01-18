import { Box, MenuItem, Select, Typography } from '@mui/material';
import { useField } from 'react-final-form';

import Sprite from 'components/Sprite';
import { Biomes } from 'utils/data';
import useShowUnused from 'utils/useShowUnused';
import { getAsset } from 'utils';

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
				renderValue={s => (
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<Sprite
							img={getAsset(
								'biomes',
								`s_map_texture_${Biomes[s]?.sprite ?? 'empty'}`
							)}
							width={6}
							sx={{ mr: 2 }}
						/>
						{Biomes[s].name ?? `Unknown #${s}`}
					</Box>
				)}
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
									img={getAsset(
										'biomes',
										`s_map_texture_${Biomes[type as never]?.sprite ?? 'empty'}`
									)}
									width={6}
									sx={{ mr: 2 }}
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
