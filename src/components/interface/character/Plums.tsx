import { useField } from 'react-final-form';

import plum from 'assets/character/plum.png';
import Sprite from 'components/Sprite';
import IconInput from 'components/form/IconInput';

const Plums = () => {
	const {
		input: { value: level }
	} = useField('healing_level');

	const {
		input: { value: plums }
	} = useField('plums_banked');

	const maxLvl = level >= 6;
	const missing = Math.min(5, Math.max(0, level + 1 - plums));

	return (
		<IconInput
			id="plums_banked"
			label="Plums banked"
			icon={<Sprite img={plum} width={42} height={39} />}
			type="number"
			hint={
				maxLvl
					? 'You have reached max potion level.'
					: `Trigger upgrade by bringing ${missing} more plum${
							missing === 1 ? '' : 's'
					  }.`
			}
			inputProps={{
				min: 0,
				max: maxLvl ? 0 : level,
				step: 1,
				required: true
			}}
		/>
	);
};

export default Plums;
