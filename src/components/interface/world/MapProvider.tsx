import { createContext, FC, useContext, useState } from 'react';
import { useField } from 'react-final-form';

import { pad, parseHexValue } from 'utils';
import { Dungeons, WorldStateMeta } from 'utils/data';
import { Dungeon, Room, World } from 'utils/types';

const parseExploration = (value: string) => {
	switch (value) {
		case '4':
			return 'Cleared';
		case '3':
			return 'Visited';
		case '2':
			return 'Seen';
		default:
			return 'Hidden';
	}
};

/**
 * - 0 - down
 * - 1 - right
 * - 2 - up
 * - 3 - left
 * - 4 - ???
 * - 5 - ???
 * - 6 - ???
 * - 7 - cleared
 * - 8 - ???
 * - 9 - ???
 * - 10 - ???
 * - 11 - explored
 * - 12 - ???
 * - 13 - ???
 * - 14 - seen
 * - 15 - hidden
 */
const parseRoomExploration = (flags: string) => {
	const val = pad(parseHexValue(flags).toString(2), 16);
	return val[11] === '1'
		? 'Visited'
		: val[14] === '1'
		? 'Seen'
		: ('Hidden' as const);
};

export const parseRoomDirection = (flags: string) => parseHexValue(flags[1]);

export type RoomStatus = 'Visited' | 'Seen' | 'Hidden' | 'Cleared';

type MapContext = {
	rooms: Room[];
	setRespawn: (r: Partial<Room>) => void;
	toggleExplored?: (id: number) => void;
	getRoomStatus: (id: number) => RoomStatus;
	dungeonIndex?: number;
	dungeon?: Dungeon;
};

type Context = {
	map: number;
	setMap: (id: number) => void;
	respawn: World['player_respawn'];
	selected?: number;
	setSelected: (id: number | undefined) => void;
	minX: number;
	minY: number;
} & MapContext;

export const useRespawn = (): World['player_respawn'] => {
	const {
		input: { value: overworldRespawn }
	} = useField<World['player_respawn']>('player_respawn', {
		subscription: { value: true }
	});
	const {
		input: { value: activeDungeon }
	} = useField<number>(`active_dungeon`, { subscription: { value: true } });
	const {
		input: { value: dungeonData }
	} = useField<Dungeon[]>(`dungeon_data`, { subscription: { value: true } });

	const dungeon = dungeonData.find(d => d.dungeon_id === activeDungeon);
	return dungeon
		? [activeDungeon, dungeon.last_x, dungeon.last_y]
		: overworldRespawn;
};

export const useMapMin = (rooms: Room[]) => ({
	minX: Math.min(...rooms.map(r => r.x)),
	minY: Math.min(...rooms.map(r => r.y))
});

const toggleWorldExploration = (val: RoomStatus) => {
	switch (val) {
		case 'Hidden':
			return '00011'; // Seen
		case 'Seen':
			return '10011'; // Visited
		default:
			return '00001'; // Hidden
	}
};

const useWorldMap = (): MapContext => {
	const {
		input: { value: rooms, onChange: onRoomsChange }
	} = useField<Room[]>('world.rooms');

	const {
		input: { onChange: onRespawnChange }
	} = useField<World['player_respawn']>('player_respawn', {
		subscription: { value: true }
	});

	const {
		input: { onChange: onActiveDungeonChange }
	} = useField<number>(`active_dungeon`, { subscription: { value: true } });

	return {
		rooms,
		setRespawn: r => {
			onActiveDungeonChange({ target: { value: -1 } });
			onRespawnChange({
				target: {
					value: [
						0,
						r?.master_room_x ?? r?.x ?? 1,
						r?.master_room_y ?? r?.y ?? 1
					]
				}
			});
		},
		toggleExplored: id => {
			const newRooms = [...rooms];
			const exploration = parseRoomExploration(rooms[id].flags);
			newRooms[id] = {
				...rooms[id],
				flags: `0${rooms[id].flags[1]}${parseInt(
					`0000000${toggleWorldExploration(exploration)}`,
					2
				).toString(16)}`
			};
			onRoomsChange({ target: { value: newRooms } });
		},
		getRoomStatus: id => parseRoomExploration(rooms[id].flags)
	};
};

const toggleDungeonExploration = (val: string) => {
	switch (val) {
		case '0':
			return '2'; // Seen
		case '2':
			return '3'; // Visited
		default:
			return '0'; // Hidden
	}
};

const useDungeonMap = (id: number): MapContext => {
	const {
		input: { onChange: onActiveDungeonChange }
	} = useField<number>(`active_dungeon`, { subscription: { value: true } });

	const {
		input: { value, onChange }
	} = useField<Dungeon[]>(`dungeon_data`, { subscription: { value: true } });

	const index = value.findIndex(d => d.dungeon_id === id);
	const dungeon = value[index];
	const dungeonMeta = Dungeons[dungeon?.dungeon_id];

	return {
		rooms: dungeonMeta?.rooms,
		setRespawn: r => {
			const newDungeons = [...value];
			newDungeons[index] = { ...dungeon, last_x: r?.x ?? 1, last_y: r?.y ?? 1 };
			onActiveDungeonChange({ target: { value: id } });
			onChange({
				target: { value: newDungeons }
			});
		},
		toggleExplored: idx => {
			const newDungeons = [...value];
			newDungeons[index] = {
				...dungeon,
				exploration_data:
					dungeon.exploration_data.slice(0, idx) +
					toggleDungeonExploration(dungeon.exploration_data[idx]) +
					dungeon.exploration_data.slice(idx + 1)
			};
			onChange({
				target: { value: newDungeons }
			});
		},
		getRoomStatus: id => parseExploration(dungeon?.exploration_data[id]),
		dungeonIndex: index,
		dungeon
	};
};

export const useIsRoomRespawn = (room?: Room) => {
	const { map, respawn } = useMapContext();
	return (
		respawn[0] === (map === -1 ? 0 : map) &&
		respawn[1] === (room?.master_room_x ?? room?.x) &&
		respawn[2] === (room?.master_room_y ?? room?.y)
	);
};

export const useObtainedWorldState = (type: number) => {
	const {
		input: { value }
	} = useField('npst', { subscription: { value: true } });
	const stateMeta = WorldStateMeta.filter(f => f.types.indexOf(type) >= 0);

	return (flags?: string[]) => {
		const f = flags ?? stateMeta.flatMap(s => s.flags);
		if (f.length === 0) return true;
		return f.some(f => value[f] === 1);
	};
};

const MapContext = createContext<Context>(undefined as never);

export const useMapContext = () => useContext(MapContext);

const MapProvider: FC = ({ children }) => {
	const {
		input: { value: activeDungeon }
	} = useField<number>(`active_dungeon`, { subscription: { value: true } });

	const [map, setMap] = useState(activeDungeon);
	const [selected, setSelected] = useState<number>();

	const worldProps = useWorldMap();
	const dungeonProps = useDungeonMap(map);
	const props = map === -1 ? worldProps : dungeonProps;

	return (
		<MapContext.Provider
			value={{
				map,
				setMap: m => {
					setSelected(undefined);
					setMap(m);
				},
				respawn: useRespawn(),
				selected,
				setSelected,
				...(map === -1 ? worldProps : dungeonProps),
				minX: Math.min(...(props.rooms ?? []).map(r => r.x)),
				minY: Math.min(...(props.rooms ?? []).map(r => r.y))
			}}
		>
			{children}
		</MapContext.Provider>
	);
};

export default MapProvider;
