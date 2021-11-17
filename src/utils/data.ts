type Badge = {
	name: string;
	description: string;
	slots: number;
};

export const Badges: (Badge | undefined)[] = [
	{ name: 'Ruby Brooch', description: 'Increased melee damage', slots: 2 },
	{ name: 'Emerald Brooch', description: 'Increased ranged damage', slots: 2 },
	{ name: 'Sapphire Brooch', description: 'Increased magic damage', slots: 2 },
	undefined,
	undefined,
	{
		name: 'Blue Ribbon',
		description: 'Gain an additional protection heart',
		slots: 1
	},
	undefined,
	{
		name: 'Heart Clover',
		description:
			'Increased chance for enemies to drop hearts when low on health',
		slots: 1
	},
	{
		name: 'Star Magnet',
		description: 'Massively increased pickup range for magic shards',
		slots: 1
	},
	undefined,
	undefined,
	undefined,
	{
		name: 'Arrow Bender ',
		description: 'Ranged projectiles bend towards enemies',
		slots: 2
	},
	undefined,
	undefined,
	undefined,
	{
		name: "Paladin's Light",
		description: 'Melee weapons deal fire damage while at full HP',
		slots: 2
	},
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	{
		name: 'Greedy Coin',
		description: 'Slain enemies have a chance to drop extra gold',
		slots: 1
	}
];
