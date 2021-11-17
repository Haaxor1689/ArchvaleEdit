import { MouseEventHandler } from 'react';
import { Box, IconButton, Typography } from '@mui/material';

import { Badges } from 'utils/data';
import hover from 'assets/badges/hover.png';
import tile from 'assets/badges/tile.png';
import slot from 'assets/badges/slot.png';

import ItemTooltip from '../ItemTooltip';

const isUnlocked = (unlocked: boolean, hover = true) =>
	!unlocked ? 'brightness(0)' : `brightness(${hover ? 1 : 0.5})`;
const isActive = (active: boolean) =>
	active
		? ' drop-shadow(3px 0 0 #2ce8f5) drop-shadow(-3px 0 0 #2ce8f5) drop-shadow(0 3px 0 #2ce8f5) drop-shadow(0 -3px 0 #2ce8f5)'
		: '';

type Props = {
	unlocked: boolean;
	active: boolean;
	index: number;
	onClick: MouseEventHandler;
	setHover: (index: number | undefined) => void;
};

const Badge = ({ unlocked, active, index, onClick, setHover }: Props) => {
	const data = Badges[index];
	return (
		<ItemTooltip
			title={
				<>
					<Typography color="badge">{data?.name ?? '???'}</Typography>
					<Typography color="text.secondary">Badge</Typography>
					<Typography color="highlight">{data?.description}</Typography>
					<Box sx={{ display: 'flex', gap: 1 }}>
						{[...Array(data?.slots ?? 0).keys()].map(i => (
							<Box key={i} component="img" src={slot} />
						))}
					</Box>
				</>
			}
		>
			<IconButton
				onClick={onClick}
				onContextMenu={e => {
					e.preventDefault();
					onClick(e);
				}}
				onMouseEnter={() => setHover(index)}
				onMouseLeave={() => setHover(undefined)}
				sx={{
					'height': 116,
					'width': 108,
					'background': `url(${tile})`,
					'borderRadius': 0,
					':hover': {
						'background': `url(${hover})`,
						'& > img': {
							filter: `${isUnlocked(unlocked)}${isActive(active)}`
						}
					},
					'& > img': {
						filter: `${isUnlocked(unlocked, false)}${isActive(active)}`
					}
				}}
			>
				<Box
					component="img"
					src={`/assets/badges/${index + 1}.png`}
					alt={`Badge ${index + 1}`}
				/>
			</IconButton>
		</ItemTooltip>
	);
};

export default Badge;
