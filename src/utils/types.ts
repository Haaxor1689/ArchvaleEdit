type WorldState = {
	// Town
	n0: number; // Sam unlocked
	n12: number; // Chef - 1: talked, 2: done
	n24: number; // Blacksmith - 1: talked
	n25: number; // Collector - 1: talked
	n26: number; // Shopkeep - 1: talked

	n90002: number; // Enemy kills
	n90004: number; // Fountains unlocked

	// Banker
	n20001: number; // Fairreach
	n20002: number; // Bogtown
	n20003: number; // Chamberstone
	n20004: number; // The Pit
	n20005: number; // Pearlloch
	n20006: number; // Sprucepoint
	n20007: number; // Buckler's cove
	n20008: number; // Morelton

	// Shopkeeper
	n21001: number; // Exclamation mark
	n21002: number; // Fairreach
	n21003: number; // Buckler's cove
	n21004: number; // Bogtown
	n21005: number; // Sprucepoint
	n21006: number; // Chamberstone
	n21007: number; // The Pit
	n21008: number; // Pearlloch
	n21009: number; // Morelton

	// Badge trader
	n21010: number; // Exclamation mark
	n21011: number; // Fairreach
	n21012: number; // Buckler's cove
	n21013: number; // Bogtown
	n21014: number; // Sprucepoint
	n21015: number; // Chamberstone
	n21016: number; // Pearlloch
	n21017: number; // The Pit

	// Great Slime
	n30003: number; // Fight - flag
	n31003: number; // Health upgrade - flag

	// Maxilla
	n30007: number; // Fight - flag
	n31007: number; // Health upgrade - flag
	n32001: number; // Potion - flag

	n50001: number; // ???
	n50106: number; // Bomb - flag

	n10005: number; // 1st archstone overworld
	n40001: number; // 1st archstone

	[key: string]: number;
};

export type Room = {
	room_id: number;
	type: number;
	biome_type: number;
	x: number;
	y: number;
	seed: number;
	flags: string; // Exploration and direction
	is_double?: 1; // 2x2 rooms
	master_room_x?: number; // X of main room if 2x2
	master_room_y?: number; // Y of main room if 2x2
	objective_complete: number;
	objects: string[];

	// TODO: Biome borders
	border: number;
	border_direction: number;

	// ???
	difficulty: number;
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
	mp: number;
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
	player_2_stats: number[];

	// Items
	inventory: string;
	storage: string;

	// Badges
	badges: string;
	badges_equipped: string;
	badges_equipped_p2: string;
	badge_slots: number;

	// Unused?
	time: number;
	player_runes: number; // TODO: increased by picking up token objects
};

export type InventoryItem = {
	id: number;
	count: number;
	quality: number;
};
