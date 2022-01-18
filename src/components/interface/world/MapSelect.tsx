import {
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	Select
} from '@mui/material';
import { useField } from 'react-final-form';

import Sprite from 'components/Sprite';
import { Dungeons } from 'utils/data';
import playerIcon from 'assets/world/icons/player.png';

import { useMapContext } from './MapProvider';

const MapSelect = () => {
	const { map, setMap } = useMapContext();
	const {
		input: { value: respawn }
	} = useField<number>(`active_dungeon`, { subscription: { value: true } });
	return (
		<FormControl variant="standard">
			<InputLabel id="map-select-label">Map</InputLabel>
			<Select
				id="map-select"
				labelId="map-select-label"
				value={map}
				onChange={e => setMap(e.target.value as number)}
				renderValue={selected =>
					Dungeons[selected as number]?.name ?? 'Overworld'
				}
			>
				{[-1, ...Dungeons.filter(d => d).map(d => d.id)].map(o => (
					<MenuItem key={o} value={o}>
						<ListItemText>{Dungeons[o]?.name ?? 'Overworld'}</ListItemText>
						{respawn === o && <Sprite img={playerIcon} width={8} />}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default MapSelect;
