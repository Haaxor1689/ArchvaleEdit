import { Box, Typography } from '@mui/material';

import panel from 'assets/world/panel.png';
import Sprite from 'components/Sprite';

import MapProvider from './MapProvider';
import MapPreview from './MapPreview';
import MapSelect from './MapSelect';
import RoomInfo from './RoomInfo';

const WorldTab = () => (
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
			width={161}
			height={131}
			sx={{
				display: 'flex',
				gap: 2,
				p: 6
			}}
		>
			<MapProvider>
				<MapPreview />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '33%',
						gap: 6
					}}
				>
					<MapSelect />
					<RoomInfo />
				</Box>
			</MapProvider>
		</Sprite>
		<Typography variant="caption" textAlign="center">
			Player icon marks your current spawn point.
		</Typography>
	</Box>
);

export default WorldTab;
