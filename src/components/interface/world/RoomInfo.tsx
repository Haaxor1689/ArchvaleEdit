import { Box, Typography } from '@mui/material';

import Sprite from 'components/Sprite';
import { Biomes } from 'utils/data';
import useShowUnused from 'utils/useShowUnused';
import { filterRoomState, parseRoomDirection } from 'utils/roomUtils';
import WorldStateMeta from 'utils/data/worldStateMeta';
import RoomTypes from 'utils/data/roomTypes';
import { getAsset } from 'utils';

import { useMapContext } from './MapProvider';
import RoomEdit from './roomEdit/RoomEdit';
import RoomBiomeSelect from './roomEdit/RoomBiomeSelect';
import RoomTypeSelect from './roomEdit/RoomTypeSelect';
import RoomObjectsInfo from './roomEdit/RoomObjectsInfo';
import WorldState from './roomEdit/WorldState';
import DeleteRoomButton from './roomEdit/DeleteRoomButton';
import DifficultySwitch from './roomEdit/DifficultySwitch';
import RespawnSwitch from './roomEdit/RespawnSwitch';
import ExplorationSwitch from './roomEdit/ExplorationSwitch';
import DungeonRoomLoot from './roomEdit/DungeonRoomLoot';
import DungeonRoomLocks from './roomEdit/DungeonRoomLocks';

const RoomInfo = () => {
	const { selected, rooms, map } = useMapContext();

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
								? getAsset(
										'directions',
										`s_map_dung_${parseRoomDirection(room.flags)}`
								  )
								: getAsset(
										'biomes',
										`s_map_texture_${
											Biomes[room.biome_type]?.sprite ?? 'empty'
										}`
								  )
						}
						size={0.5}
						onClick={() => console.log(room)}
						sx={{ mr: 2, cursor: 'help' }}
					/>
					<Typography variant="h3" color="text.primary" flexGrow={1}>
						#{room.room_id} {type}
					</Typography>

					{map === -1 && <DeleteRoomButton id={room.room_id} />}
				</Box>
			</Typography>

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
				{map !== -1 && <DungeonRoomLoot {...room} />}
				{map !== -1 && <DungeonRoomLocks {...room} />}
			</Box>
		</Box>
	);
};

export default RoomInfo;
