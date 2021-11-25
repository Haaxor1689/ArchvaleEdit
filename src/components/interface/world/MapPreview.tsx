import { Box } from '@mui/material';
import Scrollbars from 'react-custom-scrollbars';

import { useMapContext } from './MapProvider';
import MapRoom from './MapRoom';

const MapPreview = () => {
	const { rooms } = useMapContext();
	return (
		<Scrollbars
			style={{ height: '100%', flexGrow: 1 }}
			renderView={p => <Box {...p} display="flex" />}
		>
			<Box
				sx={{
					display: 'grid',
					gridAutoColumns: t => t.spacing(7),
					gridAutoRows: t => t.spacing(7),
					m: 'auto',
					p: 4
				}}
			>
				{rooms.map(r => (
					<MapRoom key={r.room_id} {...r} />
				))}
			</Box>
		</Scrollbars>
	);
};

export default MapPreview;
