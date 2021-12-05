import { useMediaQuery } from '@mui/material';

const useThemeSpacing = () => {
	const lg = useMediaQuery('(max-width:1200px)');
	const xl = useMediaQuery('(max-width:1536px)');
	return lg ? 4 : xl ? 5 : 6;
};

export default useThemeSpacing;
