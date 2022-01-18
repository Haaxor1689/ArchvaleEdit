import { IconButton, Tooltip } from '@mui/material';
import { useField } from 'react-final-form';

import Sprite from 'components/Sprite';
import questionMark from 'assets/world/icons/questionMark.png';
import checkMark from 'assets/world/icons/checkMark.png';

import { useMapContext } from '../MapProvider';

const ObjectiveCompleteSwitch = () => {
	const { selected } = useMapContext();

	const {
		input: { value, onChange }
	} = useField<number>(`world.rooms[${selected}].objective_complete`, {
		subscription: { value: true }
	});

	return (
		<Tooltip
			title={value === 0 ? 'Objective not complete' : 'Objective complete'}
		>
			<IconButton
				onClick={() => onChange({ target: { value: value === 0 ? 1 : 0 } })}
			>
				<Sprite img={value === 0 ? questionMark : checkMark} />
			</IconButton>
		</Tooltip>
	);
};

export default ObjectiveCompleteSwitch;
