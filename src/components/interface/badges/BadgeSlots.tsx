import { keyframes } from '@emotion/react';
import { Box } from '@mui/material';

import slotAvailable from 'assets/badges/slotAvailable.png';
import slotUnavailable from 'assets/badges/slotUnavailable.png';
import slotFilled from 'assets/badges/slotFilled.png';
import slotEmpty from 'assets/badges/slotEmpty.png';
import slotOverflow from 'assets/badges/slotOverflow.png';
import slotLocked from 'assets/badges/slotLocked.png';
import slotsPanel from 'assets/badges/slotsPanel.png';

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
};

const BadgeSlots = ({ unlocked, used, hover }: Props) => {
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
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				background: `url(${slotsPanel})`,
				gap: 1,
				p: 3,
				pb: 7,
				mt: -5.5
			}}
		>
			{[...Array(filled).keys()].map(k => (
				<Box
					key={k}
					component="img"
					src={slotFilled}
					sx={{ width: '54px', height: '54px' }}
				/>
			))}
			{[...Array(negativeHover).keys()].map(k => (
				<Box
					key={k}
					component="img"
					src={slotFilled}
					sx={{
						animation: `${fade} 2s ease 0s infinite normal forwards`,
						width: '54px',
						height: '54px'
					}}
				/>
			))}
			{[...Array(positiveHover).keys()].map(k => (
				<Box
					key={k}
					component="img"
					src={overflow ? slotUnavailable : slotAvailable}
					sx={{
						animation: `${fade} 2s ease 0s infinite normal forwards`,
						width: '54px',
						height: '54px'
					}}
				/>
			))}
			{[...Array(empty).keys()].map(k => (
				<Box
					key={k}
					component="img"
					src={slotEmpty}
					sx={{ width: '54px', height: '54px' }}
				/>
			))}
			{[...Array(overflow).keys()].map(k => (
				<Box
					key={k}
					component="img"
					src={slotOverflow}
					sx={{ width: '54px', height: '54px' }}
				/>
			))}
			{[...Array(locked).keys()].map(k => (
				<Box
					key={k}
					component="img"
					src={slotLocked}
					sx={{ width: '54px', height: '54px' }}
				/>
			))}
		</Box>
	);
};

export default BadgeSlots;
