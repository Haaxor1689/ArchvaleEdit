import { Box, Typography } from '@mui/material';
import { useField } from 'react-final-form';

import panel from 'assets/inventory/panel.png';
import { parseHexArray, parseHexValue } from 'utils';

import ItemSlot from './ItemSlot';
import EmptySlot from './EmptySlot';

const InventoryTab = () => {
	const {
		input: { value: inventory }
	} = useField<string>('inventory', { subscription: { value: true } });

	const inventoryItems = parseHexArray(inventory, 7, v =>
		v === 'FFFF000'
			? undefined
			: {
					id: parseHexValue(v.slice(0, 4)),
					count: parseHexValue(v.slice(4, 6)),
					quality: parseHexValue(v[6])
			  }
	);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignSelf: 'stretch',
				alignItems: 'center'
			}}
		>
			<Box
				sx={{
					'display': 'grid',
					'gridTemplateColumns': '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
					'background': `url(${panel})`,
					'backgroundRepeat': 'no-repeat',
					'gap': 1,
					'px': 5,
					'pt': 5,
					'pb': 27,
					'> *:first-child': {
						mb: 4
					}
				}}
			>
				{inventoryItems.map((item, index) =>
					item ? <ItemSlot index={index} {...item} /> : <EmptySlot />
				)}
			</Box>
			<Typography variant="caption" mt={2}>
				TODO: Inventory manipulation, item database.
			</Typography>
		</Box>
	);
};

export default InventoryTab;
