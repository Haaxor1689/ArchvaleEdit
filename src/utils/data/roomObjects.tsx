import { ReactNode } from 'react';
import { MenuItem, Select } from '@mui/material';

import ItemSlot from 'components/interface/inventory/ItemSlot';
import TextButton from 'components/TextButton';
import InlineItem from 'components/InlineItem';
import crate from 'assets/world/objects/crate.png';
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
import eggsac from 'assets/world/objects/eggsac.png';
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
import junglePot from 'assets/world/objects/junglePot.png';
import banditTent from 'assets/world/objects/banditTent.png';
import bombableWall from 'assets/world/objects/bombableWall.png';
import { Items } from 'utils/data';

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

const RoomObjects: Record<number, RoomObject> = {
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

export default RoomObjects;
