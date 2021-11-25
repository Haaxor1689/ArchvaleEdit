import { keyframes } from '@emotion/react';
import { MouseEventHandler } from 'react';
import { IconButton, Typography } from '@mui/material';

import slotAvailable from 'assets/badges/slotAvailable.png';
import slotUnavailable from 'assets/badges/slotUnavailable.png';
import slotFilled from 'assets/badges/slotFilled.png';
import slotEmpty from 'assets/badges/slotEmpty.png';
import slotOverflow from 'assets/badges/slotOverflow.png';
import slotLocked from 'assets/badges/slotLocked.png';
import slotsPanel from 'assets/badges/slotsPanel.png';
import Sprite from 'components/Sprite';
import { StrokeTextShadow } from 'utils';
import OverflowAsterisk from 'components/Overflowsterisk';

export const MaxBadgeSlots = 9;

const fade = keyframes`
  0%, 50%, 100% {
    opacity: 1;
  }

  25%, 75% {
    opacity: 0.25;
  }
`;

type Props = {
	unlocked: number;
	used: number;
	hover: number;
	onClick: MouseEventHandler;
};

const BadgeSlots = ({ unlocked, used, hover, onClick }: Props) => {
	const filled = Math.min(hover < 0 ? used + hover : used, unlocked);
	const negativeHover = hover < 0 ? -hover : 0;
	const positiveHover =
		hover < 0 ? 0 : Math.max(Math.min(hover, unlocked - used), 0);
	const empty = Math.max(
		unlocked - (filled + negativeHover + positiveHover),
		0
	);
	const overflow = Math.max(used + hover - unlocked, 0);
	const locked = Math.max(
		MaxBadgeSlots - (filled + negativeHover + positiveHover + empty + overflow),
		0
	);

	return (
		<Sprite
			component={IconButton}
			onClick={onClick}
			onContextMenu={onClick}
			img={slotsPanel}
			sx={{
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				borderRadius: 0,
				gap: 1,
				p: 3,
				pb: 7,
				mt: -6.5
			}}
		>
			{[...Array(Math.min(9, filled)).keys()].map(k => (
				<Sprite key={k} img={slotFilled} width={9} height={9} />
			))}
			{[...Array(negativeHover).keys()].map(k => (
				<Sprite
					key={k}
					img={slotFilled}
					width={9}
					height={9}
					sx={{ animation: `${fade} 2s ease 0s infinite normal forwards` }}
				/>
			))}
			{[...Array(positiveHover).keys()].map(k => (
				<Sprite
					key={k}
					img={overflow ? slotUnavailable : slotAvailable}
					width={9}
					height={9}
					sx={{ animation: `${fade} 2s ease 0s infinite normal forwards` }}
				/>
			))}
			{[
				...Array(Math.min(Math.max(0, 9 - used - positiveHover), empty)).keys()
			].map(k => (
				<Sprite key={k} img={slotEmpty} width={9} height={9} />
			))}
			{[...Array(overflow).keys()].map(k => (
				<Sprite key={k} img={slotOverflow} width={9} height={9} />
			))}
			{[...Array(locked).keys()].map(k => (
				<Sprite key={k} img={slotLocked} width={9} height={9} />
			))}
			<Typography
				variant="h5"
				sx={{
					position: 'absolute',
					bottom: t => t.spacing(2),
					textShadow: StrokeTextShadow
				}}
			>
				{used}/{unlocked}
				<OverflowAsterisk overflow={unlocked > 9} />
			</Typography>
		</Sprite>
	);
};

export default BadgeSlots;
