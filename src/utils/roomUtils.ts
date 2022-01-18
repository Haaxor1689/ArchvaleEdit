import { parseHexValue } from 'utils';

import { StateMeta } from './data/worldStateMeta';
import { Dungeon, Room } from './types';

export const filterRoomState =
	(type?: number, biome?: number, map?: number) => (f: StateMeta) =>
		(type === undefined || !f.types || f.types.indexOf(type) >= 0) &&
		(biome === undefined || !f.biomes || f.biomes.indexOf(biome) >= 0) &&
		(map === undefined || (f.maps ?? [-1]).indexOf(map) >= 0);

export const parseDungeonExploration = (value: string) => {
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

export const parseRoomExploration = (flags: string) => {
	if (flags[2] === '1') return 'Cleared';
	if (flags[3] === '1' && flags[4] === '3') return 'Visited';
	if (flags[4] === '2' || flags[4] === '3') return 'Seen';
	if (flags[4] === '1') return 'Outline';
	return 'Hidden';
};

export const parseRoomDirection = (flags?: string) =>
	parseHexValue(flags?.[1] ?? 'F');

const getNeighboringRooms = (room: Room, rooms: Room[]) =>
	[
		[0, -1],
		[-1, 0],
		[1, 0],
		[0, 1]
	].map(([xN, yN]) =>
		rooms.find(r => r.x - xN === room.x && r.y - yN === room.y)
	);

export const fixIncorrectExits = (rooms: Room[]) =>
	rooms.map(r => {
		const neighbors = getNeighboringRooms(r, rooms);
		return {
			...r,
			flags: `0${(
				(neighbors[0] ? 2 : 0) +
				(neighbors[1] ? 4 : 0) +
				(neighbors[2] ? 1 : 0) +
				(neighbors[3] ? 8 : 0)
			)
				.toString(16)
				.toUpperCase()}${r.flags.slice(2)}`
		};
	});

export const revealRooms = (rooms: Room[]) =>
	rooms.map(r => ({
		...r,
		flags: `0${r.flags[1]}103`
	}));

export const revealDungeons = (dungeons: Dungeon[]) =>
	dungeons.map(d => ({
		...d,
		exploration_data: [...d.exploration_data].map(() => '3').join('')
	}));
