import { z } from 'zod';

const RoomSchema = z
	.object({
		room_id: z.number(),
		type: z.number(),
		biome_type: z.number(),
		x: z.number(),
		y: z.number(),
		seed: z.number(),
		flags: z.string(), // Exploration and direction
		is_double: z.literal(1).optional(), // 2x2 rooms
		master_room_x: z.number().optional(), // X of main room if 2x2
		master_room_y: z.number().optional(), // Y of main room if 2x2
		objective_complete: z.number(),
		objects: z.string().array(),
		difficulty: z.number(),

		// TODO: Biome borders
		border: z.number(), // Biome on the other side of the border
		border_direction: z.number() // 0 - right, 1 - up, 2 - left, 3 - down
	})
	.strict();
export type Room = z.infer<typeof RoomSchema>;

const DungeonSchema = z
	.object({
		dungeon_id: z.number(),

		last_x: z.number(),
		last_y: z.number(),
		exploration_data: z.string(),

		keys: z.number(),
		keys_silver: z.number(),

		key_data: z.number(),
		lock_data: z.number(),

		loot: z.number(),

		// TODO: Unused?
		hearts_collected: z.number(),
		runes: z.number(),
		hearts: z.number(),
		map: z.number()
	})
	.strict();
export type Dungeon = z.infer<typeof DungeonSchema>;

const SpellBookSchema = z
	.object({
		spells: z.object({ spell_id: z.number() }).array()
	})
	.strict();
export type SpellBook = z.infer<typeof SpellBookSchema>;

export const WorldSchema = z
	.object({
		difficulty: z.number(),
		mp: z.number(),
		version: z.string(),
		playtime: z.number(),
		death_counter: z.number().optional(),

		// Map
		active_dungeon: z.number(),
		dungeon_data: DungeonSchema.array(),
		world: z.object({ rooms: RoomSchema.array() }),
		player_respawn: z.tuple([z.number(), z.number(), z.number()]),
		npst: z.record(z.number()),

		// Coins
		player_coins: z.number(),
		player_coins_banked: z.number(),
		bank_level: z.number(),

		// Health
		healcap: z.number(),
		healing_level: z.number(),
		plums_banked: z.number(),

		// Stats
		player_bomb_level: z.number(),
		player_stats: z.number().array(),
		player_2_stats: z.number().array(),

		// Items
		inventory: z.string(),
		storage: z.string(),
		equipment: z.string(),
		inventory_materials: z.string().optional(),

		// Badges
		badges: z.string(),
		badges_equipped: z.string(),
		badges_equipped_p2: z.string(),
		badge_slots: z.number(),

		// Unused
		time: z.number(),
		player_runes: z.number(), // Increased by picking up token objects
		spellbook: SpellBookSchema.optional(), // TODO: Unused spell feature
		spellbook_spell_p1: z.number().optional() // TODO: Active spell of unused spell feature
	})
	.strict();

export type World = z.infer<typeof WorldSchema>;

export type InventoryItem = {
	id: number;
	count: number;
	quality?: number;
	discovered?: boolean;
};
