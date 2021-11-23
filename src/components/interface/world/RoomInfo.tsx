import { Box, IconButton, Typography } from '@mui/material';

import { Biomes, RoomTypes } from 'utils/data';

import { useIsRoomRespawn, useMapContext } from './MapProvider';
import RoomState from './RoomState';

const RoomInfo = () => {
	const { selected, rooms, setRespawn, getRoomStatus, toggleExplored } =
		useMapContext();
	const room = rooms.find(r => r.room_id === selected);
	const isRespawn = useIsRoomRespawn(room);

	if (!room)
		return (
			<Typography variant="caption" color="text.secondary">
				No room selected
			</Typography>
		);

	const type = RoomTypes[room.type]?.name ?? 'Combat';
	const status = getRoomStatus(room.room_id);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
							{Biomes[room.biome_type].name ?? '???'}
						</Typography>
					</Typography>
				)}

				<Typography variant="caption" color="text.secondary">
					Exploration
					<IconButton
						disabled={!toggleExplored}
						onClick={() => toggleExplored?.(room.room_id)}
						sx={{
							display: 'block',
							background: t => `${t.palette.primary.main}66`,
							borderRadius: 0,
							ml: -1
						}}
					>
						<Typography color="text.primary">{status}</Typography>
					</IconButton>
				</Typography>
			</Box>

			{isRespawn ? (
				<Typography variant="caption" color="text.secondary">
					Current spawn point
				</Typography>
			) : (
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<Typography variant="caption" color="text.secondary">
						Setting respawn to random rooms may cause you to spawn in walls.
					</Typography>
					<IconButton
						onClick={() => setRespawn(room)}
						sx={{
							display: 'block',
							background: t => `${t.palette.primary.main}66`,
							borderRadius: 0,
							ml: -1,
							alignSelf: 'flex-start'
						}}
					>
						<Typography>Set respawn</Typography>
					</IconButton>
				</Box>
			)}

			<RoomState {...room} />
		</Box>
	);
};

export default RoomInfo;
