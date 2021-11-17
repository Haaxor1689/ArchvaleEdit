import {
	FormControl,
	FormControlLabel,
	FormHelperText,
	Switch,
	SwitchProps
} from '@mui/material';
import { FC } from 'react';
import { useField } from 'react-final-form';
import * as Yup from 'yup';

import makeValidate from 'utils';

type Props = {
	id: string;
	validate?: Yup.BaseSchema;
	error?: string;
	label?: string;
	helperText?: string;
} & Omit<SwitchProps, 'checked' | 'onChange' | 'required'>;

const SwitchInput: FC<Props> = ({
	id,
	helperText,
	error,
	disabled,
	validate = Yup.boolean().nullable(),
	...props
}) => {
	const { input, meta } = useField<boolean>(id, {
		validate: makeValidate(validate),
		subscription: { value: true, error: true, touched: true },
		type: 'checkbox',
		parse: v => v
	});

	return (
		<FormControl error={(meta.error && meta.touched) || error}>
			<FormControlLabel
				{...input}
				control={
					<Switch
						id={id}
						{...props}
						type="checkbox"
						disabled={!!meta.submitting || disabled}
					/>
				}
				label={props.label}
				labelPlacement="end"
			/>
			{((meta.error && meta.touched) || error || helperText) && (
				<FormHelperText>
					{meta.error && meta.touched ? meta.error : error ? error : helperText}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default SwitchInput;
