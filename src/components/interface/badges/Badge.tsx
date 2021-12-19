import { MouseEventHandler } from 'react';
import { Box, IconButton, Typography } from '@mui/material';

import { Badges } from 'utils/data';
import hover from 'assets/badges/hover.png';
import tile from 'assets/badges/tile.png';
import slot from 'assets/badges/slot.png';
import Sprite from 'components/Sprite';
import { getPlayerColor, usePlayer } from 'components/PlayerContext';

import ItemTooltip from '../ItemTooltip';

const isUnlocked = (unlocked: boolean, hover = true) =>
	!unlocked ? 'brightness(0)' : `brightness(${hover ? 1 : 0.5})`;
const isActive = (active: boolean, c?: string) =>
	active
		? ` drop-shadow(3px 0 0 ${c}) drop-shadow(-3px 0 0 ${c}) drop-shadow(0 3px 0 ${c}) drop-shadow(0 -3px 0 ${c})`
		: '';

type Props = {
	unlocked: boolean;
	active: boolean;
	index: number;
	onClick: MouseEventHandler;
	setHover: (index: number | undefined) => void;
};

const Badge = ({ unlocked, active, index, onClick, setHover }: Props) => {
	const player = usePlayer();
	const meta = Badges[index];
	return (
		<ItemTooltip
			title={
				<>
					<Typography color="badge">{meta?.name ?? '???'}</Typography>
					<Typography color="text.secondary">Badge</Typography>
					<Typography color="highlight">
						{meta?.description ?? '???'}
					</Typography>
					<Box sx={{ display: 'flex', gap: 1 }}>
						{[...Array(meta?.slots ?? 0).keys()].map(i => (
							<Sprite key={i} img={slot} width={9} height={9} />
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
					'height': t => t.spacing(19),
					'width': t => t.spacing(18),
					'borderRadius': 0,
					'background': `url(${tile})`,
					'backgroundSize': 'contain',
					':hover': {
						'backgroundImage': `url(${hover})`,
						'& > div': {
							filter: t =>
								`${isUnlocked(unlocked)}${isActive(
									active,
									t.palette[getPlayerColor(player)]
								)}`
						}
					},
					'& > div': {
						filter: t =>
							`${isUnlocked(unlocked, false)}${isActive(
								active,
								t.palette[getPlayerColor(player)]
							)}`
					}
				}}
			>
				<Sprite
					img={`${process.env.PUBLIC_URL}/assets/badges/s_badge_${meta?.name
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
