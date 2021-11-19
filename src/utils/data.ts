import yaml from 'js-yaml';

import badges from './data/badges.yaml';
import items from './data/items.yaml';

const loadYamlData = <T extends { id: number }>(data: string) => {
	const arr: T[] = [];
	fetch(data)
		.then(r => r.text())
		.then(t => {
			(yaml.load(t) as (T & { i: number })[]).forEach(item => {
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

export type Item = {
	id: number;
	name: string;
	rarity?: 'uncommon' | 'legendary';
	effect?: string;
	stats?: Record<string, string | number>;
	inflicts?: Record<string, string | number>;
} & (
	| { type: 'Material' }
	| { type: `${'Melee' | 'Ranged' | 'Magical'} Weapon` }
	| { type: `${'Head' | 'Body'} Armour` }
	| { type: 'Ring' }
	| { type: 'Treasure' }
);

export const Items = loadYamlData<Item>(items);
