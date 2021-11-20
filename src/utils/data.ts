import yaml from 'js-yaml';

import damageIcon from 'assets/stats/damage.png';
import rateIcon from 'assets/stats/rate.png';
import rangeIcon from 'assets/stats/range.png';
import arPenIcon from 'assets/stats/ar_pen.png';
import arBreakIcon from 'assets/stats/ar_break.png';
import burnIcon from 'assets/stats/burn.png';
import slowIcon from 'assets/stats/slow.png';
import bleedIcon from 'assets/stats/bleed.png';
import defIcon from 'assets/stats/def.png';
import spdIcon from 'assets/stats/spd.png';
import allDmgIcon from 'assets/stats/all_dmg.png';
import meleeDmgIcon from 'assets/stats/melee_dmg.png';
import rangeDmgIcon from 'assets/stats/range_dmg.png';
import magicDmgIcon from 'assets/stats/magic_dmg.png';
import atkSpdIcon from 'assets/stats/atk_spd.png';
import costIcon from 'assets/stats/cost.png';

import items from './data/items.yaml';
import badges from './data/badges.yaml';

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
	sprite: [string, number, number];
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

type StatMeta = {
	icon: string;
	title?: string;
	getValue?: (v: number) => string;
};

const getPercent = (v: number) => `${v * 5}%`;
const getPlus = (v: number) => `${v < 0 ? '' : '+'}${v * 5}%`;

export const StatsMetadata: Record<string, StatMeta> = {
	damage: { icon: damageIcon },
	rate: { icon: rateIcon },
	range: { icon: rangeIcon },
	ar_pen: { icon: arPenIcon, title: 'Armour Pen.' },
	burn: { icon: burnIcon },
	bleed: { icon: bleedIcon },
	def: { icon: defIcon, title: 'Defense' },
	spd: { icon: spdIcon, title: 'Speed', getValue: getPlus },
	all_dmg: { icon: allDmgIcon, title: 'All DMG', getValue: getPlus },
	melee_dmg: { icon: meleeDmgIcon, title: 'Melee DMG', getValue: getPlus },
	range_dmg: { icon: rangeDmgIcon, title: 'Ranged DMG', getValue: getPlus },
	magic_dmg: { icon: magicDmgIcon, title: 'Magical DMG', getValue: getPlus },
	atk_spd: { icon: atkSpdIcon, title: 'ATK Speed', getValue: getPlus },
	cost: { icon: costIcon },
	ar_break: { icon: arBreakIcon, title: 'Armour Break' },
	slow: { icon: slowIcon, getValue: getPercent }
};
