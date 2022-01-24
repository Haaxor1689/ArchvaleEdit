import { useEffect } from 'react';
import { useForm, useFormState } from 'react-final-form';

const AutoSubmit = () => {
	const { submit } = useForm();
	const { pristine, values } = useFormState({
		subscription: {
			pristine: true,
			values: true
		}
	});
	useEffect(() => {
		!pristine && submit();
	}, [values]);
	return null;
};

export default AutoSubmit;
