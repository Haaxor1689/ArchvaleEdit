import { useField } from 'react-final-form';
import { useEffect } from 'react';

import potionLevel from 'assets/character/potionLevel.png';
import Sprite from 'components/Sprite';
import IconInput from 'components/form/IconInput';
import MaxAdornment from 'components/MaxAdornment';

const HealingAmount = [15, 20, 25, 30, 35, 40, 50];

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
			icon={<Sprite img={potionLevel} width={7} height={6} />}
			type="number"
			hint={`Potions will heal you for ${HealingAmount[value]} health.`}
			InputProps={{
				endAdornment: value < 6 ? undefined : <MaxAdornment />
			}}
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
