import { Box, IconButton, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import { useField } from 'react-final-form';

import Sprite from 'components/Sprite';
import heart from 'assets/character/heart.png';
import halfHeart from 'assets/character/halfHeart.png';
import { StrokeTextShadow } from 'utils';
import OverflowAsterisk from 'components/OverflowAsterisk';
import { usePlayerStats } from 'components/PlayerContext';

const Health = () => {
	const {
		input: { value, onChange }
	} = useField<number>(`${usePlayerStats()}[0]`, {
		subscription: { value: true }
	});

	const hearts = Math.floor(value / 10);
	const hasHalfHeart = !!(value % 10);

	const onClick: MouseEventHandler = e => {
		e.button === 2 && e.preventDefault();
		onChange({
			target: {
				value: Math.max(5, value + (e.button === 2 ? -5 : 5))
			}
		});
	};

	const lines = Math.floor((value - 5) / 80) + 1;

	return (
		<Box
			sx={{
				'position': 'relative',
				'pt': 2,
				'display': 'flex',
				'alignItems': 'center',
				'gap': 2,
				':focus-within .MuiTypography-body2': {
					color: 'primary.main'
				}
			}}
		>
			<Box
				component={IconButton}
				onClick={onClick}
				onContextMenu={onClick}
				sx={{
					position: 'relative',
					display: 'grid',
					gridTemplateColumns: t => Array(8).fill(t.spacing(7)).join(' '),
					borderRadius: 0,
					p: 1,
					pr: 2
				}}
			>
				{[...Array(Math.min(3, lines) * 8).keys()].map(i => (
					<Box key={i} mr={-1} position="relative">
						<Sprite
							img={heart}
							width={7.5}
							height={7}
							sx={
								i > hearts - 1
									? { opacity: 0.1, filter: 'saturate(0.1)' }
									: undefined
							}
						/>
						{hasHalfHeart && i === hearts && (
							<Sprite
								position="absolute"
								top={0}
								img={halfHeart}
								width={5}
								height={7}
							/>
						)}
					</Box>
				))}
			</Box>
			<Typography sx={{ textShadow: StrokeTextShadow }}>
				{value}
				<OverflowAsterisk overflow={value > 240} />
			</Typography>
			<Typography
				variant="body2"
				color="text.secondary"
				sx={{
					position: 'absolute',
					left: 6,
					top: 0,
					transition: t => t.transitions.create('color')
				}}
			>
				Health
			</Typography>
		</Box>
	);
};

export default Health;
