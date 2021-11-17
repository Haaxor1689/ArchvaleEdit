import { Box } from '@mui/material';

import emptySlot from 'assets/inventory/emptySlot.png';
import hoverSlot from 'assets/inventory/hoverSlot.png';

const EmptySlot = () => (
	<Box
		sx={{
			'height': 116,
			'width': 108,
			'background': `url(${emptySlot})`,
			'backgroundPosition': 'bottom',
			'backgroundRepeat': 'no-repeat',
			':hover': {
				background: `url(${hoverSlot})`
			}
		}}
	/>
);

export default EmptySlot;
