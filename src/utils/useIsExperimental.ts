import { useField } from 'react-final-form';

export const ExperimentalVersionName = '.pr.';

const useIsExperimental = () => {
	const {
		input: { value }
	} = useField<string>('version', { subscription: {} });
	return value.match(ExperimentalVersionName);
};

export default useIsExperimental;
