import yaml from 'js-yaml';
import { Palette } from '@mui/material';

import items from './data/items.yaml';
import badges from './data/badges.yaml';
import biomes from './data/biomes.yaml';
import dungeons from './data/dungeons.yaml';
import { Room } from './types';

const loadYamlData = <T extends { id: number }>(
	data: string,
	map: (i: T, id: number, arr: T[]) => T = t => t
) => {
	const arr: T[] = [];
	fetch(data)
		.then(r => r.text())
		.then(t => {
			(yaml.load(t) as T[]).map(map).forEach(item => {
				arr[item.id] = item;
			});
		});
	return arr;
};

type Badge = {
	id: number;
	name: string;
	description: string;
	slots: number;
};

export const Badges = loadYamlData<Badge>(badges);

export type DungeonRoom = {
	type: number | number[];
	keys?: [id: number, type: 'boss' | 'silver'][];
	locks?: [id: number, type: 'boss' | 'silver' | 'plate'][];
	loot?: [id: number, item: number][];
} & Room;

type DungeonMeta = {
	id: number;
	name: string;
	rooms: DungeonRoom[];
};

export const Dungeons = loadYamlData<DungeonMeta>(dungeons, d => ({
	...d,
	rooms: (d.rooms ?? []).map(r => ({ ...r, type: r.type ?? 0 }))
}));

export type Item = {
	id: number;
	name: string;
	rarity?: keyof Palette['rarity'];
	sprite: string;
	category?: string;
	effect?: string;
	stats?: Record<string, string | number>;
	inflicts?: Record<string, string | number>;
	material?: true;
	unique?: true;
	unused?: true;
} & (
	| { type: 'Material' | 'Treasure'; subtype: undefined }
	| { type: `Weapon`; subtype: 'Melee' | 'Ranged' | 'Magical' }
	| { type: `Armour`; subtype: 'Head' | 'Body' | 'Ring' }
	| { type: 'Treasure'; subtype: undefined }
);

export const Items = loadYamlData<Item>(items);

type BiomeMeta = {
	id: number;
	sprite: string;
	name?: string;
	types: number[];
};

export const Biomes = loadYamlData<BiomeMeta>(biomes);
