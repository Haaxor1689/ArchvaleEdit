import { Box, Typography, ThemeProvider } from '@mui/material';
import { useField } from 'react-final-form';

import { Room } from 'utils/types';
import arrUp from 'assets/world/icons/arrUp.png';
import arrDown from 'assets/world/icons/arrDown.png';
import arrLeft from 'assets/world/icons/arrLeft.png';
import arrRight from 'assets/world/icons/arrRight.png';
import arrUpYes from 'assets/world/icons/arrUpYes.png';
import arrDownYes from 'assets/world/icons/arrDownYes.png';
import arrLeftYes from 'assets/world/icons/arrLeftYes.png';
import arrRightYes from 'assets/world/icons/arrRightYes.png';
import arrUpNo from 'assets/world/icons/arrUpNo.png';
import arrDownNo from 'assets/world/icons/arrDownNo.png';
import arrLeftNo from 'assets/world/icons/arrLeftNo.png';
import arrRightNo from 'assets/world/icons/arrRightNo.png';
import addIcon from 'assets/world/icons/add.png';
import select from 'assets/world/icons/select.png';
import { parseRoomDirection } from 'utils/roomUtils';
import theme from 'utils/theme';
import useThemeSpacing from 'utils/useThemeSpacing';

import MapRoom from '../MapRoom';
import { useAddRoom, useMapContext } from '../MapProvider';

type NeighborType = 'Up' | 'Down' | 'Left' | 'Right';

type NeighborMeta = {
	arr: string;
	sYes: string;
	sNo: string;
	flag: number;
	x: number;
	y: number;
};
const NeighborsMeta: Record<NeighborType, NeighborMeta> = {
	Up: {
		arr: arrUp,
		sYes: arrUpYes,
		sNo: arrUpNo,
		flag: 2,
		x: 0,
		y: -1
	},
	Down: {
		arr: arrDown,
		sYes: arrDownYes,
		sNo: arrDownNo,
		flag: 8,
		x: 0,
		y: 1
	},
	Left: {
		arr: arrLeft,
		sYes: arrLeftYes,
		sNo: arrLeftNo,
		flag: 4,
		x: -1,
		y: 0
	},
	Right: {
		arr: arrRight,
		sYes: arrRightYes,
		sNo: arrRightNo,
		flag: 1,
		x: 1,
		y: 0
	}
};

const hasFlag = (num: number, flag: number) => (num & flag) === flag;

const getNeighbor = ([x, y]: [number, number]) => {
	if (x === 0 && y === -1) return NeighborsMeta.Up;
	if (x === 0 && y === 1) return NeighborsMeta.Down;
	if (x === -1 && y === 0) return NeighborsMeta.Left;
	if (x === 1 && y === 0) return NeighborsMeta.Right;
	return undefined;
};

type RoomControlVariant = 'Move' | 'Exits' | 'Create' | 'Select';

type Props = {
	variant: RoomControlVariant;
	neighbors: (readonly [x: number, y: number, room: Room | undefined])[];
};

const RoomControl = ({ variant, neighbors }: Props) => {
	const { selected, setSelected } = useMapContext();

	const {
		input: { value: room, onChange: onRoomChange }
	} = useField<Room>(`world.rooms[${selected}]`, {
		subscription: { value: true }
	});

	const [addRoom, addDisabled] = useAddRoom();

	const getRoomNeighborIcon = (
		[x, y]: [number, number],
		occupied: boolean
	): string | undefined => {
		const meta = getNeighbor([x, y]);
		if (!meta) return undefined;
		switch (variant) {
			case 'Move': {
				if (occupied) return undefined;
				return meta.arr;
			}
			case 'Exits': {
				const direction = parseRoomDirection(room.flags);
				return hasFlag(direction, meta.flag) ? meta.sYes : meta.sNo;
			}
			case 'Create': {
				if (occupied) return undefined;
				return addIcon;
			}
			case 'Select': {
				if (!occupied) return undefined;
				return select;
			}
		}
		return undefined;
	};

	const onRoomClick = (xy: [number, number], occupied?: Room) => {
		const meta = getNeighbor(xy);
		if (!meta) return;
		switch (variant) {
			case 'Move': {
				if (occupied) return;
				onRoomChange({
					target: {
						value: { ...room, x: room.x + meta.x, y: room.y + meta.y }
					}
				});
				break;
			}
			case 'Exits': {
				onRoomChange({
					target: {
						value: {
							...room,
							flags: `0${(parseRoomDirection(room.flags) ^ meta.flag)
								.toString(16)
								.toUpperCase()}${room.flags.slice(2)}`
						}
					}
				});
				break;
			}
			case 'Create': {
				if (addDisabled(room.x + meta.x, room.y + meta.y)) return;
				addRoom(room.x + meta.x, room.y + meta.y);
				break;
			}
			case 'Select': {
				if (!occupied) return;
				setSelected(occupied.room_id);
			}
		}
	};

	const spacing = useThemeSpacing();

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Typography variant="body2" color="text.secondary">
				{variant}
			</Typography>
			<ThemeProvider theme={theme(spacing - 2)}>
				<Box
					sx={{
						display: 'grid',
						alignSelf: 'center',
						gridTemplateColumns: t =>
							`${t.spacing(14)} ${t.spacing(14)} ${t.spacing(14)}`,
						gridAutoRows: t => t.spacing(14)
					}}
				>
					{neighbors.map(([x, y, r]) => (
						<MapRoom
							key={`${x}-${y}`}
							variant="edit"
							isMiddle={x === 0 && y === 0}
							icon={getRoomNeighborIcon([x, y], !!r)}
							onClick={() => onRoomClick([x, y], r)}
							{...(r ?? {})}
						/>
					))}
				</Box>
			</ThemeProvider>
		</Box>
	);
};

export default RoomControl;
