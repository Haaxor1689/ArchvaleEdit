import { Box } from '@mui/system';
import { ValidationErrors } from 'final-form';
import { ComponentProps } from 'react';
import { Form as FinalForm } from 'react-final-form';

type Props<T extends unknown> = {
	initialValues: Partial<T>;
	onSubmit: (values: T) => Promise<ValidationErrors> | Promise<void>;
	validate?: (values: T) => ValidationErrors | Promise<ValidationErrors>;
} & Omit<ComponentProps<typeof Box>, 'onSubmit'>;

const Form = <T extends unknown>({
	initialValues,
	onSubmit,
	validate,
	children,
	...props
}: Props<T>) => (
	<FinalForm
		initialValues={initialValues}
		onSubmit={onSubmit}
		validate={validate}
		subscription={{
			active: true,
			submitting: true
		}}
		render={({ handleSubmit }) => (
			<Box
				component="form"
				display="flex"
				flexDirection="column"
				onSubmit={handleSubmit}
				{...props}
			>
				{children}
			</Box>
		)}
	/>
);

export default Form;
