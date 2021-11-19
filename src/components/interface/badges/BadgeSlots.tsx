import { keyframes } from '@emotion/react';
import { Box } from '@mui/material';

import slotAvailable from 'assets/badges/slotAvailable.png';
import slotUnavailable from 'assets/badges/slotUnavailable.png';
import slotFilled from 'assets/badges/slotFilled.png';
import slotEmpty from 'assets/badges/slotEmpty.png';
import slotOverflow from 'assets/badges/slotOverflow.png';
import slotLocked from 'assets/badges/slotLocked.png';
import slotsPanel from 'assets/badges/slotsPanel.png';
import Sprite from 'components/Sprite';

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
		<Sprite
			img={slotsPanel}
			sx={{
				display: 'flex',
				alignItems: 'center',
				backgroundPositionX: 'left',
				gap: 1,
				p: 3,
				pb: 7,
				mt: -5.5
			}}
		>
			{[...Array(filled).keys()].map(k => (
				<Sprite key={k} img={slotFilled} width={54} height={54} />
			))}
			{[...Array(negativeHover).keys()].map(k => (
				<Sprite
					key={k}
					img={slotFilled}
					width={54}
					height={54}
					sx={{ animation: `${fade} 2s ease 0s infinite normal forwards` }}
				/>
			))}
			{[...Array(positiveHover).keys()].map(k => (
				<Sprite
					key={k}
					img={overflow ? slotUnavailable : slotAvailable}
					width={54}
					height={54}
					sx={{ animation: `${fade} 2s ease 0s infinite normal forwards` }}
				/>
			))}
			{[...Array(empty).keys()].map(k => (
				<Sprite key={k} img={slotEmpty} width={54} height={54} />
			))}
			{[...Array(overflow).keys()].map(k => (
				<Sprite key={k} img={slotOverflow} width={54} height={54} />
			))}
			{[...Array(locked).keys()].map(k => (
				<Sprite key={k} img={slotLocked} width={54} height={54} />
			))}
		</Sprite>
	);
};

export default BadgeSlots;
