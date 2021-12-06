import {
	Box,
	Button,
	ButtonGroup,
	IconButton,
	ThemeProvider
} from '@mui/material';
import { ZoomOut, ZoomIn } from '@mui/icons-material';
import { createRef, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import theme from 'utils/theme';
import useThemeSpacing from 'utils/useThemeSpacing';

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
	}, []);

	const spacing = useThemeSpacing();
	const [zoom, setZoom] = useState(spacing - 3);

	return (
		<Box sx={{ position: 'relative', height: '100%', flexGrow: 1 }}>
			<ButtonGroup
				sx={{
					position: 'absolute',
					bottom: t => t.spacing(3),
					right: t => t.spacing(3)
				}}
			>
				<Button
					variant="contained"
					sx={{ zIndex: 5 }}
					size="small"
					onClick={() => setZoom(z => Math.max(1, z - 1))}
				>
					<ZoomOut />
				</Button>
				<Button
					variant="contained"
					sx={{ zIndex: 5 }}
					size="small"
					onClick={() => setZoom(z => Math.min(spacing, z + 1))}
				>
					<ZoomIn />
				</Button>
			</ButtonGroup>
			<ThemeProvider theme={theme(zoom)}>
				<Scrollbars
					ref={ref}
					style={{ width: '100%', height: '100%' }}
					renderView={p => (
						<Box {...p} display="flex" backgroundColor="rgba(0,0,0,0.5)" />
					)}
				>
					<Box
						sx={{
							display: 'grid',
							gridAutoColumns: t => t.spacing(14),
							gridAutoRows: t => t.spacing(14),
							m: 'auto',
							p: 4
						}}
					>
						{rooms?.map(r => (
							<MapRoom key={r.room_id} variant="map" {...r} />
						))}
					</Box>
				</Scrollbars>
			</ThemeProvider>
		</Box>
	);
};

export default MapPreview;
