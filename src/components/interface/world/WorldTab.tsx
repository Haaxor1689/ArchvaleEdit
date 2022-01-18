import { Box, Typography } from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars';

import panel from 'assets/world/panel.png';
import { SpriteBox } from 'components/Sprite';

import MapProvider from './MapProvider';
import MapPreview from './MapPreview';
import MapSelect from './MapSelect';
import RoomInfo from './RoomInfo';
import MapInfo from './MapInfo';

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
		<SpriteBox
			img={panel}
			width={225}
			height={150}
			sx={{ position: 'relative', display: 'flex', gap: 2, p: 6 }}
		>
			<MapProvider>
				<MapPreview />
				<Scrollbars
					autoHide
					style={{ width: '33%', height: '100%', flexShrink: 0 }}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 6
						}}
					>
						<MapSelect />
						<MapInfo />
						<RoomInfo />
					</Box>
				</Scrollbars>
			</MapProvider>
		</SpriteBox>
		<Typography variant="caption" textAlign="center">
			Player icon marks your current spawn point. Hold shift for horizontal
			scrolling.
		</Typography>
	</Box>
);

export default WorldTab;
