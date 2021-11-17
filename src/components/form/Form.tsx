import { Box } from '@mui/system';
import { ComponentProps, ReactNode } from 'react';
import {
	Form as FinalForm,
	FormProps,
	FormRenderProps
} from 'react-final-form';

type Props<T extends unknown> = Pick<
	FormProps<T>,
	'initialValues' | 'onSubmit' | 'mutators' | 'decorators'
> &
	Omit<ComponentProps<typeof Box>, 'onSubmit'> & {
		render?: (p: Omit<FormRenderProps<T>, 'handleSubmit'>) => ReactNode;
	};

const Form = <T extends unknown>({
	initialValues,
	onSubmit,
	mutators,
	decorators,
	children,
	render,
	...props
}: Props<T>) => (
	<FinalForm
		initialValues={initialValues}
		onSubmit={onSubmit}
		mutators={mutators}
		decorators={decorators}
		subscription={{
			active: true,
			submitting: true
		}}
		render={({ handleSubmit, ...p }) => (
			<Box
				component="form"
				display="flex"
				flexDirection="column"
				onSubmit={handleSubmit}
				{...props}
			>
				{render?.(p) ?? children}
			</Box>
		)}
	/>
);

export default Form;
