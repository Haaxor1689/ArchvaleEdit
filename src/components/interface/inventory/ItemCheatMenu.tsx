import { Box } from '@mui/material';
import { MouseEvent } from 'react';
import Scrollbars from 'react-custom-scrollbars';

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
			'height': t => t.spacing(41),
			'width': t => t.spacing(161),
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
				backgroundSize: 'contain',
				zIndex: 1
			}
		}}
	>
		<Scrollbars style={{ width: '100%', height: '100%' }}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
					gap: 1,
					p: 5,
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
		</Scrollbars>
	</Box>
);

export default ItemCheatMenu;
