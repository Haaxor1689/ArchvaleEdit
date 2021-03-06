import { createContext, FC, useContext, useState } from 'react';
import { useField } from 'react-final-form';

import { Dungeons } from 'utils/data';
import WorldStateMeta from 'utils/data/worldStateMeta';
import {
	filterRoomState,
	parseDungeonExploration,
	parseRoomExploration
} from 'utils/roomUtils';
import { Dungeon, Room, World } from 'utils/types';

export type RoomStatus = 'Cleared' | 'Visited' | 'Seen' | 'Outline' | 'Hidden';

type MapContext = {
	rooms: Room[];
	setRespawn: (r: Partial<Room>) => void;
	toggleExplored: (id: number) => void;
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

export const useAddRoom = () => {
	const { setSelected } = useMapContext();
	const {
		input: { value, onChange }
	} = useField<Room[]>('world.rooms', { subscription: { value: true } });
	return [
		(x: number, y: number) => {
			const room_id = Math.max(...value.map(r => r.room_id)) + 1;
			onChange({
				target: {
					value: [
						...value,
						{
							room_id,
							type: 0,
							biome_type: 1,
							x: Number(x),
							y: Number(y),
							seed: Math.floor(Math.random() * 99999999),
							flags: '00000',
							objective_complete: 0,
							objects: [],
							border: -1,
							border_direction: 1,
							difficulty: 0
						}
					]
				}
			});
			setSelected(room_id);
		},
		(x: number, y: number) => !!value.find(r => r.x === x && r.y === y)
	] as const;
};

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

	const dungeon = dungeonData.find?.(d => d.dungeon_id === activeDungeon);
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
			return '001'; // Outline
		case 'Outline':
			return '002'; //Seen
		case 'Seen':
			return '013'; // Visited
		case 'Visited':
			return '113'; // Cleared
		default:
			return '000'; // Hidden
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
				flags: `0${rooms[id].flags[1]}${toggleWorldExploration(exploration)}`
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

	const index = value.findIndex?.(d => d.dungeon_id === id);
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
		getRoomStatus: id => parseDungeonExploration(dungeon?.exploration_data[id]),
		dungeonIndex: index,
		dungeon
	};
};

export const useIsRoomRespawn = (room?: Partial<Room>) => {
	const { map, respawn } = useMapContext();
	return (
		respawn[0] === (map === -1 ? 0 : map) &&
		respawn[1] === (room?.master_room_x ?? room?.x) &&
		respawn[2] === (room?.master_room_y ?? room?.y)
	);
};

export const useObtained = (room: Partial<Room>, map: number) => {
	const {
		input: { value }
	} = useField('npst', { subscription: { value: true } });

	if (room.objective_complete) return true;

	const exploration = parseRoomExploration(room.flags ?? '');

	switch (room.type) {
		// Towns and Dungeons
		case 21:
		case 22:
		case 29:
		case 47:
			return false;
		// Dustcrag border, Pine Peak border and Tutorial exit
		case 62:
		case 65:
		case 69:
			return exploration === 'Visited';
		case 4:
			return room.objects?.find(o => o.match(/^0008/))?.[14] === '1';
		case 12:
			return room.objects?.find(o => o.match(/^0005/))?.[14] === '1';
		case 20:
			return room.objects?.find(o => o.match(/^000F/))?.[14] === '1';
		case 59:
			return room.objects?.find(o => o.match(/^0013/))?.[4] === '0';
	}

	// Crabclaw Chasm - Twisted Caverns border
	if (room.type === 66 && room.biome_type === 8 && exploration === 'Visited')
		return true;

	// Murkmire - Pine Peak border
	if (room.type === 63 && room.biome_type === 13 && exploration === 'Visited')
		return true;

	const stateMeta = WorldStateMeta.filter(
		filterRoomState(room.type, room.biome_type, map)
	);
	if (stateMeta.length === 0) return false;
	const f = stateMeta.flatMap(s => s.flags);
	if (f.length === 0) return false;
	return f.every(f => value[f]);
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
