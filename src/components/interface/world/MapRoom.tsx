import { IconButton } from '@mui/material';
import { memo } from 'react';

import questIcon from 'assets/world/icons/quest.png';
import selectedIcon from 'assets/world/icons/selected.png';
import playerIcon from 'assets/world/icons/player.png';
import Sprite from 'components/Sprite';
import { Biomes } from 'utils/data';
import { Room } from 'utils/types';
import { parseRoomDirection } from 'utils/roomUtils';
import RoomTypes from 'utils/data/roomTypes';
import { getAsset } from 'utils';

import { useIsRoomRespawn, useMapContext, useObtained } from './MapProvider';

type Props = Partial<Room> &
	(
		| {
				variant: 'map';
		  }
		| {
				variant: 'edit';
				isMiddle: boolean;
				icon?: string;
				onClick?: () => void;
		  }
	);

const MapRoom = (room: Props) => {
	const { map, selected, setSelected, minX, minY, getRoomStatus } =
		useMapContext();

	const type =
		room?.type !== undefined
			? Array.isArray(room.type)
				? room.type.map(t => RoomTypes[t])
				: RoomTypes[room.type]
			: RoomTypes[0];
	const biome = room?.biome_type ? Biomes[room.biome_type] : undefined;

	const explore =
		room?.room_id !== undefined ? getRoomStatus(room.room_id) : 'Hidden';
	const filter =
		room.variant === 'edit'
			? !room.isMiddle
				? 'saturate(0)'
				: 'saturate(1)'
			: explore === 'Hidden'
			? 'saturate(0) opacity(0.75)'
			: explore === 'Outline'
			? 'saturate(0) brightness(0.75)'
			: explore === 'Seen'
			? 'saturate(0.5)'
			: undefined;

	const isDoubleMaster = room.is_double;
	const isDoubleSub =
		!room.is_double && (room.master_room_x || room.master_room_y);

	const finalX = (room?.x ?? 0) - minX + 1;
	const finalY = (room?.y ?? 0) - minY + 1;

	const isRespawn = useIsRoomRespawn(room);

	const direction = parseRoomDirection(room.flags);

	const isDungeon = map !== -1;

	const obtained = useObtained(room, map);

	return (
		<IconButton
			disableRipple
			disableTouchRipple
			disableFocusRipple
			onClick={
				room.variant === 'map'
					? () =>
							setSelected?.(
								selected === room.room_id ? undefined : room.room_id
							)
					: room.onClick
			}
			style={{
				gridArea:
					room.variant === 'map'
						? `${finalY} / ${finalX}${
								isDoubleMaster ? ` / ${finalY + 2} / ${finalX + 2}` : ''
						  }`
						: undefined
			}}
			sx={
				room.variant === 'map'
					? {
							':focus img:nth-last-of-type(1),:hover img:nth-last-of-type(1)': {
								opacity: 1,
								filter: 'invert(0)'
							}
					  }
					: undefined
			}
		>
			<Sprite
				img={
					isDungeon
						? getAsset('directions', `s_map_dung_${direction}`)
						: !isDoubleSub
						? getAsset('biomes', `s_map_texture_${biome?.sprite ?? 'empty'}`)
						: undefined
				}
				sx={{
					position: 'absolute',
					zIndex: 1,
					filter
				}}
			/>
			{!isDungeon && (
				<Sprite
					img={getAsset('directions', `s_map_dir_${direction}`)}
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: 1
					}}
				/>
			)}
			{(room.variant === 'edit' && room.icon && (
				<Sprite img={room.icon} sx={{ zIndex: 2 }} />
			)) ||
				(!isDoubleSub &&
					(Array.isArray(type) ? (
						<>
							<Sprite
								img={type?.[0].sprite}
								sx={{
									position: 'absolute',
									opacity: obtained ? 0.25 : undefined,
									zIndex: 2,
									filter,
									top: t => t.spacing(1),
									left: t => t.spacing(1)
								}}
							/>
							<Sprite
								img={type?.[1].sprite}
								sx={{
									position: 'absolute',
									opacity: obtained ? 0.25 : undefined,
									zIndex: 2,
									filter,
									bottom: t => t.spacing(1),
									right: t => t.spacing(1)
								}}
							/>
						</>
					) : (
						<Sprite
							img={!type ? questIcon : type?.sprite}
							sx={{
								opacity: obtained ? 0.25 : undefined,
								zIndex: 2,
								filter
							}}
						/>
					)))}
			{isRespawn && room.variant === 'map' && !isDoubleSub && (
				<Sprite
					img={playerIcon}
					sx={{
						position: 'absolute',
						top: t => t.spacing(-3),
						left: t => t.spacing(-3),
						zIndex: 3
					}}
				/>
			)}
			{room.variant === 'map' && (
				<Sprite
					img={selectedIcon}
					sx={{
						position: 'absolute',
						top: t => t.spacing(-2),
						left: t => t.spacing(-2),
						opacity: selected === room.room_id ? 1 : 0,
						zIndex: 2,
						filter: 'invert(1)'
					}}
				/>
			)}
		</IconButton>
	);
};

export default memo(MapRoom);
