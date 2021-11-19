export type WorldState = {
	n12: number; // Chef - 1: talked, 2: done
	n50001: number; // ???
	n90002: number; // ???

	// Maxilla
	n30007: number; // Fight - flag
	n31007: number; // Health upgrade - flag
	n32001: number; // Potion - flag
	n50106: number; // Bomb - flag

	[key: string]: number;
};

export type World = {
	difficulty: number;
	version: string;
	playtime: number;

	// Map
	active_dungeon: number;
	dungeon_data: [];
	world: { rooms: [] };
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

	// ???
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
