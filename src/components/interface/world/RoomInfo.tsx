import { Box, Typography } from '@mui/material';

import Sprite from 'components/Sprite';
import TextButton from 'components/TextButton';
import {
	Biomes,
	DungeonDirections,
	RoomTypes,
	WorldStateMeta
} from 'utils/data';
import useShowUnused from 'utils/useShowUnused';
import { filterRoomState, parseRoomDirection } from 'utils/roomUtils';

import { useMapContext } from './MapProvider';
import RoomEdit from './RoomEdit';
import RoomBiomeSelect from './roomEdit/RoomBiomeSelect';
import RoomTypeSelect from './roomEdit/RoomTypeSelect';
import RoomObjectsInfo from './RoomObjectsInfo';
import WorldState from './roomEdit/WorldState';
import DeleteRoomButton from './roomEdit/DeleteRoomButton';
import DifficultySwitch from './roomEdit/DifficultySwitch';
import RespawnSwitch from './roomEdit/RespawnSwitch';
import ExplorationSwitch from './roomEdit/ExplorationSwitch';

const RoomInfo = () => {
	const { selected, rooms, getRoomStatus, toggleExplored, map } =
		useMapContext();

	const room = rooms?.find(r => r.room_id === selected);

	const [showUnused] = useShowUnused();
	const filteredWorldState = WorldStateMeta.filter(
		f => !!showUnused || !f.name.match(/^UNUSED /)
	);

	if (!room) {
		return (
			<WorldState
				stateMetaItems={filteredWorldState.filter(
					filterRoomState(undefined, undefined, map)
				)}
				initialExpanded
			/>
		);
	}

	const type = RoomTypes[room.type]?.name ?? `Unknown #${room.type}`;
	const status = getRoomStatus(room.room_id);

	const stateMeta = filteredWorldState.filter(
		filterRoomState(room.type ?? 0, room.biome_type, map)
	);

	return (
		<Box
			key={selected}
			sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
		>
			<Typography variant="caption" color="text.secondary">
				Room
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<Sprite
						img={
							map !== -1
								? DungeonDirections[parseRoomDirection(room.flags)]
								: `${process.env.PUBLIC_URL}/assets/biomes/s_map_texture_${
										Biomes[room.biome_type]?.sprite ?? 'empty'
								  }_0.png`
						}
						onClick={() => console.log(room)}
						width={7}
						height={7}
						mr={2}
						flexShrink={0}
					/>
					<Typography variant="h3" color="text.primary" flexGrow={1}>
						#{room.room_id} {type}
					</Typography>

					<DeleteRoomButton id={room.room_id} />
				</Box>
			</Typography>

			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					columnGap: 4,
					rowGap: 1
				}}
			>
				<Typography variant="caption" color="text.secondary">
					Coordinates
					<Typography color="text.primary">
						[{room.x},{room.y}]
					</Typography>
				</Typography>

				<Typography variant="caption" color="text.secondary">
					Exploration
					<TextButton
						disabled={!toggleExplored}
						onClick={() => toggleExplored?.(room.room_id)}
						sx={{ display: 'block' }}
					>
						{status}
					</TextButton>
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 2
				}}
			>
				<ExplorationSwitch />
				{room.difficulty >= 0 && <DifficultySwitch />}
				<RespawnSwitch />
			</Box>

			{map === -1 && <RoomBiomeSelect index={room.room_id} />}
			{map === -1 && <RoomTypeSelect index={room.room_id} />}

			<Box>
				{map === -1 && <RoomEdit x={room.x} y={room.y} />}
				{map === -1 && <RoomObjectsInfo room_id={room.room_id} />}
				<WorldState stateMetaItems={stateMeta} />
			</Box>
		</Box>
	);
};

export default RoomInfo;
