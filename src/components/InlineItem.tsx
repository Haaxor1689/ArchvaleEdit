import { Box } from '@mui/material';

import { getAsset } from 'utils';
import { Item } from 'utils/data';

import Sprite from './Sprite';

const InlineItem = (item: Item) =>
	item ? (
		<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
			<Sprite
				img={getAsset('inventory', item.sprite)}
				width={7}
				sx={{ mr: 2 }}
			/>
			{item.name ?? '???'}
		</Box>
	) : (
		<>???</>
	);

export default InlineItem;
