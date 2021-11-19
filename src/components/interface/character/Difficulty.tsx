import { Box, Button, Typography } from '@mui/material';
import { useField } from 'react-final-form';

import { secondsToPlaytime, StrokeTextShadow } from 'utils';

const DifficultyLabels = ['Easy', 'Normal', 'Hard'];

const Difficulty = () => {
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
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				mt: 4,
				gap: 1,
				p: 2
			}}
		>
			<Typography variant="h6" sx={{ textShadow: StrokeTextShadow }}>
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
			<Typography variant="h6" mt={3} sx={{ textShadow: StrokeTextShadow }}>
				Playtime:
			</Typography>
			<Typography variant="body2" sx={{ textShadow: StrokeTextShadow }}>
				{secondsToPlaytime(playtime)}
			</Typography>
			<Typography variant="h6" mt={3} sx={{ textShadow: StrokeTextShadow }}>
				Version:
			</Typography>
			<Typography variant="body2" sx={{ textShadow: StrokeTextShadow }}>
				{version}
			</Typography>
		</Box>
	);
};

export default Difficulty;
