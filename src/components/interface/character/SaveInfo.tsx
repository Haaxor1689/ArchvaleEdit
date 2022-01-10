import { Box, Button, Typography } from '@mui/material';
import { useField } from 'react-final-form';

import { MultiplayerToggle } from 'components/PlayerContext';
import { secondsToPlaytime, StrokeTextShadow } from 'utils';
import useShowUnused from 'utils/useShowUnused';

const DifficultyLabels = ['Easy', 'Normal', 'Hard'];

const SaveInfo = () => {
	const {
		input: { value, onChange }
	} = useField<number>('difficulty', { subscription: { value: true } });

	const {
		input: { value: playtime }
	} = useField<number>('playtime');

	const {
		input: { value: time }
	} = useField<number>('time');

	const {
		input: { value: version }
	} = useField<string>('version');

	const {
		input: { value: itemsCrafted }
	} = useField<string>('npst.n90001');

	const {
		input: { value: enemiesKilled }
	} = useField<string>('npst.n90002');

	const {
		input: { value: treasuresSold }
	} = useField<string>('npst.n90003');

	const {
		input: { value: fountainsCleansed }
	} = useField<string>('npst.n90004');

	const [showUnused] = useShowUnused();

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
				gap: 1,
				p: 2
			}}
		>
			<Typography variant="h3" sx={{ textShadow: StrokeTextShadow }}>
				Difficulty:
			</Typography>
			<Box sx={{ display: 'flex', gap: 2 }}>
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
			</Box>

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

			{showUnused && (
				<>
					<Typography variant="h3" mt={3} sx={{ textShadow: StrokeTextShadow }}>
						In-game time:
					</Typography>
					<Typography variant="body2" sx={{ textShadow: StrokeTextShadow }}>
						{time}
					</Typography>
				</>
			)}

			<Typography variant="h3" mt={3} sx={{ textShadow: StrokeTextShadow }}>
				Version:
			</Typography>
			<Typography variant="body2" sx={{ textShadow: StrokeTextShadow }}>
				{version}
			</Typography>

			<Typography variant="h3" mt={3} sx={{ textShadow: StrokeTextShadow }}>
				Statistics:
			</Typography>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: 'auto auto',
					gap: 1,
					columnGap: 3,
					alignItems: 'baseline',
					textShadow: StrokeTextShadow
				}}
			>
				<Typography variant="body2" justifySelf="flex-end">
					Items crafted:
				</Typography>
				<Typography variant="body2">{itemsCrafted || 0}</Typography>
				<Typography variant="body2" justifySelf="flex-end">
					Enemies killed:
				</Typography>
				<Typography variant="body2">{enemiesKilled || 0}</Typography>
				<Typography variant="body2" justifySelf="flex-end">
					Treasures sold:
				</Typography>
				<Typography variant="body2">{treasuresSold || 0}</Typography>
				<Typography variant="body2" justifySelf="flex-end">
					Fountains cleansed:
				</Typography>
				<Typography variant="body2">{fountainsCleansed || 0}</Typography>
			</Box>
		</Box>
	);
};

export default SaveInfo;
