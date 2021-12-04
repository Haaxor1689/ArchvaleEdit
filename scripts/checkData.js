const fs = require('fs');
const yaml = require('js-yaml');

const rarities = {
	uncommon: 2,
	rare: 3,
	epic: 4,
	supreme: 5,
	legendary: 6,
	ancient: 7,
	mythical: 8,
	divine: 9
};

const items = yaml
	.load(fs.readFileSync('src/utils/data/items.yaml').toString())
	.filter(f => f);

console.log(
	items
		.filter(i => i)
		.every(item => {
			if (items.filter(i => i.id === item.id).length > 1) {
				console.log(`Identifier ${item.id} is duplicate.`, item);
				return false;
			}

			if (!item.id || !item.name || !item.type || !item.sprite) {
				console.log('Missing base attributes.', item);
				return false;
			}

			if (
				[
					'Material',
					'Melee Weapon',
					'Ranged Weapon',
					'Magical Weapon',
					'Head Armour',
					'Body Armour',
					'Ring',
					'Treasure'
				].indexOf(item.type) < 0
			) {
				console.log(`Invalid type ${item.type}.`, item);
				return false;
			}

			if (
				item.rarity &&
				[
					'uncommon',
					'rare',
					'epic',
					'supreme',
					'legendary',
					'ancient',
					'mythical',
					'divine'
				].indexOf(item.rarity) < 0
			) {
				console.log(`Invalid rarity ${item.rarity}`, item);
				return false;
			}

			if (!item.sprite.length === 3) {
				console.log('Invalid sprite.', item);
				return false;
			}

			const unknownProps = Object.keys(item).filter(
				k =>
					[
						'id',
						'name',
						'type',
						'rarity',
						'sprite',
						'stats',
						'inflicts',
						'effect'
					].indexOf(k) < 0
			);
			if (unknownProps.length > 0) {
				console.log(`Unknown props '${unknownProps.join()}'.`, item);
				return false;
			}

			const unknownStats = Object.keys(item.stats ?? {}).filter(
				k =>
					[
						'damage',
						'rate',
						'range',
						'ar_pen',
						'burn',
						'bleed',
						'poison',
						'def',
						'prot',
						'all_dmg',
						'melee_dmg',
						'range_dmg',
						'magic_dmg',
						'atk_spd',
						'cost'
					].indexOf(k) < 0
			);
			if (unknownStats.length > 0) {
				console.log(`Unknown stats '${unknownStats.join()}'.`, item);
				return false;
			}

			const unknownInflicts = Object.keys(item.inflicts ?? {}).filter(
				k => ['ar_break', 'slow', 'expose'].indexOf(k) < 0
			);
			if (unknownInflicts.length > 0) {
				console.log(`Unknown inflicts '${unknownInflicts.join()}'.`, item);
				return false;
			}

			return true;
		})
		? 'No problems found...'
		: 'There are errors in data set.'
);
