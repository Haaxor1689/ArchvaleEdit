import { IconButton } from '@mui/material';
import { memo } from 'react';

import questIcon from 'assets/world/icons/quest.png';
import selectedIcon from 'assets/world/icons/selected.png';
import playerIcon from 'assets/world/icons/player.png';
import Sprite from 'components/Sprite';
import {
	Biomes,
	DungeonDirections,
	RoomDirections,
	RoomTypes
} from 'utils/data';
import { Room } from 'utils/types';
import { parseRoomDirection } from 'utils/roomUtils';

import {
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

	const type = room?.type !== undefined ? RoomTypes[room.type] : RoomTypes[0];
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
				p: 0,
				borderRadius: 0,
				gridArea:
					room.variant === 'map'
						? `${finalY} / ${finalX}${
								isDoubleMaster ? ` / ${finalY + 2} / ${finalX + 2}` : ''
						  }`
						: undefined
			}}
		>
			<Sprite
				img={
					isDungeon
						? DungeonDirections[direction]
						: !isDoubleSub
						? `${process.env.PUBLIC_URL}/assets/biomes/s_map_texture_${
								biome?.sprite ?? 'empty'
						  }_0.png`
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
					width={14}
					height={14}
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: 1
					}}
				/>
			)}
			{(room.variant === 'edit' && room.icon && (
				<Sprite
					img={room.icon[0]}
					width={room.icon[1]}
					height={room.icon[2]}
					sx={{ zIndex: 2 }}
				/>
			)) ||
				(!isDoubleSub && (
					<Sprite
						{...(!type
							? { img: questIcon, width: 8, height: 8 }
							: type?.sprite
							? {
									img: type.sprite[0],
									width: type.sprite[1],
									height: type.sprite[2]
							  }
							: {})}
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
					width={18}
					height={18}
					sx={{
						'position': 'absolute',
						'top': t => t.spacing(-2),
						'left': t => t.spacing(-2),
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
					width={10}
					height={10}
					sx={{
						position: 'absolute',
						top: t => t.spacing(-3),
						left: t => t.spacing(-3),
						zIndex: 3
					}}
				/>
			)}
		</IconButton>
	);
};

export default memo(MapRoom);
