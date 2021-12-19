import { Typography } from '@mui/material';

type Props = {
	overflow?: boolean;
};

const OverflowAsterisk = ({ overflow }: Props) =>
	overflow ? (
		<Typography variant="caption" sx={{ verticalAlign: 'super' }}>
			*
		</Typography>
	) : null;

export default OverflowAsterisk;
