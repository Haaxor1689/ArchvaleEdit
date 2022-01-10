import {
	Paper,
	Typography,
	Button,
	FormControlLabel,
	Checkbox,
	Tooltip
} from '@mui/material';

import useShowUnused from 'utils/useShowUnused';

import RawFormEdit from './interface/RawFormEdit';

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
			<RawFormEdit />
			<Tooltip title="When checked, game content that is not encountered through normal play will also be shown in the editor.">
				<FormControlLabel
					control={
						<Checkbox
							checked={showUnused}
							onChange={e => setShowUnused(e.target.checked)}
						/>
					}
					label="Show UNUSED?"
				/>
			</Tooltip>
			<Button onClick={reset}>Discard</Button>
			<Button type="submit" variant="contained" size="large">
				Save
			</Button>
		</Paper>
	);
};

export default Header;
