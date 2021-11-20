import { MouseEventHandler } from 'react';
import { Box, IconButton, Typography } from '@mui/material';

import { Badges } from 'utils/data';
import hover from 'assets/badges/hover.png';
import tile from 'assets/badges/tile.png';
import slot from 'assets/badges/slot.png';
import Sprite from 'components/Sprite';

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
					<Typography color="highlight">
						{data?.description ?? '???'}
					</Typography>
					<Box sx={{ display: 'flex', gap: 1 }}>
						{[...Array(data?.slots ?? 0).keys()].map(i => (
							<Sprite key={i} img={slot} width={54} height={54} />
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
					'borderRadius': 0,
					'background': `url(${tile})`,
					'backgroundSize': 'contain',
					':hover': {
						'backgroundImage': `url(${hover})`,
						'& > div': {
							filter: `${isUnlocked(unlocked)}${isActive(active)}`
						}
					},
					'& > div': {
						filter: `${isUnlocked(unlocked, false)}${isActive(active)}`
					}
				}}
			>
				<Sprite
					img={`${process.env.PUBLIC_URL}/assets/badges/s_badge_${data?.name
						.toLowerCase()
						.replaceAll(' ', '_')
						.replaceAll("'", '')}_0.png`}
					width="100%"
					height="100%"
				/>
			</IconButton>
		</ItemTooltip>
	);
};

export default Badge;
