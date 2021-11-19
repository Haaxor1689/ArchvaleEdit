import { useField } from 'react-final-form';
import { useEffect } from 'react';

import potionLevel from 'assets/character/potionLevel.png';
import Sprite from 'components/Sprite';
import IconInput from 'components/form/IconInput';

const HealingLevel = () => {
	const {
		input: { value }
	} = useField('healing_level');

	const {
		input: { value: state, onChange }
	} = useField('npst.n12');

	// Make sure player can talk to chef if potion level isn't maxed out
	useEffect(() => {
		if (value >= 6 || !state) return;
		onChange({ target: { value: 1 } });
	}, [value]);

	return (
		<IconInput
			id="healing_level"
			label="Potion level"
			icon={<Sprite img={potionLevel} width={42} height={42} />}
			type="number"
			hint={`Potions will heal you for ${(2 + value * 0.5).toFixed(1)} hearts.`}
			inputProps={{
				max: 6,
				min: 0,
				step: 1,
				required: true
			}}
		/>
	);
};

export default HealingLevel;
