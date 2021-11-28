import { Box, IconButton, Typography } from '@mui/material';

import { parseHexValue } from 'utils';
import { Biomes, RoomTypes, WorldStateMeta } from 'utils/data';

import { useIsRoomRespawn, useMapContext } from './MapProvider';
import WorldState from './WorldState';

const RoomInfo = () => {
	const { selected, rooms, setRespawn, getRoomStatus, toggleExplored } =
		useMapContext();
	const room = rooms.find(r => r.room_id === selected);
	const isRespawn = useIsRoomRespawn(room);

	if (!room) return <WorldState stateMetaItems={WorldStateMeta} />;

	const type = RoomTypes[room.type]?.name ?? 'Combat';
	const status = getRoomStatus(room.room_id);

	const stateMeta = WorldStateMeta.filter(f => f.types.indexOf(room.type) >= 0);

	/**
	 * Types:
	 * 0 - ore
	 * 1 - crate
	 * 2,3 - fountain
	 * 4 - defense up
	 * 5 - upgrade pedestal
	 * 6 - token
	 * 7 - tutorial target
	 * 8 - forest chest
	 * 10 - TODO: keeps crashing
	 * 11 - TODO: it's something
	 * 12 - TODO: it's something
	 * 13 - TODO: it's something
	 * 14 - TODO: it's something
	 * 15 - plum
	 * 16 - tutorial bush
	 * 17 - tutorial pot
	 * 18 - TODO: forest chest?
	 * 19 - bombable wall
	 * 20 - eggsac
	 */
	const objects = room.objects.map(o => ({
		o,
		type: parseHexValue(o.slice(0, 4)),
		can_take: parseHexValue(o.slice(4, 5)),
		x: parseHexValue(o.slice(5, 8)),
		_foo: parseHexValue(o.slice(8, 9)),
		y: parseHexValue(o.slice(9, 12)),
		_bar: parseHexValue(o.slice(12, 14)),
		// Ore
		ore_type: parseHexValue(o.slice(14, 17)), // 0 shell, 1 iron
		// Fountain
		fountain_unlocked: parseHexValue(o[14]),
		// Chest
		chest_opened: parseHexValue(o[14]),
		chest_item: parseHexValue(o.slice(15, 23)),
		// Plum
		plum_picked: parseHexValue(o[14])
	}));
	console.log(objects);

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
				<Typography>Current spawn point</Typography>
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

			<WorldState stateMetaItems={stateMeta} />
		</Box>
	);
};

export default RoomInfo;
