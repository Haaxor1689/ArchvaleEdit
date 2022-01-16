import yaml from 'js-yaml';
import { ReactNode } from 'react';
import { MenuItem, Palette, Select } from '@mui/material';

import crate from 'assets/world/objects/crate.png';
import damageIcon from 'assets/stats/damage.png';
import rateIcon from 'assets/stats/rate.png';
import rangeIcon from 'assets/stats/range.png';
import arPenIcon from 'assets/stats/ar_pen.png';
import arBreakIcon from 'assets/stats/ar_break.png';
import burnIcon from 'assets/stats/burn.png';
import slowIcon from 'assets/stats/slow.png';
import exposeIcon from 'assets/stats/expose.png';
import protIcon from 'assets/stats/prot.png';
import poisonIcon from 'assets/stats/poison.png';
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
import arenaIcon from 'assets/world/icons/arena.png';
import archIcon from 'assets/world/icons/arch.png';
import mapIcon from 'assets/world/icons/map.png';
import dungeonChestIcon from 'assets/world/icons/dungeonChest.png';
import dungeonTreasureIcon from 'assets/world/icons/dungeonTreasure.png';
import silverKeyIcon from 'assets/world/icons/silverKey.png';
import bossKeyIcon from 'assets/world/icons/bossKey.png';
import bombIcon from 'assets/world/icons/bomb.png';
import fountainIcon from 'assets/world/icons/fountain.png';
import questIcon from 'assets/world/icons/quest.png';
import anvilIcon from 'assets/world/icons/anvil.png';
import arrRight from 'assets/world/icons/arrRight.png';
import arrUp from 'assets/world/icons/arrUp.png';
import arrDown from 'assets/world/icons/arrDown.png';
import minibossIcon from 'assets/world/icons/miniboss.png';
import damageBlessingIcon from 'assets/world/damageBlessing.png';
import plumIcon from 'assets/world/icons/plum.png';
import shrineIcon from 'assets/world/icons/shrine.png';
import townIcon from 'assets/world/icons/town.png';
import treasureIcon from 'assets/world/icons/treasure.png';
import badgeTraderObj from 'assets/world/objects/badgeTrader.png';
import wizardObj from 'assets/world/objects/wizard.png';
import samObj from 'assets/world/objects/sam.png';
import bankerObj from 'assets/world/objects/banker.png';
import blacksmithObj from 'assets/world/objects/blacksmith.png';
import chefObj from 'assets/world/objects/chef.png';
import collectorObj from 'assets/world/objects/collector.png';
import maxillaObj from 'assets/world/objects/maxilla.png';
import shopkeeperObj from 'assets/world/objects/shopkeeper.png';
import barrelBobObj from 'assets/world/objects/barrelBob.png';
import comedianFishObj from 'assets/world/objects/comedianFish.png';
import lennyObj from 'assets/world/objects/lenny.png';
import greatSlimeObj from 'assets/world/objects/greatSlime.png';
import mongoObj from 'assets/world/objects/mongo.png';
import ghostCrabObj from 'assets/world/objects/ghostCrab.png';
import frankenslimeObj from 'assets/world/objects/frankenslime.png';
import queenDunewormObj from 'assets/world/objects/queenDuneworm.png';
import crabbyPatObj from 'assets/world/objects/crabbyPat.png';
import clayManObj from 'assets/world/objects/clayMan.png';
import soulSerpentObj from 'assets/world/objects/soulSerpent.png';
import fallenPharaohObj from 'assets/world/objects/fallenPharaoh.png';
import exiledWizardObj from 'assets/world/objects/exiledWizard.png';
import rottedKingObj from 'assets/world/objects/rottedKing.png';
import grovesBlightObj from 'assets/world/objects/grovesBlight.png';
import sunkenQueenObj from 'assets/world/objects/sunkenQueen.png';
import banishedExecutionerObj from 'assets/world/objects/banishedExecutioner.png';
import constructionChamberDoorObj from 'assets/world/objects/constructionChamberDoor.png';
import jungleEntranceObj from 'assets/world/objects/jungleEntrance.png';
import hellGuardianObj from 'assets/world/objects/hellGuardian.png';
import hellArenaObj from 'assets/world/objects/hellArena.png';
import pitEntranceObj from 'assets/world/objects/pitEntrance.png';
import oldKingObj from 'assets/world/objects/oldKing.png';
import bombObj from 'assets/world/objects/bomb.png';
import oreShell from 'assets/world/objects/oreShell.png';
import oreIron from 'assets/world/objects/oreIron.png';
import oreGold from 'assets/world/objects/oreGold.png';
import oreDarksteel from 'assets/world/objects/oreDarksteel.png';
import oreObsidian from 'assets/world/objects/oreObsidian.png';
import oreCobalt from 'assets/world/objects/oreCobalt.png';
import oreMauvite from 'assets/world/objects/oreMauvite.png';
import orePhloem from 'assets/world/objects/orePhloem.png';
import oreZephyr from 'assets/world/objects/oreZephyr.png';
import oreHyperium from 'assets/world/objects/oreHyperium.png';
import fountainActive from 'assets/world/objects/fountainActive.png';
import fountainInactive from 'assets/world/objects/fountainInactive.png';
import heart from 'assets/world/objects/heart.png';
import heartHalf from 'assets/world/objects/heartHalf.png';
import badgeSlot from 'assets/world/objects/badgeSlot.png';
import healingFlask from 'assets/world/objects/healingFlask.png';
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
import junglePot from 'assets/world/objects/junglePot.png';
import banditTent from 'assets/world/objects/banditTent.png';
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
import dir15 from 'assets/world/directions/dir15.png';
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
import exclamationBubble from 'assets/world/objects/exclamationBubble.png';
import speechBubble from 'assets/world/objects/speechBubble.png';
import cradlewood from 'assets/customIcons/cradlewood.png';
// import amberpath from 'assets/customIcons/amberpath.png';
// import crabclawChasm from 'assets/customIcons/crabclawChasm.png';
import dustcrag from 'assets/customIcons/dustcrag.png';
import murkmire from 'assets/customIcons/murkmire.png';
import pinePeak from 'assets/customIcons/pinePeak.png';
import twistedCaverns from 'assets/customIcons/twistedCaverns.png';
import fungusGrotto from 'assets/customIcons/fungusGrotto.png';
import tanglegrove from 'assets/customIcons/tanglegrove.png';
import brinkreef from 'assets/customIcons/brinkreef.png';
import moltenRift from 'assets/customIcons/moltenRift.png';
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
	sprite: [string, number, number];
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

