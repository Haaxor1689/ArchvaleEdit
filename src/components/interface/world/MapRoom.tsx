import { IconButton } from '@mui/material';

import selectedIcon from 'assets/world/tiles/selected.png';
import playerIcon from 'assets/world/icons/player.png';
import Sprite from 'components/Sprite';
import {
	Biomes,
	DungeonDirections,
	RoomDirections,
	RoomTypes
} from 'utils/data';
import { Room } from 'utils/types';

import {
	parseRoomDirection,
	useIsRoomRespawn,
	useMapContext,
	useObtainedObjectState,
	useObtainedWorldState
} from './MapProvider';

const MapRoom = (room: Room) => {
	const { map, selected, setSelected, minX, minY, getRoomStatus } =
		useMapContext();

	const type = RoomTypes[room.type];

	const explore = getRoomStatus(room.room_id);
	const filter =
		explore === 'Hidden'
			? 'saturate(0)'
			: explore === 'Seen'
			? 'saturate(0.5)'
			: undefined;

	const isDoubleMaster = room.is_double;
	const isDoubleSub =
		!room.is_double && (room.master_room_x || room.master_room_y);

	const finalX = room.x - minX + 1;
	const finalY = room.y - minY + 1;

	const isRespawn = useIsRoomRespawn(room);

	const direction = parseRoomDirection(room.flags);

	const isDungeon = map !== -1;

	const obtainedWorld = useObtainedWorldState(room.type)();
	const obtainedObject = useObtainedObjectState(room.type, room.objects);

	return (
		<IconButton
			onClick={() => {
				setSelected?.(selected === room.room_id ? undefined : room.room_id);
			}}
			sx={{
				borderRadius: 0,
				gridArea: `${finalY} / ${finalX}${
					isDoubleMaster ? ` / ${finalY + 2} / ${finalX + 2}` : ''
				}`
			}}
		>
			<Sprite
				img={
					isDungeon
						? DungeonDirections[direction]
						: !isDoubleSub
						? Biomes[room.biome_type]?.sprite
						: undefined
				}
				sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					zIndex: 0,
					filter
				}}
			/>
			{!isDungeon && (
				<Sprite
					img={RoomDirections[direction]}
					width={7}
					height={7}
					sx={{
						position: 'absolute',
						top: t => t.spacing(-0),
						left: t => t.spacing(-0),
						zIndex: 0
					}}
				/>
			)}
			{type?.sprite && !isDoubleSub && (
				<Sprite
					img={type.sprite[0]}
					width={(type.sprite[1] ?? 0) / 2}
					height={(type.sprite[2] ?? 0) / 2}
					sx={{
						opacity:
							(obtainedWorld && room.objective_complete) || obtainedObject
								? 0.25
								: undefined,
						zIndex: 1,
						filter
					}}
				/>
			)}
			<Sprite
				img={selectedIcon}
				width={9}
				height={9}
				sx={{
					'position': 'absolute',
					'top': t => t.spacing(-1),
					'left': t => t.spacing(-1),
					'opacity': selected === room.room_id ? 1 : 0,
					'zIndex': 1,
					'filter': 'invert(1)',
					':hover': { opacity: 1, filter: 'invert(0)' }
				}}
			/>
			{isRespawn && !isDoubleSub && (
				<Sprite
					img={playerIcon}
					width={5}
					height={5}
					sx={{
						position: 'absolute',
						top: t => t.spacing(-1.5),
						left: t => t.spacing(-1.5),
						zIndex: 2
					}}
				/>
			)}
		</IconButton>
	);
};

export default MapRoom;
