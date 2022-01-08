const fs = require('fs');
const yaml = require('js-yaml');

const rarities = {
	uncommon: 2,
	rare: 3,
	epic: 4,
	legendary: 5,
	heroic: 6,
	mythical: 7,
	divine: 8,
	masterwork: 9
};

const items = yaml
	.load(fs.readFileSync('src/utils/data/items.yaml').toString())
	.filter(f => f);

const data = fs.readFileSync('scripts/items.lua').toString();
const cleaned = data
	.replace(/^return /, '')
	.replaceAll(/\[['"]([^\]]+)['"]\] = /g, '"$1": ')
	.replaceAll(/([^{\s]+) = /g, '"$1": ')
	.replaceAll(/, }/g, ' }')
	.replaceAll(/ ?--.*/g, '')
	.replaceAll(/(\d)\.,/g, '$1.0,')
	.replaceAll(/: \{([^:]+?)\}(,?)\n/gm, ': [$1]$2\n');
const parsed = JSON.parse(cleaned);

const newData = [
	...items
		.map(meta => {
			if (meta.unused) return undefined;
			const wiki = Object.values(parsed).find(v => v.name === meta.name) ?? {};
			const dmg = meta.stats?.damage?.split('x');
			return {
				acquisition: wiki?.acquisition ?? 'Incomplete data',
				armour_break: meta.inflicts?.ar_break
					? `${meta.inflicts?.ar_break * 100}%`
					: undefined,
				armour_type:
					meta.type === 'Armour'
						? meta.subtype === 'Ring'
							? 'Ring'
							: `${meta.subtype} Armour`
						: undefined,
				attack_speed_buff: meta.stats?.atk_spd
					? `${meta.stats?.atk_spd * 2}%`
					: undefined,
				bleed: meta.stats?.bleed,
				burn: meta.stats?.burn,
				crafting: wiki.crafting,
				damage: dmg?.[0] ? Number(dmg[0]) : undefined,
				damage_mod: dmg?.[1] ? Number(dmg[1]) : undefined,
				defense: meta.stats?.def,
				expose: meta.inflicts?.expose
					? `${meta.inflicts?.expose * 100}%`
					: undefined,
				item_type: meta.type.match(/ Weapon/)
					? 'Weapon'
					: meta.type.match(/ Armour/) || meta.type === 'Ring'
					? 'Armour'
					: meta.type,
				magic_buff: meta.stats?.magic_dmg
					? `${meta.stats?.magic_dmg * 5}%`
					: undefined,
				material_type: wiki.tags ?? wiki.material_type ?? meta.tags,
				melee_buff: meta.stats?.melee_dmg
					? `${meta.stats?.melee_dmg * 5}%`
					: undefined,
				name: meta.name,
				penetration: meta.stats?.ar_pen,
				power: meta.stats?.all_dmg ? `${meta.stats?.all_dmg * 5}%` : undefined,
				poison: meta.stats?.poison,
				protection: meta.stats?.prot,
				range: meta.stats?.range,
				range_buff: meta.stats?.range_dmg
					? `${meta.stats?.range_dmg * 5}%`
					: undefined,
				rate: meta.stats?.rate,
				ring_type: wiki?.ring_type,
				slow: meta.inflicts?.slow ? `${meta.inflicts?.slow * 100}%` : undefined,
				special_effects: meta.effect ?? wiki.special_effects,
				tier: rarities[meta.rarity] ?? 1,
				value: meta.stats?.cost,
				weapon_category:
					wiki?.weapon_category === 'Heavy' ? 'Heavy' : meta.category,
				weapon_type: meta.type === 'Weapon' ? meta.subtype : undefined
			};
		})
		.filter(i => i),
	...Object.entries(parsed)
		.filter(v => !items.find(i => i.name === v[1].name))
		.map(v => ({ ...v[1], key: v[0] }))
]
	.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
	.reduce(
		(obj, { key, ...next }) => ({
			...obj,
			[key ??
			next.name
				.toLowerCase()
				.replaceAll(/$.*;/g, '')
				.replaceAll(/[^0-9a-z ]/g, '')
				.replaceAll(/ /g, '_')]: next
		}),
		{}
	);

fs.writeFileSync(
	'scripts/items.lua',
	`return ${JSON.stringify(newData, null, 2)
		.replaceAll(/"(\S*)": /g, '$1 = ')
		.replaceAll(/"(.*)": /g, '["$1"] = ')}`.replaceAll(
		/ = \[([\s\S]*?)\](,?)\n/gm,
		' = {$1}$2\n'
	)
);
