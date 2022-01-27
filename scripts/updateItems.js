const fs = require('fs');
const yaml = require('js-yaml');

const rarities = {
	1: 'uncommon',
	2: 'rare',
	3: 'epic',
	4: 'legendary',
	5: 'heroic',
	6: 'mythical',
	7: 'divine',
	10: 'masterwork'
};

const capitalize = s =>
	s
		?.split(' ')
		.map(p => p[0].toUpperCase() + p.slice(1))
		.join(' ');

const sum = arr => arr.reduce((a, b) => a + b, 0);
const avg = arr => sum(arr) / arr.length || 0;

const calcDamage = (item, attr = 'damage') =>
	(item.weapon?.firemode === 'cycle'
		? avg(item.weapon?.projectiles?.map(p => p[attr] ?? 0) ?? [])
		: sum(item.weapon?.projectiles?.map(p => p[attr] ?? 0) ?? [])) *
	(item.weapon?.shots ?? 1) *
	5;

const getDamageTooltip = (item, attr = 'damage') => {
	if (!item.weapon || !item.weapon.projectiles.filter(p => p[attr]).length)
		return undefined;
	const mult =
		(item.weapon.firemode !== 'cycle'
			? item.weapon.projectiles.filter(p => p[attr]).length
			: 1) *
		(item.weapon.shots ? item.weapon.shots : 1) *
		(item.weapon.burst ? item.weapon.burst.shots : 1);
	return `${avg(item.weapon.projectiles.map(p => p[attr]).filter(p => p)) * 5}${
		mult !== 1 ? `x${mult}` : ''
	}`;
};

const test = (name, item, lhs, rhs) => {
	if (lhs !== rhs)
		console.log(`${name} mismatch: ${item.name}, ${lhs} !== ${rhs}`);
};

const items = yaml
	.load(fs.readFileSync('src/utils/data/items.yaml').toString())
	.filter(f => f);

const data = JSON.parse(
	fs.readFileSync('scripts/itemsExport.json').toString()
).items;

const loc = fs.readFileSync('scripts/locdoc.csv').toString();

