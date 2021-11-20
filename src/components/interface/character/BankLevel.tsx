import { useField } from 'react-final-form';
import { Typography } from '@mui/material';

import bankLevel from 'assets/character/bankLevel.png';
import Sprite from 'components/Sprite';
import IconInput from 'components/form/IconInput';

const BankLevel = () => {
	const {
		input: { value }
	} = useField<number>('bank_level');
	return (
		<IconInput
			id="bank_level"
			label="Bank level"
			icon={<Sprite img={bankLevel} width={42} height={33} />}
			type="number"
			hint={`Bank can store ${(value + 1) * 2000} coins.`}
			InputProps={{
				endAdornment:
					value < 7 ? undefined : (
						<Typography color="text.secondary">MAX</Typography>
					)
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
