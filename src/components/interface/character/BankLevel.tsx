import { useField } from 'react-final-form';

import bankLevel from 'assets/character/bankLevel.png';
import Sprite from 'components/Sprite';
import IconInput from 'components/form/IconInput';
import MaxAdornment from 'components/MaxAdornment';

const BankLevel = () => {
	const {
		input: { value }
	} = useField<number>('bank_level');
	return (
		<IconInput
			id="bank_level"
			label="Bank level"
			icon={<Sprite img={bankLevel} width={7} height={6} />}
			type="number"
			hint={`Bank can store ${(value + 1) * 2000} coins.`}
			InputProps={{
				endAdornment: value < 7 ? undefined : <MaxAdornment />
			}}
			inputProps={{
				max: 7,
				min: 0,
				step: 1,
				required: true
			}}
		/>
	);
};

export default BankLevel;
