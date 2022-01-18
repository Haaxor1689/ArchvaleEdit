import { Box } from '@mui/material';

import keyBoss from 'assets/world/keyBoss.png';
import keySilver from 'assets/world/keySilver.png';

import Keys from './Keys';
import { useMapContext } from './MapProvider';

const MapInfo = () => {
	const { dungeon } = useMapContext();

	if (!dungeon) return null;

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: -2 }}>
			<Keys id="keys" label="Boss keys" sprite={keyBoss} max={6} />
			<Keys id="keys_silver" label="Silver keys" sprite={keySilver} max={7} />
		</Box>
	);
};

export default MapInfo;
