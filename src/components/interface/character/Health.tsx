import { Box, IconButton, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import { useField } from 'react-final-form';

import Sprite from 'components/Sprite';
import heart from 'assets/character/heart.png';
import halfHeart from 'assets/character/halfHeart.png';
import { StrokeTextShadow } from 'utils';

const Health = () => {
	const {
		input: { value, onChange }
	} = useField<number>('player_stats[0]', { subscription: { value: true } });

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
					gridTemplateColumns: '42px 42px 42px 42px 42px 42px 42px 42px',
					borderRadius: 0
				}}
			>
				{[...Array(Math.min(3, lines) * 8).keys()].map(i => (
					<Box key={i} mr={-1} position="relative">
						<Sprite
							img={heart}
							width={45}
							height={42}
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
								width={30}
								height={42}
							/>
						)}
					</Box>
				))}
			</Box>
			<Typography sx={{ textShadow: StrokeTextShadow }}>
				{value}
				{value > 240 ? '+' : ''}
			</Typography>
			<Typography
				variant="body2"
				color="text.secondary"
				sx={{
					position: 'absolute',
					left: 6,
					top: 0,
					transition:
						'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
				}}
			>
				Health
			</Typography>
		</Box>
	);
};

export default Health;
