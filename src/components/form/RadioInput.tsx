import {
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Radio,
	RadioGroup,
	RadioGroupProps
} from '@mui/material';
import { useField } from 'react-final-form';
import * as Yup from 'yup';

import makeValidate from 'utils';

type OptionProps<T extends unknown> = {
	id: string;
	option: T;
};

const RadioOption = <T extends unknown>({ id, option }: OptionProps<T>) => {
	const { input } = useField<T>(id, {
		subscription: { value: true },
		type: 'radio',
		value: option,
		parse: v => v
	});
	return (
		<Radio
			{...input}
			onChange={() => input.onChange({ target: { value: option } })}
		/>
	);
};

type Props<T extends unknown> = {
	id: string;
	validate: Yup.BaseSchema;
	error?: string;
	disabled?: boolean;
	label?: string;
	helperText?: string;
	options: T[];
	labelFromOption?: (o: T) => string;
	keyFromOption?: (o: T) => string;
} & RadioGroupProps;

const RadioInput = <T extends unknown>({
	id,
	helperText,
	error,
	label,
	disabled,
	validate,
	options,
	labelFromOption = o => o as string,
	keyFromOption = o => o as string,
	...props
}: Props<T>) => {
	const { meta } = useField<T>(id, {
		validate: makeValidate(validate),
		subscription: { value: true, error: true, touched: true },
		type: 'radio',
		parse: v => v
	});

	return (
		<FormControl
			error={(meta.error && meta.touched) || error}
			component="fieldset"
		>
			{label && (
				<FormLabel component="legend" htmlFor={id}>
					{label}
				</FormLabel>
			)}
			<RadioGroup aria-label={label} {...props}>
				{options.map(o => (
					<FormControlLabel
						key={keyFromOption(o)}
						label={labelFromOption(o)}
						disabled={disabled}
						control={<RadioOption id={id} option={o} />}
					/>
				))}
			</RadioGroup>
			{((meta.error && meta.touched) || error || helperText) && (
				<FormHelperText>
					{meta.error && meta.touched ? meta.error : error ? error : helperText}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default RadioInput;
