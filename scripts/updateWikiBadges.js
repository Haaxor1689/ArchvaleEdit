const fs = require('fs');
const yaml = require('js-yaml');

const items = yaml
	.load(fs.readFileSync('src/utils/data/badges.yaml').toString())
	.filter(f => f);

const data = fs.readFileSync('scripts/badges.lua').toString();
const parsed = JSON.parse(
	data
		.replace(/^return /, '')
		.replaceAll(/ ?= ?/g, ': ')
		.replaceAll(/(\S*): /g, '"$1": ')
		.replaceAll(/ ?--.*/g, '')
		.replaceAll(/(\d)\.,/g, '$1.0,')
);

const newData = items
	.map(({ id, ...meta }) => {
		const wiki = Object.values(parsed).find(v => v.name === meta.name) ?? {};
		return {
			...wiki,
			...meta
		};
	})
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
	'scripts/badges.lua',
	`return ${JSON.stringify(newData, null, 2).replaceAll(/"(.*)": /g, '$1 = ')}`
);
