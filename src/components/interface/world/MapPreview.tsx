import { Box } from '@mui/material';

import { useMapContext } from './MapProvider';
import MapRoom from './MapRoom';

const MapPreview = () => {
	const { rooms } = useMapContext();
	return (
		<Box
			sx={{
				flexGrow: 1,
				flexShrink: 0,
				display: 'grid',
				gridAutoColumns: t => t.spacing(7),
				gridAutoRows: t => t.spacing(7),
				justifyContent: 'center',
				overflow: 'auto'
			}}
		>
			{rooms.map(r => (
				<MapRoom key={r.room_id} {...r} />
			))}
		</Box>
	);
};

export default MapPreview;
