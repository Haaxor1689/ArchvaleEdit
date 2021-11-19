import { Box } from '@mui/material';
import { MouseEvent } from 'react';

import { Items } from 'utils/data';
import itemCheatPanel from 'assets/inventory/itemCheatPanel.png';

import ItemSlot from './ItemSlot';

type Props = {
	hideTooltip?: boolean;
	onClick: (item: typeof Items[number], event: MouseEvent) => void;
};

const ItemCheatMenu = ({ hideTooltip, onClick }: Props) => (
	<Box
		sx={{
			'position': 'relative',
			'backgroundColor': '#262b44',
			'::after': {
				content: '" "',
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				pointerEvents: 'none',
				background: `url(${itemCheatPanel})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'contain'
			}
		}}
	>
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
				gap: 1,
				p: 7,
				maxHeight: 342,
				overflowY: 'auto',
				backgroundColor: '#262b44'
			}}
		>
			{Items.filter(v => v).map(item => (
				<ItemSlot
					key={item.id}
					hideTooltip={hideTooltip}
					item={{ id: item.id, count: 0, quality: 0 }}
					onClick={e => onClick(item, e)}
				/>
			))}
		</Box>
	</Box>
);

export default ItemCheatMenu;
