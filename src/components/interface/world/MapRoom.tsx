import { IconButton } from '@mui/material';

import emptyTile from 'assets/world/tiles/empty.png';
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

type Props = Partial<Room> &
	(
		| {
				variant: 'map';
		  }
		| {
				variant: 'edit';
				isMiddle: boolean;
				icon?: [string, number, number];
				onClick?: () => void;
		  }
	);

const MapRoom = (room: Props) => {
	const { map, selected, setSelected, minX, minY, getRoomStatus } =
		useMapContext();

	const type = room?.type ? RoomTypes[room.type] : undefined;
	const biome = room?.biome_type ? Biomes[room.biome_type] : undefined;

	const explore = room?.room_id ? getRoomStatus(room.room_id) : 'Hidden';
	const filter =
		room.variant === 'edit'
			? !room.isMiddle
				? 'saturate(0)'
				: 'saturate(1)'
			: explore === 'Hidden'
			? 'saturate(0)'
			: explore === 'Seen'
			? 'saturate(0.5)'
			: undefined;

	const isDoubleMaster = room.is_double;
	const isDoubleSub =
		!room.is_double && (room.master_room_x || room.master_room_y);

	const finalX = (room?.x ?? 0) - minX + 1;
	const finalY = (room?.y ?? 0) - minY + 1;

	const isRespawn = useIsRoomRespawn(room);

	const direction = room?.flags ? parseRoomDirection(room.flags) : 16;

	const isDungeon = map !== -1;

	const obtainedWorld = useObtainedWorldState(room.type)();
	const obtainedObject = useObtainedObjectState(room.type, room.objects);

	return (
		<IconButton
			onClick={
				room.variant === 'map'
					? () =>
							setSelected?.(
								selected === room.room_id ? undefined : room.room_id
							)
					: room.onClick
			}
			sx={{
				borderRadius: 0,
				gridArea:
					room.variant === 'map'
						? `${finalY} / ${finalX}${
								isDoubleMaster ? ` / ${finalY + 2} / ${finalX + 2}` : ''
						  }`
						: undefined
			}}
		>
			{isDoubleSub && (
				<Sprite
					img={emptyTile}
					sx={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						zIndex: 0,
						filter
					}}
				/>
			)}
			<Sprite
				img={
					isDungeon
						? DungeonDirections[direction]
						: !isDoubleSub
						? biome?.sprite
						: undefined
				}
				sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					zIndex: 1,
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
						zIndex: 1
					}}
				/>
			)}
			{(room.variant === 'edit' && room.icon && (
				<Sprite
					img={room.icon[0]}
					width={room.icon[1] / 2}
					height={room.icon[2] / 2}
					sx={{ zIndex: 2 }}
				/>
			)) ||
				(type?.sprite && !isDoubleSub && (
					<Sprite
						img={type.sprite[0]}
						width={(type.sprite[1] ?? 0) / 2}
						height={(type.sprite[2] ?? 0) / 2}
						sx={{
							opacity:
								(obtainedWorld && room.objective_complete) || obtainedObject
									? 0.25
									: undefined,
							zIndex: 2,
							filter
						}}
					/>
				))}
			{room.variant === 'map' && (
				<Sprite
					img={selectedIcon}
					width={9}
					height={9}
					sx={{
						'position': 'absolute',
						'top': t => t.spacing(-1),
						'left': t => t.spacing(-1),
						'opacity': selected === room.room_id ? 1 : 0,
						'zIndex': 2,
						'filter': 'invert(1)',
						':hover': { opacity: 1, filter: 'invert(0)' }
					}}
				/>
			)}
			{isRespawn && room.variant === 'map' && !isDoubleSub && (
				<Sprite
					img={playerIcon}
					width={5}
					height={5}
					sx={{
						position: 'absolute',
						top: t => t.spacing(-1.5),
						left: t => t.spacing(-1.5),
						zIndex: 3
					}}
				/>
			)}
		</IconButton>
	);
};

export default MapRoom;
