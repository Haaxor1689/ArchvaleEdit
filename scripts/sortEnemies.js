const fs = require('fs');

const devData = JSON.parse(
	fs.readFileSync('scripts/enemyExport.lua').toString()
);

const data = fs.readFileSync('scripts/enemies.lua').toString();
const cleaned = data
	.replace(/^return /, '')
	.replaceAll(/\[['"]([^\]]+)['"]\] = /g, '"$1": ')
	.replaceAll(/([^{\s]+) = /g, '"$1": ')
	.replaceAll(/, }/g, ' }')
	.replaceAll(/ ?--.*/g, '')
	.replaceAll(/(\d)\.,/g, '$1.0,')
	.replaceAll(/: \{([^:]+?)\}(,?)\n/gm, ': [$1]$2\n');
console.log(cleaned);
const parsed = JSON.parse(cleaned);

const newData = Object.values(parsed)
	.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
	.reduce((obj, next) => {
		const dev = devData[next.game_object];
		const defense = dev?.armour_class ?? next.armour_class;
		return {
			...obj,
			[next.name
				.toLowerCase()
				.replaceAll(/$.*;/g, '')
				.replaceAll(/[^0-9a-z ]/g, '')
				.replaceAll(/ /g, '_')]: {
				...next,
				hp: dev?.hp ?? next.hp,
				defense: defense === 0 ? undefined : defense,
				attacks:
					dev && Object.values(next.attacks)[0] !== dev.attack_damage
						? { 'Contact Damage': dev.attack_damage }
						: {}
			}
		};
	}, {});

fs.writeFileSync(
	'scripts/enemies.lua',
	`return ${JSON.stringify(newData, null, 2)
		.replaceAll(/"(\S*)": /g, '$1 = ')
		.replaceAll(/"(.*)": /g, '["$1"] = ')}`.replaceAll(
		/ = \[([\s\S]*?)\](,?)\n/gm,
		' = {$1}$2\n'
	)
);
