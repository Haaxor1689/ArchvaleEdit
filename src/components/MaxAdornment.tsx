import { Typography } from '@mui/material';

const MaxAdornment = () => (
	<Typography
		variant="body2"
		color="text.secondary"
		sx={{
			position: 'absolute',
			pointerEvents: 'none',
			right: 0
		}}
	>
		MAX
	</Typography>
);

export default MaxAdornment;
