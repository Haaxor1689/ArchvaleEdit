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
	border: number; // Biome on the other side of the border
	border_direction: number; // 0 - right, 1 - up, 2 - left, 3 - down

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

type SpellBook = {
	spells: { spell_id: number }[];
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
	npst: { [key: string]: number };

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

	// Unused
	time: number;
	player_runes: number; // Increased by picking up token objects
	spellbook: SpellBook; // TODO: Unused spell feature
	spellbook_spell_p1: number; // TODO: Active spell of unused spell feature
};

export type InventoryItem = {
	id: number;
	count: number;
	quality: number;
};
