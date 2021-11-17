import { Box, TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, FC, useCallback, useMemo } from 'react';
import { useField } from 'react-final-form';
import * as Yup from 'yup';

import { makeValidate } from 'utils';

type Props = {
	validate?: Yup.BaseSchema;
} & Required<Pick<TextFieldProps, 'id'>> &
	Omit<TextFieldProps, 'error' | 'variant' | 'size'>;

// TODO: Validate that both or neither from and to inputs have value
const RangeInput: FC<Props> = ({
	id,
	label,
	helperText,
	disabled,
	required,
	validate = required ? Yup.string().required() : Yup.string().nullable(),
	...props
}) => {
	const {
		input: { value, onChange, ...input },
		meta
	} = useField<string>(id, {
		validate: makeValidate(validate),
		subscription: { value: true, error: true, touched: true },
		type: props.type,
		parse: v => v
	});

	const from = useMemo(() => value.split(';;')?.[0] ?? '', [value]);
	const to = useMemo(() => value.split(';;')?.[1] ?? '', [value]);
	const changeFrom = useCallback(
		({
			target: { value: val }
		}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			onChange({
				target: { value: !val && !to ? '' : `${val};;${to}` }
			}),
		[value]
	);
	const changeTo = useCallback(
		({
			target: { value: val }
		}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			onChange({
				target: { value: !val && !from ? '' : `${from};;${val}` }
			}),
		[value]
	);

	return (
		<Box sx={{ display: 'flex', gap: 2 }}>
			<TextField
				id={`${id}.from`}
				{...props}
				{...input}
				label={`${label} from`}
				value={from}
				onChange={changeFrom}
				required={required}
				error={meta.error && meta.touched}
				helperText={meta.error && meta.touched ? meta.error : helperText}
				disabled={!!meta.submitting || disabled}
				InputLabelProps={
					props.type === 'date' || props.type === 'datetime-local'
						? { shrink: true }
						: undefined
				}
			/>
			<TextField
				id={`${id}.to`}
				{...props}
				{...input}
				label={`${label} to`}
				value={to}
				onChange={changeTo}
				required={required}
				error={meta.error && meta.touched}
				disabled={!!meta.submitting || disabled}
				InputLabelProps={
					props.type === 'date' || props.type === 'datetime-local'
						? { shrink: true }
						: undefined
				}
			/>
		</Box>
	);
};

export default RangeInput;
