import { useField } from 'react-final-form';

// TODO: Add correct version name
export const ExperimentalVersionName = 'EXP';

const useIsExperimental = () => {
	const {
		input: { value }
	} = useField<string>('version', { subscription: {} });
	return value === ExperimentalVersionName;
};

export default useIsExperimental;
