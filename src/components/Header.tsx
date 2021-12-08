import {
	Paper,
	Typography,
	Button,
	FormControlLabel,
	Checkbox
} from '@mui/material';

import useShowUnused from 'utils/useShowUnused';

type Props = {
	name: string;
	reset: () => void;
};

const Header = ({ name, reset }: Props) => {
	const [showUnused, setShowUnused] = useShowUnused();

	return (
		<Paper
			sx={{
				position: 'sticky',
				top: 0,
				display: 'flex',
				alignItems: 'center',
				alignSelf: 'stretch',
				zIndex: 3,
				gap: 3,
				p: 3
			}}
		>
			<Typography flexGrow={1}>{name}</Typography>
			<FormControlLabel
				control={
					<Checkbox
						checked={showUnused}
						onChange={e => setShowUnused(e.target.checked)}
					/>
				}
				label="Show UNUSED?"
			/>
			<Button onClick={reset}>Discard</Button>
			<Button type="submit" variant="contained" size="large">
				Save
			</Button>
		</Paper>
	);
};

export default Header;
