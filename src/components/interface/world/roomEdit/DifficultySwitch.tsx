import { IconButton, Tooltip } from '@mui/material';
import { useField } from 'react-final-form';

import Sprite from 'components/Sprite';
import difficultyEasy from 'assets/world/icons/difficultyEasy.png';
import difficultyNormal from 'assets/world/icons/difficultyNormal.png';
import difficultyHard from 'assets/world/icons/difficultyHard.png';

import { useMapContext } from '../MapProvider';

const DifficultySprites = [difficultyEasy, difficultyNormal, difficultyHard];

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
			<IconButton
				onClick={() => onChange({ target: { value: toggleDifficulty(value) } })}
			>
				<Sprite img={DifficultySprites[value]} />
			</IconButton>
		</Tooltip>
	);
};

export default DifficultySwitch;
