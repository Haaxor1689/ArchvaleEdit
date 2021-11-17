import { IconButton, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';

import itemSlot from 'assets/inventory/itemSlot.png';
import hoverSlot from 'assets/inventory/hoverSlot.png';
import { StrokeTextShadow } from 'utils';

type Props = {
	index: number;
	id: number;
	count: number;
	quality: number;
	onClick?: MouseEventHandler;
	setHover?: (index: number | undefined) => void;
};

const ItemSlot = ({ index, id, count, quality, onClick, setHover }: Props) => (
	<IconButton
		onClick={onClick}
		onContextMenu={e => {
			e.preventDefault();
			onClick?.(e);
		}}
		onMouseEnter={() => setHover?.(index)}
		onMouseLeave={() => setHover?.(undefined)}
		sx={{
			'position': 'relative',
			'height': 116,
			'width': 108,
			'background': `url(${itemSlot})`,
			'borderRadius': 0,
			':hover': {
				background: `url(${hoverSlot})`
			}
		}}
	>
		{count > 1 && (
			<Typography
				variant="body2"
				sx={{
					position: 'absolute',
					bottom: 22,
					right: 16,
					textShadow: StrokeTextShadow
				}}
			>
				{count}
			</Typography>
		)}
		<Typography color="badge" sx={{ textShadow: StrokeTextShadow }}>
			{id}
		</Typography>
		{quality > 0 && (
			<Typography
				variant="caption"
				color="uncommon"
				sx={{ textShadow: StrokeTextShadow }}
			>
				+{quality}
			</Typography>
		)}
	</IconButton>
);

export default ItemSlot;
