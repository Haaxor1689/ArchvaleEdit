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
import Sprite, { SpriteBox } from 'components/Sprite';
import { StrokeTextShadow } from 'utils';
import OverflowAsterisk from 'components/OverflowAsterisk';

export const MaxBadgeSlots = 9;

const fade = keyframes`
  0%, 50%, 100% {
    opacity: 1;
  }

  25%, 75% {
    opacity: 0.5;
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
		<SpriteBox
			component={IconButton}
			img={slotsPanel}
			onClick={onClick}
			onContextMenu={onClick}
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 1,
				p: 3,
				pb: 7,
				mt: -6.5
			}}
		>
			{[...Array(Math.min(9, filled)).keys()].map(k => (
				<Sprite key={k} img={slotFilled} />
			))}
			{[...Array(negativeHover).keys()].map(k => (
				<Sprite
					key={k}
					img={slotFilled}
					sx={{ animation: `${fade} 1.5s ease infinite` }}
				/>
			))}
			{[...Array(positiveHover).keys()].map(k => (
				<Sprite
					key={k}
					img={overflow ? slotUnavailable : slotAvailable}
					sx={{ animation: `${fade} 1.5s ease infinite` }}
				/>
			))}
			{[
				...Array(Math.min(Math.max(0, 9 - used - positiveHover), empty)).keys()
			].map(k => (
				<Sprite key={k} img={slotEmpty} />
			))}
			{[...Array(overflow).keys()].map(k => (
				<Sprite key={k} img={slotOverflow} />
			))}
			{[...Array(locked).keys()].map(k => (
				<Sprite key={k} img={slotLocked} />
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
		</SpriteBox>
	);
};

export default BadgeSlots;
