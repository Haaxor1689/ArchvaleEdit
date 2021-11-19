import { Box, Typography } from '@mui/material';

import panel from 'assets/character/panel.png';
import Sprite from 'components/Sprite';

const CharacterTab = () => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			alignSelf: 'stretch',
			alignItems: 'center'
		}}
	>
		<Sprite
			img={panel}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: 966,
				height: 696,
				gap: 1,
				p: 6
			}}
		>
			<Typography variant="h2">Character</Typography>
			<Typography>*WiP*</Typography>
		</Sprite>
	</Box>
);

export default CharacterTab;
