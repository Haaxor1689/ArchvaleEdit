import { useField } from 'react-final-form';

import bankLevel from 'assets/character/bankLevel.png';
import Sprite from 'components/Sprite';
import IconInput from 'components/form/IconInput';
import MaxAdornment from 'components/MaxAdornment';

const BankCapacity = [0, 500, 800, 1200, 2000, 3000, 5000, 7000, 10000];
const MaxLevel = BankCapacity.length - 1;

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
			hint={`Bank can store ${BankCapacity[value]} coins.`}
			InputProps={{
				endAdornment: value < MaxLevel ? undefined : <MaxAdornment />
			}}
			inputProps={{
				max: MaxLevel,
				min: 0,
				step: 1,
				required: true
			}}
		/>
	);
};

export default BankLevel;
