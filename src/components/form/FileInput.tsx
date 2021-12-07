import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { FC } from 'react';
import { useField } from 'react-final-form';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';

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
		input: { value, onChange },
		meta
	} = useField<File | null>(id, {
		validate: makeValidate(validate),
		subscription: { value: true, error: true, touched: true },
		type: 'file',
		parse: v => v
	});

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: files => onChange(files?.[0]),
		maxFiles: 1
	});

	return (
		<Box
			{...getRootProps({ onClick: e => e.stopPropagation() })}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				border: t => `${t.spacing(1)} dashed ${t.palette.primary.main}99`,
				p: 4
			}}
		>
			<Box sx={{ display: 'flex', gap: 4, alignItems: 'baseline' }}>
				<Button
					variant="contained"
					component="label"
					htmlFor={id}
					disabled={disabled}
				>
					{label}
					<input
						id={id}
						{...getInputProps()}
						accept={
							acceptFileTypes && acceptFileTypes.length > 1
								? acceptFileTypes.join(', ')
								: acceptFileTypes?.[0]
						}
						required={required}
					/>
				</Button>
				<Typography sx={{ color: 'text.light', opacity: 0.6 }}>
					{isDragActive
						? 'Drop files here to upload'
						: value
						? value.name
						: 'No file selected'}
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
