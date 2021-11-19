import { Box, capitalize, Typography } from '@mui/material';

import { Items } from 'utils/data';
import { InventoryItem } from 'utils/types';
import damageIcon from 'assets/stats/damage.png';
import rateIcon from 'assets/stats/rate.png';
import rangeIcon from 'assets/stats/range.png';
import arPenIcon from 'assets/stats/ar_pen.png';
import arBreakIcon from 'assets/stats/ar_break.png';
import burnIcon from 'assets/stats/burn.png';
import slowIcon from 'assets/stats/slow.png';
import bleedIcon from 'assets/stats/bleed.png';
import defIcon from 'assets/stats/def.png';
import meleeDmgIcon from 'assets/stats/melee_dmg.png';
import rangeDmgIcon from 'assets/stats/range_dmg.png';
import magicDmgIcon from 'assets/stats/magic_dmg.png';
import atkSpdIcon from 'assets/stats/atk_spd.png';
import costIcon from 'assets/stats/cost.png';
import Sprite from 'components/Sprite';

type StatMeta = {
	icon: string;
	title?: string;
	getValue?: (v: number) => string;
};

const getPercent = (v: number) => `${v * 100}%`;

const StatRender: Record<string, StatMeta> = {
	damage: { icon: damageIcon },
	rate: { icon: rateIcon },
	range: { icon: rangeIcon },
	ar_pen: { icon: arPenIcon, title: 'Armour Pen.' },
	burn: { icon: burnIcon },
	bleed: { icon: bleedIcon },
	def: { icon: defIcon, title: 'Defense' },
	melee_dmg: { icon: meleeDmgIcon, title: 'Melee DMG', getValue: getPercent },
	range_dmg: { icon: rangeDmgIcon, title: 'Ranged DMG', getValue: getPercent },
	magic_dmg: { icon: magicDmgIcon, title: 'Magical DMG', getValue: getPercent },
	atk_spd: { icon: atkSpdIcon, title: 'ATK Speed', getValue: getPercent },
	cost: { icon: costIcon },
	ar_break: { icon: arBreakIcon, title: 'Armour Break' },
	slow: { icon: slowIcon, getValue: getPercent }
};

const Stat = ({ attr, value }: { attr: string; value: string | number }) => {
	const meta = StatRender[attr];
	if (!meta) {
		console.error(`Unknown stat ${attr}!`);
		return null;
	}
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 300 }}>
			<Sprite img={meta.icon} width={32} height={32} />
			<Typography flexGrow={1}>{meta.title ?? capitalize(attr)}</Typography>
			<Typography color="success.main">
				{meta.getValue?.(Number(value)) ?? value}
			</Typography>
		</Box>
	);
};

const ItemStats = ({
	quality,
	name,
	rarity,
	type,
	effect,
	stats,
	inflicts
}: typeof Items[number] & Pick<InventoryItem, 'quality'>) => (
	<>
		<Typography color={rarity}>
			{name}
			{quality > 0 && ` +${quality}`}
		</Typography>
		<Typography color="text.secondary">{type}</Typography>

		{effect && <Typography>{effect}</Typography>}

		{Object.entries(stats ?? {}).map(([key, value]) => (
			<Stat key={key} attr={key} value={value} />
		))}

		{inflicts && (
			<>
				<Typography color="text.secondary">Inflicts</Typography>
				{Object.entries(inflicts).map(([key, value]) => (
					<Stat key={key} attr={key} value={value} />
				))}
			</>
		)}
	</>
);

export default ItemStats;
