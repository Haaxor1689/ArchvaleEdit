import { Box, capitalize, Typography } from '@mui/material';

import { Items, StatsMetadata } from 'utils/data';
import { InventoryItem } from 'utils/types';
import Sprite from 'components/Sprite';

const Stat = ({ attr, value }: { attr: string; value: string | number }) => {
	const meta = StatsMetadata[attr];
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
