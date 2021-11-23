import { IconButton } from '@mui/material';

import selectedIcon from 'assets/world/tiles/selected.png';
import playerIcon from 'assets/world/icons/player.png';
import Sprite from 'components/Sprite';
import {
	Biomes,
	DungeonDirections,
	Dungeons,
	RoomDirections,
	RoomTypes
} from 'utils/data';
import { Room } from 'utils/types';

import {
	parseRoomDirection,
	useIsRoomRespawn,
	useMapContext
} from './MapProvider';

const MapRoom = (room: Room) => {
	const { map, selected, setSelected, minX, minY, respawn, getRoomStatus } =
		useMapContext();

	const biome = Biomes[room.biome_type];

	const type = RoomTypes[room.type];

	const explore = getRoomStatus(room.room_id);

	const isDoubleMaster = room.is_double;
	const isDoubleSub =
		!room.is_double && (room.master_room_x || room.master_room_y);

	const finalX = room.x - minX + 1;
	const finalY = room.y - minY + 1;

	const isRespawn = useIsRoomRespawn(room);

	const direction = parseRoomDirection(room.flags);
	console.log(direction, Dungeons);

	const isDungeon = map !== -1;

	return (
		<Sprite
			component={IconButton}
			img={
				isDungeon
					? DungeonDirections[direction]
					: !isDoubleSub
					? biome?.sprite
					: undefined
			}
			onClick={() => {
				setSelected?.(selected === room.room_id ? undefined : room.room_id);
			}}
			sx={{
				borderRadius: 0,
				mr: -0.5,
				mb: -0.5,
				gridArea: `${finalY} / ${finalX}${
					isDoubleMaster ? ` / ${finalY + 2} / ${finalX + 2}` : ''
				}`,
				filter:
					explore === 'Hidden'
						? 'saturate(0)'
						: explore === 'Seen'
						? 'saturate(0.5)'
						: undefined,
				color:
					room.x === respawn[0] && room.y === respawn[1] ? 'badge' : undefined
			}}
		>
			{!isDungeon && (
				<Sprite
					img={RoomDirections[direction]}
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: isDoubleMaster ? '50%' : '100%',
						height: isDoubleMaster ? '50%' : '100%'
					}}
				/>
			)}
			{isRespawn && !isDoubleSub && (
				<Sprite
					img={playerIcon}
					width={5}
					height={5}
					sx={{
						zIndex: 2,
						position: 'absolute',
						top: t => t.spacing(-1.5),
						left: t => t.spacing(-1.5)
					}}
				/>
			)}
			{type && !isDoubleSub && (
				<Sprite
					img={type.sprite[0]}
					width={type.sprite[1] / 2}
					height={type.sprite[2] / 2}
					sx={{
						zIndex: 1,
						opacity: room.objective_complete ? 0.25 : undefined
					}}
				/>
			)}
			<Sprite
				img={selectedIcon}
				width={9}
				height={9}
				sx={{
					'position': 'absolute',
					'top': t => t.spacing(-0.75),
					'left': t => t.spacing(-0.75),
					'zIndex': 1,
					'opacity': selected === room.room_id ? 1 : 0,
					':hover': { opacity: 0.5 }
				}}
			/>
		</Sprite>
	);
};

export default MapRoom;
