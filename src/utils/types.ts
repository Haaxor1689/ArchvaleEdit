type WorldState = {
	n90002: number; // ??? Overall game progression

	n21001: number; // ???
	n21002: number; // ???
	n21010: number; // ???
	n50001: number; // ???
	n90004: number; // ??? Fountain

	// Town
	n12: number; // Chef - 1: talked, 2: done
	n24: number; // Blacksmith - 1: talked
	n25: number; // Collector - 1: talked
	n26: number; // Shopkeep - 1: talked
	n20001: number; // Banker - 1: unlocked

	// Great Slime
	n30003: number; // Fight - flag
	n31003: number; // Health upgrade - flag

	// Maxilla
	n30007: number; // Fight - flag
	n31007: number; // Health upgrade - flag
	n32001: number; // Potion - flag

	n50106: number; // Bomb - flag

	n10005: number; // 1st archstone overworld
	n40001: number; // 1st archstone

	[key: string]: number;
};

export type Room = {
	biome_type: number;
	difficulty: number;
	flags: string;
	is_double?: 1;
	master_room_x?: number;
	master_room_y?: number;
	objective_complete: number;
	/**
	 * 000210130008010 - locked fountain
	 * 000210130008011 - unlocked fountain
	 * 00040013000C61 - def pickup
	 */
	objects: string[];
	room_id: number;
	seed: number;
	type: number;
	x: number;
	y: number;

	// Unused?
	border: number;
	border_direction: number;
};

export type Dungeon = {
	dungeon_id: number;
	exploration_data: string;
	key_data: number;
	keys: number;
	keys_silver: number;
	last_x: number;
	last_y: number;
	lock_data: number;
};

export type World = {
	difficulty: number;
	version: string;
	playtime: number;

	// Map
	active_dungeon: number;
	dungeon_data: Dungeon[];
	world: { rooms: Room[] };
	player_respawn: [number, number, number];
	npst: WorldState;

	// Coins
	player_coins: number;
	player_coins_banked: number;
	bank_level: number;

	// Health
	healcap: number;
	healing_level: number;
	plums_banked: number;

	// Stats
	player_bomb_level: number;
	player_stats: number[];

	// Items
	inventory: string;
	storage: string;

	// Badges
	badges: string;
	badges_equipped: string;
	badge_slots: number;

	// Unused?
	time: number;
	player_runes: number;
	mp: number;
	player_2_stats: number[];
};

export type InventoryItem = {
	id: number;
	count: number;
	quality: number;
};