type StatMeta = {
	icon: string;
	title?: string;
	getValue?: (v: number) => string;
};

const getPercent = (v: number) => `${v * 100}%`;
const getPlus = (v: number) => `${v < 0 ? '' : '+'}${v * 5}%`;
const getAtkSpd = (v: number) => `${v < 0 ? '' : '+'}${v * 2}%`;

export const StatsMetadata: Record<string, StatMeta> = {
	damage: { icon: damageIcon },
	rate: { icon: rateIcon },
	range: { icon: rangeIcon },
	ar_pen: { icon: arPenIcon, title: 'Armour Pen.' },
	burn: { icon: burnIcon },
	bleed: { icon: bleedIcon },
	poison: { icon: poisonIcon },
	def: { icon: defIcon, title: 'Defense' },
	prot: { icon: protIcon, title: 'Protection' },
	spd: { icon: spdIcon, title: 'Speed', getValue: getPlus },
	all_dmg: { icon: allDmgIcon, title: 'Power', getValue: getPlus },
	melee_dmg: { icon: meleeDmgIcon, title: 'Melee DMG', getValue: getPlus },
	range_dmg: { icon: rangeDmgIcon, title: 'Ranged DMG', getValue: getPlus },
	magic_dmg: { icon: magicDmgIcon, title: 'Magical DMG', getValue: getPlus },
	atk_spd: { icon: atkSpdIcon, title: 'ATK Speed', getValue: getAtkSpd },
	cost: { icon: costIcon },
	ar_break: { icon: arBreakIcon, title: 'Armour Break', getValue: getPercent },
	slow: { icon: slowIcon, getValue: getPercent },
	expose: { icon: exposeIcon, getValue: getPercent }
};

type BiomeMeta = {
	id: number;
	sprite: string;
	name?: string;
	types: number[];
};

export const Biomes = loadYamlData<BiomeMeta>(biomes);

type RoomType = {
	sprite?: [string, number, number];
	name: string;
};

