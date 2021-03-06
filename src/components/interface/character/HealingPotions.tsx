import { Box, IconButton, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import { useField } from 'react-final-form';

import Sprite from 'components/Sprite';
import portion from 'assets/character/potion.png';
import { StrokeTextShadow } from 'utils';
import OverflowAsterisk from 'components/OverflowAsterisk';

const PotionsMax = 10;

const HealingPotions = () => {
	const {
		input: { value, onChange }
	} = useField<number>('healcap', { subscription: { value: true } });

	const onClick: MouseEventHandler = e => {
		e.button === 2 && e.preventDefault();
		onChange({
			target: {
				value: Math.max(0, value + (e.button === 2 ? -1 : 1))
			}
		});
	};

	return (
		<Box
			sx={{
				'position': 'relative',
				'display': 'flex',
				'alignItems': 'center',
				'gap': 2,
				'pt': 2,
				':focus-within .MuiTypography-body2': {
					color: 'primary.main'
				}
			}}
		>
			<IconButton
				onClick={onClick}
				onContextMenu={onClick}
				sx={{
					display: 'flex',
					justifyContent: 'flex-start',
					gap: 0.5,
					p: 1
				}}
			>
				{[...Array(Math.max(PotionsMax)).keys()].map(i => (
					<Sprite
						key={i}
						img={portion}
						size={0.5}
						sx={
							i + 1 > value
								? { opacity: 0.1, filter: 'saturate(0.1)' }
								: undefined
						}
					/>
				))}
			</IconButton>

			<Typography ml={2.5} sx={{ textShadow: StrokeTextShadow }}>
				{value}
				<OverflowAsterisk overflow={value > PotionsMax} />
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
				Potions
			</Typography>
		</Box>
	);
};

export default HealingPotions;
