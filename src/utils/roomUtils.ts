import { pad, parseHexValue } from 'utils';

import { StateMeta } from './data';
import { Room } from './types';

export const filterRoomState =
	(type?: number, biome?: number) => (f: StateMeta) =>
		(!f.types || f.types.indexOf(type ?? 0) >= 0) &&
		(!f.biomes || f.biomes.indexOf(biome ?? 0) >= 0);

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

// TODO: add cleared flag for overworld rooms toggle
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
 * - 11 - visited
 * TODO: 0 - hidden, 1 - black tiles, 3 - unvisited
 * - 12 - ???
 * - 13 - colored + no icons UNUSED
 * - 14 - unvisited (grey)
 * - 15 - black tiles
 */
export const parseRoomFlags = (flags: string) =>
	pad(parseHexValue(flags).toString(2), 16);

export const parseRoomExploration = (flags: string) => {
	const val = parseRoomFlags(flags);

	return val[7] === '1'
		? 'Visited'
		: val[14] === '1'
		? 'Seen'
		: ('Hidden' as const);
};

export const parseRoomDirection = (flags: string) => parseHexValue(flags[1]);

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
