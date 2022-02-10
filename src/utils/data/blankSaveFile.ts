import { Dungeons } from 'utils/data';
import { World } from 'utils/types';

import GeneratedMaps from './generatedMaps';

const BlankSaveFile = (
	map = Math.floor(Math.random() * GeneratedMaps.length)
): World => ({
	difficulty: 1,
	mp: 0,
	version: '1.2.pr.0.3',
	playtime: 0,
	death_counter: 0,
	active_dungeon: 29,
	dungeon_data: Dungeons.map(d => ({
		dungeon_id: d.id,
		last_x: -1,
		last_y: -1,
		exploration_data: d.rooms.map(() => '0').join(''),
		keys: 0,
		keys_silver: 0,
		key_data: 0,
		lock_data: 0,
		loot: 0,
		hearts_collected: 0,
		runes: 0,
		hearts: 0,
		map: 0
	})),
	world: { rooms: GeneratedMaps[map] },
	player_respawn: [0, 44, 67],
	npst: {},
	player_coins: 0,
	player_coins_banked: 0,
	bank_level: 0,
	healcap: 2,
	healing_level: 0,
	plums_banked: 0,
	player_bomb_level: 0,
	player_stats: [50, 3, 0, 0, 0, 0, 0, 0, 0, 0],
	player_2_stats: [50, 3, 0, 0, 0, 0, 0, 0, 0, 0],
	inventory: [...Array(32).keys()].map(() => 'FFFF000').join(''),
	storage: [...Array(104).keys()].map(() => 'FFFF000').join(''),
	equipment: [...Array(6).keys()].map(() => 'FFFF000').join(''),
	inventory_materials:
		'000100000100020000010003000001000700000100050000010006000001000A0000010008000001000C000001000D00000100100000010011000001000F00000100120000010015000001001600000102580000010259000001025A000001025C000001025B000001025D000001025E000001025F0000010260000001026100000103840000010388000000038C000000001A000001FFFF000001FFFF000001',
	badges: '0000000000000000000000000000000000000000',
	badges_equipped: '',
	badges_equipped_p2: '',
	badge_slots: 3,
	time: 0,
	player_runes: 0
});

export default BlankSaveFile;
