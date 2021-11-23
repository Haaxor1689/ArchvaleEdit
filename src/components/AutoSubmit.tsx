import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm, useFormState } from 'react-final-form';

const AutoSubmit = () => {
	const { submit } = useForm();
	const { pristine, values, errors, submitErrors, submitFailed } = useFormState(
		{
			subscription: {
				pristine: true,
				values: true,
				errors: true,
				submitErrors: true,
				submitFailed: true
			}
		}
	);
	useEffect(() => {
		!pristine && submit();
	}, [values]);
	return !errors?.file && submitErrors?.file && submitFailed ? (
		<Typography mt={-9} color="error.main" variant="caption">
			{submitErrors.file}
		</Typography>
	) : null;
};

export default AutoSubmit;