// TODO: Show custom room requirements
export const RoomTypes: Record<number, RoomType> = {
	[-7]: { sprite: [silverKeyIcon, 8, 5], name: 'Silver Key' },
	[-6]: { sprite: [bossKeyIcon, 8, 5], name: 'Boss Key' },
	[-5]: { sprite: [dungeonTreasureIcon, 8, 8], name: 'Dungeon Treasure' },
	[-4]: { sprite: [dungeonChestIcon, 8, 8], name: 'Dungeon Ring' },
	[-3]: { sprite: [damageBlessingIcon, 10, 10], name: 'Damage Blessing' },
	[-2]: { sprite: [bombIcon, 10, 10], name: 'Bomb unlock' },
	[-1]: { sprite: [archstoneIcon, 12, 11], name: 'Archstone' },
	0: { name: 'Combat' },
	1: { sprite: [minibossIcon, 10, 8], name: 'Boss' }, // boss
	2: { sprite: [fountainIcon, 10, 8], name: 'Starting Fountain' }, // spawn
	// 3: instant crash
	4: { sprite: [treasureIcon, 10, 10], name: 'Treasure' }, // treasure
	// 5: ???
	// 6: instant crash
	7: { sprite: [questIcon, 8, 8], name: 'UNUSED Ladder' }, // portal1 (crashes)
	8: { sprite: [townIcon, 8, 8], name: 'UNUSED Home' }, // home
	9: { sprite: [archIcon, 8, 8], name: 'UNUSED Arch' }, // arch
	10: { sprite: [fountainIcon, 10, 8], name: 'Fountain' }, // save
	// 11: { sprite: [questIcon, 8, 8], name: 'UNUSED Teleport' }, // teleport (crashes)
	12: { sprite: [bombIcon, 10, 10], name: 'Bomb Power' }, // bombup
	// 13: { sprite: [questIcon, 8, 8], name: 'UNUSED Town teleport' }, // town_teleport (crashes)
	// 14: { sprite: [questIcon, 8, 8], name: 'UNUSED Town Fountain' }, // town_save (crashes)
	15: { sprite: [anvilIcon, 9, 6], name: 'UNUSED Forge' }, // town_forge
	// 16: { sprite: [questIcon, 8, 8], name: 'UNUSED Town Shop' }, // town_shop (crashes)
	// 17: town bank, crashes
	18: { sprite: [questIcon, 8, 8], name: 'UNUSED Magic shop' }, // shop
	19: { sprite: [questIcon, 8, 8], name: 'UNUSED Sam' }, // sam
	20: { sprite: [plumIcon, 10, 10], name: 'Mega Plum' }, // plum
	21: { sprite: [townIcon, 8, 8], name: 'Town' }, // town
	22: { sprite: [townIcon, 8, 8], name: 'Town (Fairreach)' }, // town_primary
	25: { sprite: [mapIcon, 8, 8], name: 'UNUSED Map' }, // map
	26: { sprite: [shrineIcon, 8, 10], name: 'Shrine A' }, // lib_a
	27: { sprite: [shrineIcon, 8, 10], name: 'Shrine B' }, // lib_b
	29: { sprite: [townIcon, 8, 8], name: 'Town (The Pit)' }, // arena
	31: { sprite: [questIcon, 8, 8], name: 'UNUSED Tower' }, // tower (crashes)
	// 34: { sprite: [questIcon, 8, 8], name: 'UNUSED Heart' }, // heart (crashes)
	// 35: { sprite: [questIcon, 8, 8], name: 'UNUSED Ore' }, // ore (crashes)
	// 37: { sprite: [questIcon, 8, 8], name: 'UNUSED Heal Power' }, // healup (crashes)
	38: { sprite: [questIcon, 8, 8], name: 'UNUSED Witch' }, // witch (crashes)
	40: { sprite: [questIcon, 8, 8], name: 'UNUSED Camp easy' }, // camp_easy (requires arena trigger object)
	41: { sprite: [arenaIcon, 10, 8], name: 'Camp' }, // camp_medium (requires arena trigger object)
	// 42: { sprite: [questIcon, 8, 8], name: '42 ???' },
	46: { sprite: [questIcon, 8, 8], name: 'UNUSED Boss' }, // boss (crashes)
	47: { sprite: [dungeonIcon, 8, 7], name: 'Dungeon' }, // dungeon
	// 48: { sprite: [questIcon, 8, 8], name: 'UNUSED Camp' }, // camp (crashes)
	51: { sprite: [questIcon, 8, 8], name: 'UNUSED Dungeon entrance' }, // dungeon_entrance (crashes)
	52: { sprite: [questIcon, 8, 8], name: 'UNUSED Main' }, // main (crashes)
	// 53: instant crash
	54: { sprite: [questIcon, 8, 8], name: 'UNUSED Food court' }, // foodcourt (crashes)
	55: { sprite: [questIcon, 8, 8], name: 'UNUSED Boss entrance' }, // bossentrance (crashes)
	56: { sprite: [questIcon, 8, 8], name: 'UNUSED Boss room' }, // bossroom (crashes)
	57: { sprite: [treasureIcon, 10, 10], name: 'UNUSED Treasure' }, // treasure
	58: { sprite: [anvilIcon, 9, 6], name: 'UNUSED Spell Pillar' }, // spell
	59: { sprite: [arrUp, 8, 9], name: 'Amberpath border' }, // border_glade
	// 60: { sprite: [questIcon, 8, 8], name: 'UNUSED Forest border' }, // border_forest (crashes)
	61: { sprite: [arrRight, 9, 8], name: 'Crabclaw Chasm border' }, // border_cave
	62: { sprite: [arrRight, 9, 8], name: 'Dustcrag border' }, // border_desert
	63: { sprite: [arrUp, 8, 9], name: 'Murkmire border' }, // border_swamp
	64: { sprite: [arrUp, 8, 9], name: 'UNUSED Ruins border' }, // border_temple
	65: { sprite: [arrUp, 8, 9], name: 'Pine Peak border' }, // border_snow
	66: { sprite: [arrRight, 9, 8], name: 'Twisted Caverns border' }, // border_cavern
	69: { sprite: [arrDown, 8, 9], name: 'Tutorial exit' }, // tutorial_exit
	70: { sprite: [questIcon, 8, 8], name: 'NPC' } // specialnpc
};

export type StateMeta = {
	name: string;
	shortName?: string;
	value?: number;
	flags: string[];
	types?: number[];
	biomes?: number[];
	maps?: number[];
	sprite: [string, number, number];
	secondarySprite?: [string, number, number];
	nonCompletion?: boolean;
};

