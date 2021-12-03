import yaml from 'js-yaml';
import { ReactNode } from 'react';
import { MenuItem, Select } from '@mui/material';

import crate from 'assets/world/objects/crate.png';
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
import archstoneIcon from 'assets/world/icons/archstone.png';
import dungeonIcon from 'assets/world/icons/dungeon.png';
import dungeonChestIcon from 'assets/world/icons/dungeonChest.png';
import bombIcon from 'assets/world/icons/bomb.png';
import fountainIcon from 'assets/world/icons/fountain.png';
import minibossIcon from 'assets/world/icons/miniboss.png';
import plumIcon from 'assets/world/icons/plum.png';
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
import oreShell from 'assets/world/objects/oreShell.png';
import oreIron from 'assets/world/objects/oreIron.png';
import fountainActive from 'assets/world/objects/fountainActive.png';
import fountainInactive from 'assets/world/objects/fountainInactive.png';
import defenseUp from 'assets/world/objects/defenseUp.png';
import pedestal from 'assets/world/objects/pedestal.png';
import token from 'assets/world/objects/token.png';
import tutTarget from 'assets/world/objects/tutTarget.png';
import chestOpened from 'assets/world/objects/chestOpened.png';
import chestClosed from 'assets/world/objects/chestClosed.png';
import plumPlant from 'assets/world/objects/plumPlant.png';
import plumPicked from 'assets/world/objects/plumPicked.png';
import tutBush from 'assets/world/objects/tutBush.png';
import tutPot from 'assets/world/objects/tutPot.png';
import bombableWall from 'assets/world/objects/bombableWall.png';
import eggsac from 'assets/world/objects/eggsac.png';
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
import ItemSlot from 'components/interface/inventory/ItemSlot';
import TextButton from 'components/TextButton';
import InlineItem from 'components/InlineItem';

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
const getAtkSpd = (v: number) => `${v < 0 ? '' : '+'}${v * 2}%`;

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
	atk_spd: { icon: atkSpdIcon, title: 'ATK Speed', getValue: getAtkSpd },
	cost: { icon: costIcon },
	ar_break: { icon: arBreakIcon, title: 'Armour Break' },
	slow: { icon: slowIcon, getValue: getPercent }
};

type BiomeMeta = {
	id: number;
	sprite: string;
	name?: string;
};

export const Biomes = loadYamlData<BiomeMeta>(biomes);

type RoomType = {
	sprite?: [string, number, number];
	name: string;
};

export const RoomTypes: Record<number, RoomType> = {
	[-4]: { sprite: [dungeonChestIcon, 10, 10], name: 'Dungeon Treasure' },
	[-3]: { sprite: [archstoneIcon, 12, 11], name: '1st Archstone' },
	[-2]: { sprite: [bombIcon, 10, 10], name: 'Bomb' },
	[-1]: { sprite: [minibossIcon, 10, 8], name: 'Maxilla' },
	0: { name: 'Combat' },
	1: { sprite: [minibossIcon, 10, 8], name: 'Miniboss' },
	2: { sprite: [fountainIcon, 10, 8], name: 'Starting fountain' },
	4: { sprite: [treasureIcon, 10, 10], name: 'Treasure' },
	10: { sprite: [fountainIcon, 10, 8], name: 'Fountain' },
	20: { sprite: [plumIcon, 10, 10], name: 'Mega Plum' },
	21: { sprite: [townIcon, 8, 8], name: 'Town' },
	22: { sprite: [townIcon, 8, 8], name: 'Town' },
	29: { sprite: [townIcon, 8, 8], name: 'Town' },
	26: { sprite: [shrineIcon, 8, 10], name: 'Rune trial' },
	27: { sprite: [shrineIcon, 8, 10], name: 'Rune trial' },
	47: { sprite: [dungeonIcon, 8, 7], name: 'Dungeon' },
	69: { sprite: [dungeonIcon, 8, 7], name: 'Tutorial exit' }
};

export type StateMeta = {
	name: string;
	flags: string[];
	types: number[];
	sprite: [string, number, number];
};

