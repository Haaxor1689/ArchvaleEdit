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
import forestTile from 'assets/world/tiles/forest.png';
import mushroomTile from 'assets/world/tiles/mushroom.png';
import townTile from 'assets/world/tiles/town.png';
import archstoneIcon from 'assets/world/icons/archstone.png';
import dungeonIcon from 'assets/world/icons/dungeon.png';
import dungeonChestIcon from 'assets/world/icons/dungeonChest.png';
import bombIcon from 'assets/world/icons/bomb.png';
import fountainIcon from 'assets/world/icons/fountain.png';
import minibossIcon from 'assets/world/icons/miniboss.png';
import plumIcon from 'assets/world/icons/plum.png';
import questIcon from 'assets/world/icons/quest.png';
import shrineIcon from 'assets/world/icons/shrine.png';
import townIcon from 'assets/world/icons/town.png';
import treasureIcon from 'assets/world/icons/treasure.png';
import bankerObj from 'assets/world/objects/banker.png';
import blacksmithObj from 'assets/world/objects/blacksmith.png';
import chefObj from 'assets/world/objects/chef.png';
import collectorObj from 'assets/world/objects/collector.png';
import maxillaObj from 'assets/world/objects/maxilla.png';
import shopkeeperObj from 'assets/world/objects/shopkeeper.png';
import slimeObj from 'assets/world/objects/slime.png';
import bombObj from 'assets/world/objects/bomb.png';
import dir0 from 'assets/world/directions/dir0.png';
import dir1 from 'assets/world/directions/dir1.png';
import dir2 from 'assets/world/directions/dir2.png';
import dir3 from 'assets/world/directions/dir3.png';
import dir4 from 'assets/world/directions/dir4.png';
import dir5 from 'assets/world/directions/dir5.png';
import dir6 from 'assets/world/directions/dir6.png';
import dir7 from 'assets/world/directions/dir7.png';
import dir8 from 'assets/world/directions/dir8.png';
import dir9 from 'assets/world/directions/dir9.png';
import dir10 from 'assets/world/directions/dir10.png';
import dir11 from 'assets/world/directions/dir11.png';
import dir12 from 'assets/world/directions/dir12.png';
import dir13 from 'assets/world/directions/dir13.png';
import dir14 from 'assets/world/directions/dir14.png';
import dung0 from 'assets/world/directions/dung0.png';
import dung1 from 'assets/world/directions/dung1.png';
import dung2 from 'assets/world/directions/dung2.png';
import dung3 from 'assets/world/directions/dung3.png';
import dung4 from 'assets/world/directions/dung4.png';
import dung5 from 'assets/world/directions/dung5.png';
import dung6 from 'assets/world/directions/dung6.png';
import dung7 from 'assets/world/directions/dung7.png';
import dung8 from 'assets/world/directions/dung8.png';
import dung9 from 'assets/world/directions/dung9.png';
import dung10 from 'assets/world/directions/dung10.png';
import dung11 from 'assets/world/directions/dung11.png';
import dung12 from 'assets/world/directions/dung12.png';
import dung13 from 'assets/world/directions/dung13.png';
import dung14 from 'assets/world/directions/dung14.png';
import dung15 from 'assets/world/directions/dung15.png';

import items from './data/items.yaml';
import badges from './data/badges.yaml';
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

type DungeonRoom = {
	boss_key?: number;
	silver_key?: number;
	locks?: [type: 'boss' | 'silver' | 'button', direction: number][];
} & Room;

type DungeonMeta = {
	id: number;
	name: string;
	rooms: DungeonRoom[];
};

export const Dungeons = loadYamlData<DungeonMeta>(dungeons);

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

type BiomeMeta = {
	sprite: string;
	name?: string;
};

export const Biomes: Record<number, BiomeMeta> = {
	1: { sprite: forestTile, name: 'Forest' },
	3: { sprite: forestTile, name: 'Beginner forest' },
	4: { sprite: mushroomTile, name: 'Mushroom?' },
	44: { sprite: townTile, name: 'Timberwell' },
	45: { sprite: townTile, name: 'Fairreach' }
};

type RoomType = {
	sprite?: [string, number, number];
	name: string;
};

type StateMeta = {
	name: string;
	flags: string[];
	types: number[];
	sprite: [string, number, number];
};

export const WorldStateMeta: StateMeta[] = [
	{
		name: 'Unlocked Bank',
		flags: ['n20001'],
		types: [22],
		sprite: [bankerObj, 17, 19]
	},
	{
		name: 'Talked to the Chef',
		flags: ['n12'],
		types: [22],
		sprite: [chefObj, 19, 27]
	},
	{
		name: 'Talked to the Collector',
		flags: ['n25'],
		types: [22],
		sprite: [collectorObj, 21, 21]
	},
	{
		name: 'Talked to the Shopkeeper',
		flags: ['n26'],
		types: [22],
		sprite: [shopkeeperObj, 14, 22]
	},
	{
		name: 'Talked to the Blacksmith',
		flags: ['n24'],
		types: [22],
		sprite: [blacksmithObj, 22, 19]
	},
	{
		name: 'Great Slime killed',
		flags: ['n30003', 'n31003'],
		types: [1],
		sprite: [slimeObj, 46, 44]
	},
	{
		name: 'Maxilla killed',
		flags: ['n30007', 'n31007', 'n32001'],
		types: [-1],
		sprite: [maxillaObj, 15, 22]
	},
	{
		name: 'Bomb unlocked',
		flags: ['n50106'],
		types: [-2],
		sprite: [bombObj, 16, 15]
	},
	{
		name: '1st Archstone',
		flags: ['n10005', 'n40001'],
		types: [-3, 47],
		sprite: [archstoneIcon, 12, 11]
	}
];

export const RoomTypes: Record<number, RoomType> = {
	[-4]: { sprite: [dungeonChestIcon, 10, 10], name: 'Dungeon Treasure' },
	[-3]: { sprite: [archstoneIcon, 12, 11], name: '1st Archstone' },
	[-2]: { sprite: [bombIcon, 10, 10], name: 'Bomb' },
	[-1]: { sprite: [minibossIcon, 10, 8], name: 'Maxilla' },
	1: { sprite: [minibossIcon, 10, 8], name: 'Great Slime' },
	2: { sprite: [fountainIcon, 10, 8], name: 'Fountain' },
	4: { sprite: [treasureIcon, 10, 10], name: 'Treasure' },
	10: { sprite: [fountainIcon, 10, 8], name: 'Fountain' },
	20: { sprite: [plumIcon, 10, 10], name: 'Mega Plum' },
	21: { sprite: [townIcon, 8, 8], name: 'Timberwell town' },
	22: { sprite: [townIcon, 8, 8], name: 'Fairreach town' },
	26: { sprite: [shrineIcon, 8, 10], name: 'Rune trial' },
	27: { sprite: [shrineIcon, 8, 10], name: 'Rune trial' },
	47: { sprite: [dungeonIcon, 8, 7], name: 'Lichen Keep entrance' },
	69: { sprite: [questIcon, 8, 8], name: 'Tutorial exit' }
};

export const RoomDirections = [
	dir0,
	dir1,
	dir2,
	dir3,
	dir4,
	dir5,
	dir6,
	dir7,
	dir8,
	dir9,
	dir10,
	dir11,
	dir12,
	dir13,
	dir14
];

export const DungeonDirections = [
	dung0,
	dung1,
	dung2,
	dung3,
	dung4,
	dung5,
	dung6,
	dung7,
	dung8,
	dung9,
	dung10,
	dung11,
	dung12,
	dung13,
	dung14,
	dung15
];