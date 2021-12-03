import { Box } from '@mui/material';
import { createRef, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { useMapContext } from './MapProvider';
import MapRoom from './MapRoom';

const MapPreview = () => {
	const { rooms } = useMapContext();
	const ref = createRef<Scrollbars>();
	useEffect(() => {
		if (!ref.current) return;
		const v = ref.current.getValues();
		ref.current.scrollLeft((v.scrollWidth - v.clientWidth) / 2);
		ref.current.scrollTop((v.scrollHeight - v.clientHeight) / 2);
	}, [rooms]);
	return (
		<Scrollbars
			ref={ref}
			style={{ height: '100%', flexGrow: 1 }}
			renderView={p => (
				<Box {...p} display="flex" backgroundColor="rgba(0,0,0,0.5)" />
			)}
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
					<MapRoom key={r.room_id} variant="map" {...r} />
				))}
			</Box>
		</Scrollbars>
	);
};

export default MapPreview;