export const WorldStateMeta: StateMeta[] = [
	{
		name: 'UNUSED Talked to Sam',
		shortName: 'UNUSED Talked',
		flags: ['n0'],
		types: [21],
		biomes: [], // Missing amberpath town biome
		sprite: [samObj, 30, 23],
		secondarySprite: [speechBubble, 11, 10],
		nonCompletion: true
	},
	{
		name: 'Talked to the Banker',
		shortName: 'Talked',
		flags: ['n10'],
		types: [21, 22, 29],
		biomes: [45, 7, 12, 46, 26, 16, 48, 50],
		sprite: [bankerObj, 17, 19],
		secondarySprite: [speechBubble, 11, 10]
	},
	{
		name: 'Talked to the Shopkeeper',
		shortName: 'Talked',
		flags: ['n26'],
		types: [21, 22, 29],
		biomes: [45, 7, 12, 46, 26, 16, 48, 50],
		sprite: [shopkeeperObj, 14, 22],
		secondarySprite: [speechBubble, 11, 10]
	},
	{
		name: 'Talked to the Chef',
		shortName: 'Talked',
		flags: ['n12'],
		types: [22],
		biomes: [45],
		sprite: [chefObj, 19, 27],
		secondarySprite: [speechBubble, 11, 10],
		nonCompletion: true
	},
	{
		name: 'Fully upgraded healing brew',
		shortName: 'Fully upgraded',
		value: 2,
		flags: ['n12'],
		types: [22],
		biomes: [45],
		sprite: [chefObj, 19, 27],
		secondarySprite: [healingFlask, 10, 14]
	},
	{
		name: 'Talked to the Blacksmith',
		shortName: 'Talked',
		flags: ['n24'],
		types: [22],
		biomes: [45],
		sprite: [blacksmithObj, 22, 19],
		secondarySprite: [speechBubble, 11, 10]
	},
	{
		name: 'Talked to the Collector',
		shortName: 'Talked',
		flags: ['n25'],
		types: [22],
		biomes: [45],
		sprite: [collectorObj, 21, 21],
		secondarySprite: [speechBubble, 11, 10]
	},
	{
		name: 'Talked to the Wizard',
		shortName: 'Talked',
		flags: ['n30'],
		types: [22],
		biomes: [45],
		sprite: [wizardObj, 24, 26],
		secondarySprite: [speechBubble, 11, 10]
	},
	{
		name: 'Talked to Barrel Bob',
		shortName: 'Talked',
		flags: ['n23'],
		types: [21],
		biomes: [7],
		sprite: [barrelBobObj, 14, 22],
		secondarySprite: [speechBubble, 11, 10],
		nonCompletion: true
	},
	{
		name: 'Heard the 1st joke from the Comedian fish',
		shortName: '1st joke',
		flags: ['n22'],
		types: [21],
		biomes: [47],
		sprite: [comedianFishObj, 18, 19],
		secondarySprite: [speechBubble, 11, 10],
		nonCompletion: true
	},
	{
		name: 'Heard the 2nd joke from the Comedian fish',
		shortName: '2nd joke',
		flags: ['n22'],
		value: 2,
		types: [21],
		biomes: [47],
		sprite: [comedianFishObj, 18, 19],
		secondarySprite: [speechBubble, 11, 10],
		nonCompletion: true
	},
	{
		name: 'Talked to the Clay Man',
		shortName: 'Talked',
		flags: ['n28'],
		types: [70],
		biomes: [29],
		sprite: [clayManObj, 20, 34],
		secondarySprite: [speechBubble, 11, 10]
	},
	{
		name: 'Talked to Crabby Pat',
		shortName: 'Talked',
		flags: ['n29'],
		types: [70],
		biomes: [8],
		sprite: [crabbyPatObj, 33, 27],
		secondarySprite: [speechBubble, 11, 10]
	},
	{
		name: 'Fairreach Bank',
		shortName: 'Fairreach',
		flags: ['n20001'],
		types: [22],
		biomes: [45],
		sprite: [bankerObj, 17, 19],
		secondarySprite: [cradlewood, 10, 10]
	},
	{
		name: "Buckler's cove Bank",
		shortName: "Buckler's cove",
		flags: ['n20007'],
		types: [21],
		biomes: [7],
		sprite: [bankerObj, 17, 19],
		secondarySprite: [dustcrag, 10, 10]
	},
	{
		name: 'Bogtown Bank',
		shortName: 'Bogtown',
		flags: ['n20002'],
		types: [21],
		biomes: [12],
		sprite: [bankerObj, 17, 19],
		secondarySprite: [murkmire, 10, 10]
	},
	{
		name: 'Sprucepoint Bank',
		shortName: 'Sprucepoint',
		flags: ['n20006'],
		types: [21],
		biomes: [46],
		sprite: [bankerObj, 17, 19],
		secondarySprite: [pinePeak, 10, 10]
	},
	{
		name: 'Chamberstone Bank',
		shortName: 'Chamberstone',
		flags: ['n20003'],
		types: [21],
		biomes: [26],
		sprite: [bankerObj, 17, 19],
		secondarySprite: [twistedCaverns, 10, 10]
	},
	{
		name: 'Morelton Bank',
		shortName: 'Morelton',
		flags: ['n20008'],
		types: [21],
		biomes: [16],
		sprite: [bankerObj, 17, 19],
		secondarySprite: [fungusGrotto, 10, 10]
	},
	{
		name: 'Pearlloch Bank',
		shortName: 'Pearlloch',
		flags: ['n20005'],
		types: [21],
		biomes: [48],
		sprite: [bankerObj, 17, 19],
		secondarySprite: [brinkreef, 10, 10]
	},
	{
		name: 'The Pit Bank',
		shortName: 'The Pit',
		flags: ['n20004'],
		types: [29],
		biomes: [50],
		sprite: [bankerObj, 17, 19],
		secondarySprite: [moltenRift, 10, 10]
	},
	{
		name: 'Shopkeeper new items',
		shortName: 'New items',
		flags: ['n21001'],
		types: [21, 22, 29],
		biomes: [45, 7, 12, 46, 26, 16, 48, 50],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [exclamationBubble, 11, 13],
		nonCompletion: true
	},
	{
		name: 'Fairreach Shopkeeper',
		shortName: 'Fairreach',
		flags: ['n21002'],
		types: [22],
		biomes: [45],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [cradlewood, 10, 10]
	},
	{
		name: "Buckler's cove Shopkeeper",
		shortName: "Buckler's cove",
		flags: ['n21003'],
		types: [21],
		biomes: [7],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [dustcrag, 10, 10]
	},
	{
		name: "Buckler's cove Shopkeeper Half-Heart",
		shortName: 'Half-Heart',
		flags: ['n60003'],
		types: [21],
		biomes: [7],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'Bogtown Shopkeeper',
		shortName: 'Bogtown',
		flags: ['n21004'],
		types: [21],
		biomes: [12],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [murkmire, 10, 10]
	},
	{
		name: 'Bogtown Shopkeeper Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n60001'],
		types: [21],
		biomes: [12],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'Sprucepoint Shopkeeper',
		shortName: 'Sprucepoint',
		flags: ['n21005'],
		types: [21],
		biomes: [46],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [pinePeak, 10, 10]
	},
	{
		name: 'Sprucepoint Shopkeeper Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n60002'],
		types: [21],
		biomes: [46],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'Chamberstone Shopkeeper',
		shortName: 'Chamberstone',
		flags: ['n21006'],
		types: [21],
		biomes: [26],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [twistedCaverns, 10, 10]
	},
	{
		name: 'UNUSED Chamberstone Shopkeeper Half-Heart',
		shortName: 'UNUSED Half-Heart',
		flags: ['n60012'],
		types: [21],
		biomes: [26],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [heartHalf, 15, 14],
		nonCompletion: true
	},
	{
		name: 'Morelton Shopkeeper',
		shortName: 'Morelton',
		flags: ['n21009'],
		types: [21],
		biomes: [16],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [fungusGrotto, 10, 10]
	},
	{
		name: 'Pearlloch Shopkeeper',
		shortName: 'Pearlloch',
		flags: ['n21008'],
		types: [21],
		biomes: [48],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [brinkreef, 10, 10]
	},
	{
		name: 'Pearlloch Shopkeeper Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n60005'],
		types: [21],
		biomes: [48],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'The Pit Shopkeeper',
		shortName: 'The Pit',
		flags: ['n21007'],
		types: [29],
		biomes: [50],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [moltenRift, 10, 10]
	},
	{
		name: 'The Pit Shopkeeper Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n60004'],
		types: [29],
		biomes: [50],
		sprite: [shopkeeperObj, 17, 19],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'Badge trader new items',
		shortName: 'New items',
		flags: ['n21010'],
		types: [21, 22, 29],
		biomes: [45, 7, 12, 46, 26, 48, 50],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [exclamationBubble, 11, 13],
		nonCompletion: true
	},
	{
		name: 'Fairreach Badge trader',
		shortName: 'Fairreach',
		flags: ['n21011'],
		types: [22],
		biomes: [45],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [cradlewood, 10, 10]
	},
	{
		name: "Buckler's cove Badge trader",
		shortName: "Buckler's cove",
		flags: ['n21012'],
		types: [21],
		biomes: [7],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [dustcrag, 10, 10]
	},
	{
		name: "Buckler's cove Badge trader Badge Slot",
		shortName: 'Badge Slot',
		flags: ['n60008'],
		types: [21],
		biomes: [7],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [badgeSlot, 14, 14]
	},
	{
		name: 'Bogtown Badge trader',
		shortName: 'Bogtown',
		flags: ['n21013'],
		types: [21],
		biomes: [12],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [murkmire, 10, 10]
	},
	{
		name: 'Bogtown Badge trader Badge Slot',
		shortName: 'Badge Slot',
		flags: ['n60006'],
		types: [21],
		biomes: [12],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [badgeSlot, 14, 14]
	},
	{
		name: 'Sprucepoint Badge trader',
		shortName: 'Sprucepoint',
		flags: ['n21014'],
		types: [21],
		biomes: [46],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [pinePeak, 10, 10]
	},
	{
		name: 'Sprucepoint Badge trader Badge Slot',
		shortName: 'Badge Slot',
		flags: ['n60007'],
		types: [21],
		biomes: [46],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [badgeSlot, 14, 14]
	},
	{
		name: 'Chamberstone Badge trader',
		shortName: 'Chamberstone',
		flags: ['n21015'],
		types: [21],
		biomes: [26],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [twistedCaverns, 10, 10]
	},
	{
		name: 'Chamberstone trader Badge Slot',
		shortName: 'Badge Slot',
		flags: ['n60009'],
		types: [21],
		biomes: [26],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [badgeSlot, 14, 14]
	},
	{
		name: 'Pearlloch Badge trader',
		shortName: 'Pearlloch',
		flags: ['n21016'],
		types: [21],
		biomes: [48],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [brinkreef, 10, 10]
	},
	{
		name: 'Pearlloch trader Badge Slot',
		shortName: 'Badge Slot',
		flags: ['n60011'],
		types: [21],
		biomes: [48],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [badgeSlot, 14, 14]
	},
	{
		name: 'The Pit Badge trader',
		shortName: 'The Pit',
		flags: ['n21017'],
		types: [29],
		biomes: [50],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [moltenRift, 10, 10]
	},
	{
		name: 'The Pit trader Badge Slot',
		shortName: 'Badge Slot',
		flags: ['n60010'],
		types: [29],
		biomes: [50],
		sprite: [badgeTraderObj, 17, 23],
		secondarySprite: [badgeSlot, 14, 14]
	},
	{
		name: 'Great Slime',
		flags: ['n30003'],
		types: [1],
		biomes: [1],
		sprite: [greatSlimeObj, 46, 44]
	},
	{
		name: 'Great Slime Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31003'],
		types: [1],
		biomes: [1],
		sprite: [greatSlimeObj, 46, 44],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'Mongo',
		flags: ['n30001'],
		types: [1],
		biomes: [23],
		sprite: [mongoObj, 35, 35]
	},
	{
		name: 'Mongo Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31001'],
		types: [1],
		biomes: [23],
		sprite: [mongoObj, 35, 35],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'Ghost Crab',
		flags: ['n30004'],
		types: [1],
		biomes: [8],
		sprite: [ghostCrabObj, 40, 26]
	},
	{
		name: 'Ghost Crab Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31004'],
		types: [1],
		biomes: [8],
		sprite: [ghostCrabObj, 40, 26],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'Queen Duneworm',
		flags: ['n30005'],
		types: [1],
		biomes: [5],
		sprite: [queenDunewormObj, 25, 47]
	},
	{
		name: 'Queen Duneworm Crab Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31006'],
		types: [1],
		biomes: [5],
		sprite: [queenDunewormObj, 25, 47],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'Soul Serpent',
		flags: ['n30002'],
		types: [1],
		biomes: [10],
		sprite: [soulSerpentObj, 48, 48]
	},
	{
		name: 'Soul Serpent Crab Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31002'],
		types: [1],
		biomes: [10],
		sprite: [soulSerpentObj, 48, 48],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'Frankenslime',
		flags: ['n30006'],
		types: [1],
		biomes: [25],
		sprite: [frankenslimeObj, 72, 40]
	},
	{
		name: 'Frankenslime Crab Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31005'],
		types: [1],
		biomes: [25],
		sprite: [frankenslimeObj, 72, 40],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'Talked to Maxilla',
		shortName: 'Talked',
		flags: ['n50001'],
		types: [1],
		maps: [0],
		sprite: [maxillaObj, 15, 22],
		secondarySprite: [speechBubble, 11, 10]
	},
	{
		name: 'Maxilla',
		flags: ['n30007'],
		types: [1],
		maps: [0],
		sprite: [maxillaObj, 15, 22]
	},
	{
		name: 'Maxilla Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31007'],
		types: [1],
		maps: [0],
		sprite: [maxillaObj, 15, 22],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'Maxilla Potion',
		shortName: 'Potion',
		flags: ['n32001'],
		types: [1],
		maps: [0],
		sprite: [maxillaObj, 15, 22],
		secondarySprite: [healingFlask, 10, 14]
	},
	{
		name: 'Fallen Pharaoh',
		flags: ['n30008'],
		types: [1],
		maps: [1],
		sprite: [fallenPharaohObj, 24, 47]
	},
	{
		name: 'Fallen Pharaoh Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31008'],
		types: [1],
		maps: [1],
		sprite: [fallenPharaohObj, 24, 47],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'Fallen Pharaoh Potion',
		shortName: 'Potion',
		flags: ['n32002'],
		types: [1],
		maps: [1],
		sprite: [fallenPharaohObj, 24, 47],
		secondarySprite: [healingFlask, 10, 14]
	},
	{
		name: 'Exiled Wizard',
		flags: ['n30009'],
		types: [1],
		maps: [2],
		sprite: [exiledWizardObj, 16, 23]
	},
	{
		name: 'Exiled Wizard Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31009'],
		types: [1],
		maps: [2],
		sprite: [exiledWizardObj, 16, 23],
		secondarySprite: [heartHalf, 15, 14]
	},
	{
		name: 'Exiled Wizard Potion',
		shortName: 'Potion',
		flags: ['n32003'],
		types: [1],
		maps: [2],
		sprite: [exiledWizardObj, 16, 23],
		secondarySprite: [healingFlask, 10, 14]
	},
	{
		name: 'Talked to the Rotted King',
		shortName: 'Talked',
		flags: ['n50005'],
		types: [1],
		maps: [4],
		sprite: [rottedKingObj, 50, 43],
		secondarySprite: [speechBubble, 11, 10]
	},
	{
		name: 'Rotted King',
		flags: ['n30011'],
		types: [1],
		maps: [4],
		sprite: [rottedKingObj, 50, 43]
	},
	{
		name: 'Rotted King Heart',
		shortName: 'Heart',
		flags: ['n31011'],
		types: [1],
		maps: [4],
		sprite: [rottedKingObj, 50, 43],
		secondarySprite: [heart, 15, 14]
	},
	{
		name: 'Rotted King Potion',
		shortName: 'Potion',
		flags: ['n32005'],
		types: [1],
		maps: [4],
		sprite: [rottedKingObj, 50, 43],
		secondarySprite: [healingFlask, 10, 14]
	},
	{
		name: "Grove's Blight",
		flags: ['n30010'],
		types: [1],
		maps: [3],
		sprite: [grovesBlightObj, 46, 47]
	},
	{
		name: "Grove's Blight Heart",
		shortName: 'Heart',
		flags: ['n31010'],
		types: [1],
		maps: [3],
		sprite: [grovesBlightObj, 46, 47],
		secondarySprite: [heart, 15, 14]
	},
	{
		name: "Grove's Blight Potion",
		shortName: 'Potion',
		flags: ['n32004'],
		types: [1],
		maps: [3],
		sprite: [grovesBlightObj, 46, 47],
		secondarySprite: [healingFlask, 10, 14]
	},
	{
		name: 'Talked to the Sunken Queen',
		shortName: 'Talked',
		flags: ['n50007'],
		types: [1],
		maps: [6],
		sprite: [sunkenQueenObj, 47, 44],
		secondarySprite: [speechBubble, 11, 10]
	},
	{
		name: 'Sunken Queen',
		flags: ['n30013'],
		types: [1],
		maps: [6],
		sprite: [sunkenQueenObj, 47, 44]
	},
	{
		name: 'Sunken Queen Heart',
		shortName: 'Heart',
		flags: ['n31013'],
		types: [1],
		maps: [6],
		sprite: [sunkenQueenObj, 47, 44],
		secondarySprite: [heart, 15, 14]
	},
	{
		name: 'Sunken Queen Potion',
		shortName: 'Potion',
		flags: ['n0'], // n32007
		types: [1],
		maps: [6],
		sprite: [sunkenQueenObj, 47, 44],
		secondarySprite: [healingFlask, 10, 14]
	},
	{
		name: 'Banished Executioner',
		flags: ['n30012'],
		types: [1],
		maps: [5],
		sprite: [banishedExecutionerObj, 34, 41]
	},
	{
		name: 'Banished Executioner Heart',
		shortName: 'Heart',
		flags: ['n31012'],
		types: [1],
		maps: [5],
		sprite: [banishedExecutionerObj, 34, 41],
		secondarySprite: [heart, 15, 14]
	},
	{
		name: 'Banished Executioner Potion',
		shortName: 'Potion',
		flags: ['n32006'],
		types: [1],
		maps: [5],
		sprite: [banishedExecutionerObj, 34, 41],
		secondarySprite: [healingFlask, 10, 14]
	},
	{
		name: 'Talked to the Old King',
		shortName: 'Talked',
		flags: ['n50008'],
		types: [1],
		maps: [7],
		sprite: [oldKingObj, 35, 48],
		secondarySprite: [speechBubble, 11, 10]
	},
	{
		name: 'Bomb',
		flags: ['n50106'],
		types: [-2],
		sprite: [bombObj, 16, 15]
	},
	{
		name: '1st Archstone',
		shortName: 'Lichen Keep',
		flags: ['n40001', 'n10005'],
		types: [-1, 47],
		biomes: [1],
		maps: [-1, 0],
		sprite: [archstoneIcon, 12, 11],
		secondarySprite: [cradlewood, 10, 10]
	},
	{
		name: '2nd Archstone',
		shortName: 'Tomb of Kings',
		flags: ['n40002'],
		types: [-1, 47],
		biomes: [5],
		maps: [-1, 1],
		sprite: [archstoneIcon, 12, 11],
		secondarySprite: [dustcrag, 10, 10]
	},
	{
		name: '3rd Archstone',
		shortName: 'Crystal Atheneum',
		flags: ['n40003'],
		types: [-1, 47],
		biomes: [13],
		maps: [-1, 2],
		sprite: [archstoneIcon, 12, 11],
		secondarySprite: [pinePeak, 10, 10]
	},
	{
		name: '4th Archstone',
		shortName: 'Agarica Palace',
		flags: ['n40005'],
		types: [-1, 47],
		biomes: [16],
		maps: [-1, 4],
		sprite: [archstoneIcon, 12, 11],
		secondarySprite: [fungusGrotto, 10, 10]
	},
	{
		name: '5th Archstone',
		shortName: 'Temple of Groveheart',
		flags: ['n40004'],
		types: [-1, 47],
		biomes: [29],
		maps: [-1, 3],
		sprite: [archstoneIcon, 12, 11],
		secondarySprite: [tanglegrove, 10, 10]
	},
	{
		name: '6th Archstone',
		shortName: 'Drowned Mausoleum',
		flags: ['n40007'],
		types: [-1, 47],
		biomes: [47],
		maps: [-1, 6],
		sprite: [archstoneIcon, 12, 11],
		secondarySprite: [brinkreef, 10, 10]
	},
	{
		name: '7th Archstone',
		shortName: "The Executioner's Lair",
		flags: ['n40006'],
		types: [-1, 47],
		biomes: [49],
		maps: [-1, 5],
		sprite: [archstoneIcon, 12, 11],
		secondarySprite: [moltenRift, 10, 10]
	},
	{
		name: 'Tanglegrove entrance challenge done',
		shortName: 'Tanglegrove entrance',
		flags: ['n10001'],
		types: [63],
		biomes: [29],
		sprite: [jungleEntranceObj, 48, 29]
	},
	{
		name: 'Talked to Lenny',
		shortName: 'Talked',
		flags: ['n27'],
		types: [21],
		biomes: [7],
		sprite: [lennyObj, 39, 33],
		secondarySprite: [speechBubble, 11, 10],
		nonCompletion: true
	},
	{
		name: 'Given 10 Living Vines to Lenny',
		shortName: 'Brinkreef entrance',
		value: 2,
		flags: ['n27'],
		types: [21],
		biomes: [7],
		sprite: [lennyObj, 39, 33]
	},
	{
		name: 'Molten Rift entrance challenge done',
		shortName: 'Molten Rift entrance',
		flags: ['n10002'],
		types: [66],
		biomes: [49],
		sprite: [hellGuardianObj, 25, 29]
	},
	{
		name: 'Arena entrance guardian talked to',
		shortName: 'Talked',
		value: 2,
		flags: ['n10004'],
		types: [29],
		biomes: [50],
		sprite: [hellGuardianObj, 25, 29],
		secondarySprite: [speechBubble, 11, 10]
	},
	{
		name: 'Beaten Molten Rift arena',
		shortName: 'Arena beaten',
		flags: ['n10003'],
		types: [29],
		biomes: [50],
		sprite: [hellArenaObj, 33, 49]
	},
	{
		name: "Talked to the Executioner's Lair entrance guardian",
		shortName: 'Talked',
		value: 2,
		flags: ['n13'],
		types: [47],
		biomes: [49],
		sprite: [hellGuardianObj, 25, 29],
		secondarySprite: [speechBubble, 11, 10],
		nonCompletion: true
	},
	{
		name: "Executioner's Lair entrance",
		shortName: 'Opened',
		value: 3,
		flags: ['n13'],
		types: [47],
		biomes: [49],
		sprite: [pitEntranceObj, 65, 40]
	},
	{
		name: 'Construction Chamber Opened',
		shortName: 'Opened',
		flags: ['n40008'],
		types: [47],
		biomes: [25],
		sprite: [constructionChamberDoorObj, 59, 39]
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
	// Bomb
	upgrade_obtained: number;
	// Chest
	chest_opened: number;
	chest_item: number;
	// Arena
	arena_trigger: number;
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
		getIcon: o =>
			[
				oreShell,
				oreIron,
				oreGold,
				oreDarksteel,
				oreObsidian,
				oreCobalt,
				oreMauvite,
				oreHyperium,
				orePhloem,
				oreZephyr
			][o.ore_type],
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
						renderValue={selected => (
							<InlineItem
								{...Items[[0, 1, 2, 3, 4, 5, 6, 9, 7, 8][selected] + 600]}
							/>
						)}
						sx={{ mt: '0 !important' }}
						fullWidth
					>
						{[0, 1, 2, 3, 4, 5, 6, 9, 7, 8].map(o => (
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
		name: 'City Fountain',
		getIcon: o => (o.fountain_unlocked ? fountainActive : fountainInactive),
		attributes: [FountainUnlockedAttr]
	},
	4: { name: 'Defense up', icon: defenseUp, attributes: [CanTakeAttr] },
	5: {
		name: 'Bomb power',
		icon: pedestal,
		attributes: [
			{
				key: 'upgrade_obtained',
				name: 'Obtained',
				getValue: (v, change) => (
					<TextButton onClick={() => change(v ? '0' : '1', 14, 15)}>
						{v ? 'Yes' : 'No'}
					</TextButton>
				)
			}
		]
	},
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
	9: {
		name: 'Arena trigger',
		icon: banditTent,
		attributes: [
			{
				key: 'arena_trigger',
				name: 'State',
				getValue: (v, change) => (
					<TextButton onClick={() => change(v ? '0' : '1', 14, 15)}>
						{v ? 'Cleared' : 'Active'}
					</TextButton>
				)
			}
		]
	},
	// 10: { name: 'keeps crashing' },
	// 11: { name: 'its something' },
	// 12: { name: 'its something' },
	13: { name: 'Jungle pot', icon: junglePot, attributes: [CanTakeAttr] },
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
	dir14,
	dir15
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
