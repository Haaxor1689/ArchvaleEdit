import { Item, Items } from './data';
import { InventoryItem } from './types';

const types = [
	'Material',
	'Melee Weapon',
	'Ranged Weapon',
	'Magical Weapon',
	'Head Armour',
	'Body Armour',
	'Ring',
	'Treasure'
] as const;

const rarities = [
	'common',
	'uncommon',
	'rare',
	'epic',
	'legendary',
	'heroic',
	'mythical',
	'divine',
	'masterwork'
] as const;

export const MaxStackSize = 250;

export const sortItems = (lhs: Item, rhs: Item) => {
	const lhsType = types.findIndex(t => lhs.type.match(`^${t}`));
	const rhsType = types.findIndex(t => rhs.type.match(`^${t}`));
	if (lhsType > rhsType) return 1;
	if (lhsType < rhsType) return -1;

	const lhsRarity = rarities.findIndex(t => t === (lhs.rarity ?? 'common'));
	const rhsRarity = rarities.findIndex(t => t === (rhs.rarity ?? 'common'));
	if (lhsRarity > rhsRarity) return 1;
	if (lhsRarity < rhsRarity) return -1;

	return lhs.name.localeCompare(rhs.name);
};

export const sortInventoryItems = (
	lhs?: InventoryItem,
	rhs?: InventoryItem
) => {
	if (!lhs) return 1;
	if (!rhs) return -1;

	const lhsItem = Items[lhs.id];
	const rhsItem = Items[rhs.id];
	if (!lhsItem) return 1;
	if (!rhsItem) return -1;

	const sorted = sortItems(lhsItem, rhsItem);
	if (sorted === 0) {
		if (lhs.count < rhs.count) return 1;
		if (lhs.count > rhs.count) return -1;
	}
	return sorted;
};
