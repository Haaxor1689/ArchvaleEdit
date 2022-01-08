import { Item, Items } from './data';
import { InventoryItem } from './types';

const types = ['Weapon', 'Armour', 'Material', 'Treasure'] as const;

const subtypes = [
	undefined,
	'Melee',
	'Ranged',
	'Magical',
	'Head',
	'Body',
	'Ring'
] as const;

const rarities = [
	undefined,
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
	const lhsType = types.indexOf(lhs.type);
	const rhsType = types.indexOf(rhs.type);
	if (lhsType > rhsType) return 1;
	if (lhsType < rhsType) return -1;

	const lhsSubtype = subtypes.indexOf(lhs.subtype);
	const rhsSubtype = subtypes.indexOf(rhs.subtype);
	if (lhsSubtype > rhsSubtype) return 1;
	if (lhsSubtype < rhsSubtype) return -1;

	const lhsRarity = rarities.indexOf(lhs.rarity);
	const rhsRarity = rarities.indexOf(rhs.rarity);
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