const newItems = data.map((item, i) => {
	const myItem = items[i];

	// Test missing item
	if (!myItem) {
		console.log('Missing item:', item);
	}

	// Test items matching by id
	if (myItem.id !== item.id) {
		console.log('Item mismatch:', item, myItem);
	}

	// Test all projectiles matching damage
	// if (
	// 	item.weapon?.projectiles?.reduce(
	// 		(prev, nxt) => (prev && prev !== nxt.damage ? -1 : nxt.damage),
	// 		undefined
	// 	) === -1
	// ) {
	// 	console.log(
	// 		`Different projectile damages: ${item.name}, [${item.weapon?.projectiles
	// 			.map(p => p.damage)
	// 			.join()}]`
	// 	);
	// }

	// Test all projectiles matching range
	// if (
	// 	item.weapon?.projectiles?.reduce(
	// 		(prev, nxt) => (prev && prev !== nxt.range ? -1 : nxt.range),
	// 		undefined
	// 	) === -1
	// ) {
	// 	console.log(
	// 		`Different projectile ranges: ${item.name}, [${item.weapon?.projectiles
	// 			.map(p => p.range)
	// 			.join()}]`
	// 	);
	// }

	// Test all projectiles matching ar_pen
	// if (
	// 	item.weapon?.projectiles?.reduce(
	// 		(prev, nxt) =>
	// 			prev && nxt.armour_pierce && prev !== nxt.armour_pierce
	// 				? -1
	// 				: nxt.armour_pierce ?? prev,
	// 		undefined
	// 	) === -1
	// ) {
	// 	console.log(
	// 		`Different ar pens: ${item.name}, [${item.weapon?.projectiles
	// 			.map(p => p.armour_pierce)
	// 			.join()}]`
	// 	);
	// }

	const name = `${loc.match(`${item.name},.*?,(.*?),`)?.[1] ?? item.name}${
		item.armour?.level ? ` +${item.armour?.level}` : ''
	}`;
	// test('Name', item, name, myItem.name);
	// test('Sprite', item, `${item.icon}_0`, myItem.sprite);
	test('Type', item, capitalize(item.type), myItem.type);

	const subtype = capitalize(
		item.weapon?.damage_type === 'magic'
			? 'magical'
			: item.armour?.type ?? item.weapon?.damage_type
	);
	test('Subtype', item, subtype, myItem.subtype);

	const cat = capitalize(item.weapon?.true_type ?? item.weapon?.type);
	const category =
		subtype === 'Ranged' && (cat === 'Axe' || cat === 'Sword') ? 'Thrown' : cat;
	test('Category', item, category, myItem.category);
	test('Rarity', item, rarities[item.rarity], myItem.rarity);
	// test('Damage', item, calcDamage(item), myItem.stats?.damage ?? 0);
	// test('Fire', item, calcDamage(item, 'damage_fire'), myItem.stats?.burn ?? 0);
	// test(
	// 	'Poison',
	// 	item,
	// 	calcDamage(item, 'damage_poison'),
	// 	myItem.stats?.poison ?? 0
	// );
	// test(
	// 	'Bleed',
	// 	item,
	// 	calcDamage(item, 'damage_bleed'),
	// 	myItem.stats?.bleed ?? 0
	// );
	test(
		'Range',
		item,
		item.weapon?.type === 'boomerang'
			? 0
			: Math.max(...(item.weapon?.projectiles?.map(p => p.range) ?? [0])),
		myItem.stats?.range ?? 0
	);
	test('Def', item, item.armour?.stats?.defense, myItem.stats?.def);
	test('Prot', item, item.armour?.stats?.protection, myItem.stats?.prot);
	test('All dmg', item, item.armour?.stats?.power, myItem.stats?.all_dmg);
	test(
		'Melee dmg',
		item,
		item.armour?.stats?.damage_melee,
		myItem.stats?.melee_dmg
	);
	test(
		'Range dmg',
		item,
		item.armour?.stats?.damage_range,
		myItem.stats?.range_dmg
	);
	test(
		'Magic dmg',
		item,
		item.armour?.stats?.damage_magic,
		myItem.stats?.magic_dmg
	);
	test(
		'Atk spd',
		item,
		item.armour?.stats?.attack_speed,
		myItem.stats?.atk_spd
	);
	test(
		'Armour break',
		item,
		item.weapon?.projectiles?.find(p => p.debuff?.type === 'armour_break')
			?.debuff.chance ?? 0,
		myItem.inflicts?.ar_break ?? 0
	);
	test(
		'Slow',
		item,
		item.weapon?.projectiles?.find(p => p.debuff?.type === 'slow')?.debuff
			.chance ?? 0,
		myItem.inflicts?.slow ?? 0
	);
	test(
		'Fairy',
		item,
		item.weapon?.projectiles?.find(p => p.debuff?.type === 'fairy')?.debuff
			.chance ?? 0,
		myItem.inflicts?.expose ?? 0
	);

	const effect = item.armour?.tooltip
		? loc.match(`${item.armour?.tooltip},[^,]*?,"(.*?)",`)?.[1] ??
		  loc.match(`${item.armour?.tooltip},[^,]*?,(.*?),`)?.[1]
		: undefined;
	test('Effect', item, effect, myItem.effect);

	const { id, material, unused } = myItem;

	const stats = {
		damage: getDamageTooltip(item),
		burn: getDamageTooltip(item, 'damage_fire'),
		bleed: getDamageTooltip(item, 'damage_bleed'),
		poison: getDamageTooltip(item, 'damage_poison'),
		rate: item.weapon?.firerate,
		range:
			!item.weapon || item.weapon?.type === 'boomerang'
				? undefined
				: Math.max(...item.weapon?.projectiles?.map(p => p.range)),
		ar_pen: item.weapon?.projectiles?.find(p => p.armour_pierce)?.armour_pierce,
		def: item.armour?.stats?.defense,
		prot: item.armour?.stats?.protection,
		all_dmg: item.armour?.stats?.power,
		melee_dmg: item.armour?.stats?.damage_melee,
		range_dmg: item.armour?.stats?.damage_range,
		magic_dmg: item.armour?.stats?.damage_magic,
		atk_spd: item.armour?.stats?.attack_speed,
		cost: item.value
	};

	const inflicts = {
		ar_break: item.weapon?.projectiles?.find(
			p => p.debuff?.type === 'armour_break'
		)?.debuff.chance,
		slow: item.weapon?.projectiles?.find(p => p.debuff?.type === 'slow')?.debuff
			.chance,
		expose: item.weapon?.projectiles?.find(p => p.debuff?.type === 'fairy')
			?.debuff.chance
	};

	return {
		id,
		name,
		rarity: rarities[item.rarity],
		sprite: item.icon,
		type: capitalize(item.type),
		subtype,
		category,
		effect,
		stats: Object.values(stats).filter(v => v).length > 0 ? stats : undefined,
		inflicts:
			Object.values(inflicts).filter(v => v).length > 0 ? inflicts : undefined,
		material,
		unique: item.unique,
		unused
	};
});

fs.writeFileSync(
	'src/utils/data/items.yaml',
	yaml.dump(newItems, { flowLevel: 3 })
);
