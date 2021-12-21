import { Box, Typography } from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars';

import panel from 'assets/world/panel.png';
import Sprite from 'components/Sprite';
import useShowUnused from 'utils/useShowUnused';
import { WorldStateMeta } from 'utils/data';

import WorldState from '../world/roomEdit/WorldState';

import FlagSelect from './FlagSelect';

const ProgressionTab = () => {
	const [showUnused] = useShowUnused();
	const filteredWorldState = WorldStateMeta.filter(
		f => !!showUnused || !f.name.match(/^UNUSED /)
	);
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignSelf: 'stretch',
				alignItems: 'center',
				gap: 2
			}}
		>
			<Sprite
				img={panel}
				width={225}
				height={150}
				sx={{ position: 'relative', display: 'flex', gap: 2, p: 6 }}
			>
				<Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2
						}}
					>
						<WorldState
							stateMetaItems={filteredWorldState}
							initialExpanded
							columns={6}
						/>
						<FlagSelect />
					</Box>
				</Scrollbars>
			</Sprite>
			<Typography variant="caption" textAlign="center">
				Player icon marks your current spawn point. Hold shift for horizontal
				scrolling.
			</Typography>
		</Box>
	);
};

export default ProgressionTab;
