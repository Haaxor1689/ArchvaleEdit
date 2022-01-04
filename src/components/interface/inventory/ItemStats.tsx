import { Box, capitalize, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

import { Items, StatsMetadata } from 'utils/data';
import { InventoryItem } from 'utils/types';
import Sprite from 'components/Sprite';

const rainbowColor = keyframes`
  100%,0%{
			color: rgb(255,0,0);
		}
		8%{
			color: rgb(255,127,0);
		}
		16%{
			color: rgb(255,255,0);
		}
		25%{
			color: rgb(127,255,0);
		}
		33%{
			color: rgb(0,255,0);
		}
		41%{
			color: rgb(0,255,127);
		}
		50%{
			color: rgb(0,255,255);
		}
		58%{
			color: rgb(0,127,255);
		}
		66%{
			color: rgb(0,0,255);
		}
		75%{
			color: rgb(127,0,255);
		}
		83%{
			color: rgb(255,0,255);
		}
		91%{
			color: rgb(255,0,127);
		}
`;

const Stat = ({ attr, value }: { attr: string; value: string | number }) => {
	const meta = StatsMetadata[attr];
	if (!meta) {
		console.error(`Unknown stat ${attr}!`);
		return null;
	}
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 1
			}}
		>
			<Sprite img={meta.icon} width={4.5} height={4.5} />
			<Typography flexGrow={1}>{meta.title ?? capitalize(attr)}</Typography>
			<Typography color="success.main">
				{meta.getValue?.(Number(value)) ?? value}
			</Typography>
		</Box>
	);
};

const ItemStats = ({
	id,
	quality = 0,
	name,
	rarity,
	type,
	effect,
	stats,
	inflicts,
	material,
	unique
}: typeof Items[number] & Partial<Pick<InventoryItem, 'quality'>>) => (
	<>
		<Typography
			color={`rarity.${rarity}`}
			sx={
				rarity === 'masterwork'
					? { animation: `${rainbowColor} 6s linear 0s infinite` }
					: undefined
			}
		>
			{name}
			{quality > 0 && ` +${quality}`}
			<Typography variant="caption" color="text.secondary">
				#{id}
			</Typography>
		</Typography>

		<Typography color="text.secondary">{type}</Typography>
		{material && <Typography color="text.secondary">Material</Typography>}
		{unique && <Typography color="badge">Unique</Typography>}

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
