import { Box, IconButton, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import { useField } from 'react-final-form';

import Sprite from 'components/Sprite';
import dash from 'assets/character/dash.png';
import { StrokeTextShadow } from 'utils';

const DashesMax = 11;

const Dashes = () => {
	const {
		input: { value: dashes, onChange }
	} = useField<number>('player_stats[1]', { subscription: { value: true } });

	const onClick: MouseEventHandler = e => {
		e.button === 2 && e.preventDefault();
		onChange({
			target: {
				value: Math.max(0, dashes + (e.button === 2 ? -1 : 1))
			}
		});
	};

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
					display: 'flex',
					justifyContent: 'flex-start',
					borderRadius: 0,
					gap: 0.5,
					p: 1,
					pr: 2
				}}
			>
				{[...Array(DashesMax).keys()].map(i => (
					<Sprite
						key={i}
						img={dash}
						width={5.5}
						height={5.5}
						mr={-1}
						sx={{
							position: 'relative',
							...(i > dashes - 1
								? { opacity: 0.1, filter: 'saturate(0.1)' }
								: undefined)
						}}
					/>
				))}
			</Box>
			<Typography ml={1.5} sx={{ textShadow: StrokeTextShadow }}>
				{dashes}
				{dashes > DashesMax ? '*' : ''}
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
				Dashes
			</Typography>
		</Box>
	);
};

export default Dashes;
