import { Box, Button, Typography } from '@mui/material';
import { useField } from 'react-final-form';

import { MultiplayerToggle } from 'components/PlayerContext';
import { secondsToPlaytime, StrokeTextShadow } from 'utils';

const DifficultyLabels = ['Easy', 'Normal', 'Hard'];

const SaveInfo = () => {
	const {
		input: { value, onChange }
	} = useField<number>('difficulty', { subscription: { value: true } });

	const {
		input: { value: playtime }
	} = useField<number>('playtime');

	const {
		input: { value: version }
	} = useField<string>('version');

	return (
		<Box
			sx={{
				position: 'absolute',
				top: t => t.spacing(6),
				right: 0,
				transform: 'translateX(100%)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				width: t => t.spacing(30),
				gap: 1,
				p: 2
			}}
		>
			<Typography variant="h3" sx={{ textShadow: StrokeTextShadow }}>
				Difficulty:
			</Typography>
			{[0, 1, 2].map(d => (
				<Button
					key={d}
					variant={d === value ? 'outlined' : 'text'}
					size="small"
					onClick={() => onChange({ target: { value: d } })}
					sx={{
						textShadow: StrokeTextShadow,
						color: d === value ? 'primary.main' : 'text.primary'
					}}
				>
					{DifficultyLabels[d]}
				</Button>
			))}

			<Typography variant="h3" mt={3} sx={{ textShadow: StrokeTextShadow }}>
				Multiplayer:
			</Typography>
			<MultiplayerToggle />

			<Typography variant="h3" mt={3} sx={{ textShadow: StrokeTextShadow }}>
				Playtime:
			</Typography>
			<Typography variant="body2" sx={{ textShadow: StrokeTextShadow }}>
				{secondsToPlaytime(playtime)}
			</Typography>

			<Typography variant="h3" mt={3} sx={{ textShadow: StrokeTextShadow }}>
				Version:
			</Typography>
			<Typography variant="body2" sx={{ textShadow: StrokeTextShadow }}>
				{version}
			</Typography>
		</Box>
	);
};

export default SaveInfo;
