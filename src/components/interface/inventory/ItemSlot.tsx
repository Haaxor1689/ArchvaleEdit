import { IconButton, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';

import emptySlot from 'assets/inventory/emptySlot.png';
import itemSlot from 'assets/inventory/itemSlot.png';
import hoverSlot from 'assets/inventory/hoverSlot.png';
import itemTrash from 'assets/inventory/itemTrash.png';
import hoverTrash from 'assets/inventory/hoverTrash.png';
import itemHead from 'assets/inventory/itemHead.png';
import hoverHead from 'assets/inventory/hoverHead.png';
import itemChest from 'assets/inventory/itemChest.png';
import hoverChest from 'assets/inventory/hoverChest.png';
import itemRing from 'assets/inventory/itemRing.png';
import hoverRing from 'assets/inventory/hoverRing.png';
import { isStackable, isUpgradeable, StrokeTextShadow } from 'utils';
import { Items } from 'utils/data';
import { InventoryItem } from 'utils/types';
import Sprite from 'components/Sprite';

import ItemTooltip from '../ItemTooltip';

import ItemStats from './ItemStats';

type SlotVariant = 'item' | 'trash' | 'head' | 'chest' | 'ring' | 'empty';

const getItemIcon = (variant: SlotVariant) => {
	switch (variant) {
		case 'item':
			return itemSlot;
		case 'trash':
			return itemTrash;
		case 'head':
			return itemHead;
		case 'chest':
			return itemChest;
		case 'ring':
			return itemRing;
		case 'empty':
			return undefined;
	}
};

const getHoverIcon = (variant: SlotVariant) => {
	switch (variant) {
		case 'item':
			return hoverSlot;
		case 'trash':
			return hoverTrash;
		case 'head':
			return hoverHead;
		case 'chest':
			return hoverChest;
		case 'ring':
			return hoverRing;
		case 'empty':
			return undefined;
	}
};

type Props = {
	item?: InventoryItem;
	onClick?: MouseEventHandler;
	variant?: SlotVariant;
	hideTooltip?: boolean;
};

const ItemSlot = ({ item, onClick, variant = 'item', hideTooltip }: Props) => {
	const itemMeta = Items[item?.id ?? -1];
	return (
		<ItemTooltip
			title={
				!item || hideTooltip ? (
					''
				) : !itemMeta ? (
					<Typography color="badge">???</Typography>
				) : (
					<ItemStats quality={item.quality} {...itemMeta} />
				)
			}
		>
			<IconButton
				onClick={onClick}
				onContextMenu={e => {
					e.preventDefault();
					onClick?.(e);
				}}
				sx={{
					'position': 'relative',
					'height': t => t.spacing(19),
					'width': t => t.spacing(18),
					'borderRadius': 0,
					'background': `url(${
						!item && variant === 'item' ? emptySlot : getItemIcon(variant)
					})`,
					'backgroundPosition': 'bottom',
					'backgroundRepeat': 'no-repeat',
					'backgroundSize': 'contain',
					':hover': {
						backgroundImage: `url(${getHoverIcon(variant)})`
					}
				}}
			>
				{item && itemMeta && isStackable(itemMeta) && item.count > 0 && (
					<Typography
						variant="body2"
						sx={{
							position: 'absolute',
							bottom: t => t.spacing(3.666),
							right: t => t.spacing(2.666),
							textShadow: StrokeTextShadow,
							zIndex: 2
						}}
					>
						{item.count}
					</Typography>
				)}

				{item && itemMeta && isUpgradeable(itemMeta) && item.quality > 0 && (
					<Typography
						variant="body2"
						sx={{
							position: 'absolute',
							top: t => t.spacing(3.666),
							right: t => t.spacing(2.666),
							textShadow: StrokeTextShadow,
							zIndex: 2
						}}
					>
						+{item.quality}
					</Typography>
				)}

				{item && itemMeta.sprite && (
					<Sprite
						img={`${process.env.PUBLIC_URL}/assets/inventory/${itemMeta.sprite[0]}.png`}
						width={itemMeta.sprite[1]}
						height={itemMeta.sprite[2]}
						flexShrink={0}
						zIndex={1}
					/>
				)}
			</IconButton>
		</ItemTooltip>
	);
};

export default ItemSlot;
