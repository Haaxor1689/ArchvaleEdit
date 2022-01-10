import { Box } from '@mui/material';

import { Item } from 'utils/data';

import Sprite from './Sprite';

const InlineItem = (item: Item) =>
	item ? (
		<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
			<Sprite
				img={`${process.env.PUBLIC_URL}/assets/inventory/${item.sprite?.[0]}_0.png`}
				width={6}
				height={6}
				mr={2}
			/>
			{item.name ?? '???'}
		</Box>
	) : (
		<>???</>
	);

export default InlineItem;
