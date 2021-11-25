import { Box, IconButton, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import { useField } from 'react-final-form';

import Sprite from 'components/Sprite';
import { StrokeTextShadow } from 'utils';
import OverflowAsterisk from 'components/Overflowsterisk';

import { useMapContext } from './MapProvider';

type Props = {
	id: string;
	label: string;
	sprite: [string, number, number];
	max: number;
};

const Keys = ({ id, label, sprite, max }: Props) => {
	const { dungeonIndex } = useMapContext();

	const {
		input: { value, onChange }
	} = useField<number>(`dungeon_data[${dungeonIndex}].${id}`, {
		subscription: { value: true }
	});

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
			<Box
				component={IconButton}
				onClick={onClick}
				onContextMenu={onClick}
				sx={{
					display: 'flex',
					justifyContent: 'flex-start',
					borderRadius: 0,
					gap: 0.5,
					p: 1
				}}
			>
				{[...Array(Math.max(max)).keys()].map(i => (
					<Sprite
						key={i}
						img={sprite[0]}
						width={sprite[1]}
						height={sprite[2]}
						sx={
							i + 1 > value
								? { opacity: 0.1, filter: 'saturate(0.1)' }
								: undefined
						}
					/>
				))}
			</Box>

			<Typography ml={2.5} sx={{ textShadow: StrokeTextShadow }}>
				{value}
				<OverflowAsterisk overflow={value > max} />
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
				{label}
			</Typography>
		</Box>
	);
};

export default Keys;
