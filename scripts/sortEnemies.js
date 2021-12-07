const fs = require('fs');

const data = fs.readFileSync('scripts/enemies.lua').toString();
const parsed = JSON.parse(
	data
		.replace(/^return /, '')
		.replaceAll(/\[['"]([^\]]*)['"]\] = /g, '"$1": ')
		.replaceAll(/(\S+) = /g, '"$1": ')
		.replaceAll(/, }/g, ' }')
		.replaceAll(/ ?--.*/g, '')
		.replaceAll(/(\d)\.,/g, '$1.0,')
);

const newData = Object.values(parsed)
	.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
	.reduce(
		(obj, next) => ({
			...obj,
			[next.name
				.toLowerCase()
				.replaceAll(/$.*;/g, '')
				.replaceAll(/[^0-9a-z ]/g, '')
				.replaceAll(/ /g, '_')]: next
		}),
		{}
	);

fs.writeFileSync(
	'scripts/enemies.lua',
	`return ${JSON.stringify(newData, null, 2)
		.replaceAll(/"(\S*)": /g, '$1 = ')
		.replaceAll(/"(.*)": /g, '["$1"] = ')}`
);