export const WorldStateMeta: StateMeta[] = [
	{
		name: 'Fairreach Bank',
		flags: ['n20001'],
		types: [22],
		sprite: [bankerObj, 17, 19]
	},
	{
		name: 'Fairreach Shopkeeper',
		flags: ['n26'],
		types: [22],
		sprite: [shopkeeperObj, 14, 22]
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

export type ParsedObject = {
	o: string;
	type: number;
	can_take: number;
	x: number;
	_foo: number;
	y: number;
	_bar: number;
	// Ore
	ore_type: number; // 0 shell, 1 iron
	// Fountain
	fountain_unlocked: number;
	// Chest
	chest_opened: number;
	chest_item: number;
	// Plum
	plum_picked: number;
};

type RoomAttrMeta = {
	key: Exclude<keyof ParsedObject, 'o'>;
	name: string;
	getValue?: (
		v: number,
		change: (v: string, start: number, end: number) => void
	) => ReactNode;
};

type RoomObject = {
	name: string;
	icon?: string;
	getIcon?: (o: ParsedObject) => string | undefined;
	attributes?: RoomAttrMeta[];
};

const CanTakeAttr: RoomAttrMeta = {
	key: 'can_take',
	name: 'Collected',
	getValue: (v, change) => (
		<TextButton onClick={() => change(v ? '0' : '1', 4, 5)}>
			{v ? 'No' : 'Yes'}
		</TextButton>
	)
};

const FountainUnlockedAttr: RoomAttrMeta = {
	key: 'fountain_unlocked',
	name: 'State',
	getValue: (v, change) => (
		<TextButton onClick={() => change(v ? '0' : '1', 14, 15)}>
			{v ? 'Active' : 'Inactive'}
		</TextButton>
	)
};

export const RoomObjects: Record<number, RoomObject> = {
	0: {
		name: 'Ore',
		getIcon: o => [oreShell, oreIron][o.ore_type],
		attributes: [
			CanTakeAttr,
			{
				key: 'ore_type',
				name: 'Ore type',
				getValue: (v, change) => (
					<Select
						variant="standard"
						size="small"
						value={v}
						onChange={e => change(e.target.value as string, 14, 18)}
						renderValue={selected => <InlineItem {...Items[selected + 600]} />}
						sx={{ mt: '0 !important' }}
						fullWidth
					>
						{[0, 1].map(o => (
							<MenuItem key={o} value={o}>
								<InlineItem {...Items[o + 600]} />
							</MenuItem>
						))}
					</Select>
				)
			}
		]
	},
	1: { name: 'Crate', icon: crate, attributes: [CanTakeAttr] },
	2: {
		name: 'Fountain',
		getIcon: o => (o.fountain_unlocked ? fountainActive : fountainInactive),
		attributes: [FountainUnlockedAttr]
	},
	3: {
		name: 'Fountain',
		getIcon: o => (o.fountain_unlocked ? fountainActive : fountainInactive),
		attributes: [FountainUnlockedAttr]
	},
	4: { name: 'Defense up', icon: defenseUp, attributes: [CanTakeAttr] },
	5: { name: 'Upgrade pedestal', icon: pedestal },
	6: { name: 'Token', icon: token, attributes: [CanTakeAttr] },
	7: { name: 'Tutorial target', icon: tutTarget, attributes: [CanTakeAttr] },
	8: {
		name: 'Chest',
		getIcon: o => (o.chest_opened ? chestOpened : chestClosed),
		attributes: [
			{
				key: 'chest_opened',
				name: 'State',
				getValue: (v, change) => (
					<TextButton onClick={() => change(v ? '0' : '1', 14, 15)}>
						{v ? 'Opened' : 'Closed'}
					</TextButton>
				)
			},
			{
				key: 'chest_item',
				name: 'Item',
				getValue: (v, change) => (
					<Select
						variant="standard"
						size="small"
						value={v}
						onChange={e => change(e.target.value as string, 15, 23)}
						renderValue={selected => <InlineItem {...Items[selected]} />}
						sx={{ mt: '0 !important' }}
						fullWidth
					>
						{Items.filter(i => i).map(o => (
							<MenuItem key={o.id} value={o.id}>
								<InlineItem {...o} />
							</MenuItem>
						))}
					</Select>
				)
			}
		]
	},
	// 10: { name: 'keeps crashing' },
	// 11: { name: 'its something' },
	// 12: { name: 'its something' },
	// 13: { name: 'its something' },
	// 14: { name: 'its something' },
	15: {
		name: 'Mega plum',
		getIcon: o => (o.plum_picked ? plumPicked : plumPlant),
		attributes: [
			{
				key: 'plum_picked',
				name: 'Obtained',
				getValue: (v, change) => (
					<TextButton onClick={() => change(v ? '0' : '1', 14, 15)}>
						{v ? 'Yes' : 'No'}
					</TextButton>
				)
			}
		]
	},
	16: { name: 'Tutorial bush', icon: tutBush, attributes: [CanTakeAttr] },
	17: { name: 'Tutorial pot', icon: tutPot, attributes: [CanTakeAttr] },
	18: {
		name: 'Chest',
		getIcon: o => (o.chest_opened ? chestOpened : chestClosed),
		attributes: [
			{
				key: 'chest_opened',
				name: 'State',
				getValue: (v, change) => (
					<TextButton onClick={() => change(v ? '0' : '1', 14, 15)}>
						{v ? 'Opened' : 'Closed'}
					</TextButton>
				)
			},
			{
				key: 'chest_item',
				name: 'Item',
				getValue: v => (
					<ItemSlot item={{ id: v, count: 1, quality: 0 }} variant="empty" />
				)
			}
		]
	},
	19: { name: 'Bomb-able wall', icon: bombableWall, attributes: [CanTakeAttr] },
	20: { name: 'Egg sac', icon: eggsac, attributes: [CanTakeAttr] }
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
