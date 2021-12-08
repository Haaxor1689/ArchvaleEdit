import { Box, Typography } from '@mui/material';

import Sprite from 'components/Sprite';
import TextButton from 'components/TextButton';
import { Biomes, RoomTypes, WorldStateMeta } from 'utils/data';
import useShowUnused from 'utils/useShowUnused';

import { useIsRoomRespawn, useMapContext } from './MapProvider';
import RoomEdit from './RoomEdit';
import FlagSelect from './roomEdit/FlagSelect';
import RoomBiomeSelect from './roomEdit/RoomBiomeSelect';
import RoomTypeSelect from './roomEdit/RoomTypeSelect';
import RoomObjectsInfo from './RoomObjectsInfo';
import WorldState from './roomEdit/WorldState';

const RoomInfo = () => {
	const { selected, rooms, setRespawn, getRoomStatus, toggleExplored, map } =
		useMapContext();

	const index = rooms?.findIndex(r => r.room_id === selected);
	const room = rooms?.[index];
	const isRespawn = useIsRoomRespawn(room);

	const [showUnused] = useShowUnused();
	const filteredWorldState = WorldStateMeta.filter(
		f => !!showUnused || !f.name.match(/^UNUSED /)
	);

	if (!room) {
		return (
			<>
				<WorldState stateMetaItems={filteredWorldState} initialExpanded />
				<FlagSelect />
			</>
		);
	}

	const type = RoomTypes[room.type]?.name ?? `Unknown #${room.type}`;
	const status = getRoomStatus(room.room_id);

	const stateMeta = filteredWorldState.filter(
		f => f.types.indexOf(room.type) >= 0
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
						img={`${process.env.PUBLIC_URL}/assets/biomes/s_map_texture_${
							Biomes[room.biome_type]?.sprite ?? 'empty'
						}_0.png`}
						width={7}
						height={7}
						mr={2}
					/>
					<Typography variant="h3" color="text.primary">
						#{room.room_id} {type}
					</Typography>
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

			<RoomBiomeSelect index={index} />
			<RoomTypeSelect index={index} />

			{isRespawn ? (
				<Typography>Current spawn point</Typography>
			) : (
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<Typography variant="caption" color="text.secondary">
						Setting respawn to random rooms may cause you to spawn in walls.
					</Typography>
					<TextButton onClick={() => setRespawn(room)}>Set respawn</TextButton>
				</Box>
			)}
			<Box>
				{map === -1 && <RoomEdit x={room.x} y={room.y} />}
				{map === -1 && <RoomObjectsInfo room_id={room.room_id} />}
				<WorldState stateMetaItems={stateMeta} />
			</Box>
		</Box>
	);
};

export default RoomInfo;
