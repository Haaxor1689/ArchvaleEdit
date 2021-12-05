import { Box, Typography } from '@mui/material';

import TextButton from 'components/TextButton';
import { Biomes, RoomTypes, WorldStateMeta } from 'utils/data';

import { useIsRoomRespawn, useMapContext } from './MapProvider';
import RoomEdit from './RoomEdit';
import RoomObjectsInfo from './RoomObjectsInfo';
import WorldState from './WorldState';

const RoomInfo = () => {
	const { selected, rooms, setRespawn, getRoomStatus, toggleExplored, map } =
		useMapContext();
	const room = rooms?.find(r => r.room_id === selected);
	const isRespawn = useIsRoomRespawn(room);

	if (!room) {
		return <WorldState stateMetaItems={WorldStateMeta} initialExpanded />;
	}

	const type = RoomTypes[room.type]?.name ?? `Unknown #${room.type}`;
	const status = getRoomStatus(room.room_id);

	const stateMeta = WorldStateMeta.filter(f => f.types.indexOf(room.type) >= 0);

	return (
		<Box
			key={selected}
			sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
		>
			<Typography variant="caption" color="text.secondary">
				Room
				<Typography variant="h3" color="text.primary">
					{type}
				</Typography>
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
					Id<Typography color="text.primary">#{room.room_id}</Typography>
				</Typography>

				<Typography variant="caption" color="text.secondary">
					Coordinates
					<Typography color="text.primary">
						[{room.x},{room.y}]
					</Typography>
				</Typography>

				{room.biome_type && (
					<Typography variant="caption" color="text.secondary">
						Biome
						<Typography color="text.primary">
							{Biomes[room.biome_type]?.name ?? `Unknown #${room.biome_type}`}
						</Typography>
					</Typography>
				)}

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
