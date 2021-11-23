import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { FC } from 'react';
import { useField } from 'react-final-form';
import * as Yup from 'yup';

import { makeValidate } from 'utils';

type Props = {
	id: string;
	label: string;
	helperText?: string;
	disabled?: boolean;
	required?: boolean;
	validate?: Yup.BaseSchema;
	acceptFileTypes?: string[];
};

const FileInput: FC<Props> = ({
	id,
	label,
	helperText,
	required,
	validate = required ? Yup.mixed().required() : Yup.mixed().nullable(),
	disabled,
	acceptFileTypes
}) => {
	const {
		input: { value, onChange, ...input },
		meta
	} = useField<File | null>(id, {
		validate: makeValidate(validate),
		subscription: { value: true, error: true, touched: true },
		type: 'file',
		parse: v => v
	});

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Box sx={{ display: 'flex', gap: 4, alignItems: 'baseline' }}>
				<Button variant="contained" component="label" disabled={disabled}>
					{label}
					<input
						hidden
						{...(input as never)}
						onChange={({ target }) => onChange(target.files?.[0])}
						accept={
							acceptFileTypes && acceptFileTypes.length > 1
								? acceptFileTypes.join(', ')
								: acceptFileTypes?.[0]
						}
						required={required}
					/>
				</Button>
				<Typography sx={{ color: 'text.light', opacity: 0.6 }}>
					{value ? value.name : 'No file selected'}
				</Typography>
			</Box>
			{((meta.error && meta.touched) || helperText) && (
				<FormHelperText
					error={meta.error && meta.touched}
					sx={{ mt: 1, textAlign: 'center' }}
				>
					{meta.error && meta.touched ? meta.error : helperText}
				</FormHelperText>
			)}
		</Box>
	);
};

export default FileInput;
