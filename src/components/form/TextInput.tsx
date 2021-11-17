import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { useField } from 'react-final-form';
import * as Yup from 'yup';

import makeValidate from 'utils';

type Props = {
	validate?: Yup.BaseSchema;
} & Required<Pick<TextFieldProps, 'id'>> &
	Omit<TextFieldProps, 'error' | 'size'>;

const TextInput: FC<Props> = ({
	id,
	helperText,
	disabled,
	required,
	validate = required ? Yup.string().required() : Yup.string().nullable(),
	...props
}) => {
	const isDate = props.type === 'date' || props.type === 'datetime-local';

	const { input, meta } = useField<string>(id, {
		validate: makeValidate(validate),
		subscription: { value: true, error: true, touched: true },
		type: props.type,
		parse: v => v
	});

	return (
		<TextField
			id={id}
			{...props}
			{...input}
			required={required}
			error={meta.error && meta.touched}
			helperText={meta.error && meta.touched ? meta.error : helperText}
			disabled={!!meta.submitting || disabled}
			InputLabelProps={isDate ? { shrink: true } : undefined}
		/>
	);
};

export default TextInput;
