import { pad, parseHexValue } from 'utils';

import { Room } from './types';

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
export const parseRoomExploration = (flags: string) => {
	const val = pad(parseHexValue(flags).toString(2), 16);
	return val[11] === '1'
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
