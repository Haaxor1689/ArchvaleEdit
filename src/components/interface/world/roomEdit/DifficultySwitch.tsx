import { Box, IconButton, Tooltip } from '@mui/material';
import { useField } from 'react-final-form';

import Sprite from 'components/Sprite';
import difficultyEasy from 'assets/world/icons/difficultyEasy.png';
import difficultyNormal from 'assets/world/icons/difficultyNormal.png';
import difficultyHard from 'assets/world/icons/difficultyHard.png';

import { useMapContext } from '../MapProvider';

const DifficultySprites = [
	{
		img: difficultyEasy,
		width: 10,
		height: 8
	},
	{
		img: difficultyNormal,
		width: 12,
		height: 9
	},
	{
		img: difficultyHard,
		width: 12,
		height: 11
	}
];

const MaxHeight = Math.max(...DifficultySprites.map(s => s.height));

const toggleDifficulty = (diff: number) => {
	switch (diff) {
		case 0:
			return 1;
		case 1:
			return 2;
		default:
			return 0;
	}
};

const DifficultySwitch = () => {
	const { selected } = useMapContext();

	const {
		input: { value, onChange }
	} = useField<number>(`world.rooms[${selected}].difficulty`, {
		subscription: { value: true }
	});

	return (
		<Tooltip title={`Difficulty: ${['Easy', 'Normal', 'Hard'][value]}`}>
			<Box>
				<Sprite
					component={IconButton}
					{...DifficultySprites[value]}
					height={MaxHeight}
					onClick={() =>
						onChange({ target: { value: toggleDifficulty(value) } })
					}
					sx={{ borderRadius: 0 }}
				/>
			</Box>
		</Tooltip>
	);
};

export default DifficultySwitch;
