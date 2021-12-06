import { useMediaQuery } from '@mui/material';

const useThemeSpacing = () => {
	const lg = useMediaQuery('(max-width:1366px)');
	const xl = useMediaQuery('(max-width:1920px)');
	return lg ? 4 : xl ? 5 : 6;
};

export default useThemeSpacing;
