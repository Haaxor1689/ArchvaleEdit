import { MouseEventHandler } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

import { Badges } from 'utils/data';
import hover from 'assets/badges/hover.png';
import tile from 'assets/badges/tile.png';
import slot from 'assets/badges/slot.png';
import Sprite from 'components/Sprite';
import { getPlayerColor, usePlayer } from 'components/PlayerContext';
import { getAsset, pulseAnimation } from 'utils';

import ItemTooltip from '../ItemTooltip';

const FloatAnimation = keyframes`
  50% {
    transform: translateY(-10%);
  }
  100% {
    transform: translateY(0);
  }
`;

const RotateAnimation = keyframes`
  0% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(-3deg);
  }
  100% {
    transform: rotate(3deg);
  }
`;

const isUnlocked = (unlocked: boolean, highlight: boolean) =>
	!unlocked ? 'brightness(0)' : `brightness(${highlight ? 1 : 0.25})`;
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
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						{[...Array(meta?.slots ?? 0).keys()].map(i => (
							<Sprite key={i} img={slot} />
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
					'background': `url(${tile})`,
					'backgroundSize': 'contain',
					':focus-visible,:hover': {
						'backgroundImage': `url(${hover})`,
						'& > div > div > img': {
							filter: t =>
								`${isUnlocked(unlocked, true)}${isActive(
									active,
									t.palette[getPlayerColor(player)]
								)}`,
							animation: pulseAnimation
						}
					},
					'& > div > div > img': {
						filter: t =>
							`${isUnlocked(unlocked, active)}${isActive(
								active,
								t.palette[getPlayerColor(player)]
							)}`
					}
				}}
			>
				<Box
					sx={
						active
							? {
									animation: `${FloatAnimation} 1.5s ease-in-out -${index}s  infinite`
							  }
							: undefined
					}
				>
					<Box
						sx={
							active
								? {
										animation: `${RotateAnimation} 2s ease-in-out -${index}s infinite`
								  }
								: undefined
						}
					>
						<Sprite
							img={getAsset(
								'badges',
								`s_badge_${meta?.name
									.toLowerCase()
									.replaceAll(' ', '_')
									.replaceAll("'", '')}`
							)}
						/>
					</Box>
				</Box>
			</IconButton>
		</ItemTooltip>
	);
};

export default Badge;
