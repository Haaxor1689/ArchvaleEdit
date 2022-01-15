import { IconButton, ThemeProvider, Typography } from '@mui/material';
import { memo, MouseEventHandler } from 'react';

import emptySlot from 'assets/inventory/emptySlot.png';
import itemSlot from 'assets/inventory/itemSlot.png';
import hoverSlot from 'assets/inventory/hoverSlot.png';
import emptyTrash from 'assets/inventory/emptyTrash.png';
import itemTrash from 'assets/inventory/itemTrash.png';
import hoverTrash from 'assets/inventory/hoverTrash.png';
import emptyHead from 'assets/inventory/emptyHead.png';
import itemHead from 'assets/inventory/itemHead.png';
import hoverHead from 'assets/inventory/hoverHead.png';
import emptyChest from 'assets/inventory/emptyChest.png';
import itemChest from 'assets/inventory/itemChest.png';
import hoverChest from 'assets/inventory/hoverChest.png';
import emptyRing from 'assets/inventory/emptyRing.png';
import itemRing from 'assets/inventory/itemRing.png';
import hoverRing from 'assets/inventory/hoverRing.png';
import itemOccupied from 'assets/inventory/itemOccupied.png';
import hoverOccupied from 'assets/inventory/hoverOccupied.png';
import questionMark from 'assets/questionMark.png';
import {
	isStackable,
	isUpgradeable,
	pulseAnimation,
	StrokeTextShadow
} from 'utils';
import { Items } from 'utils/data';
import { InventoryItem } from 'utils/types';
import Sprite from 'components/Sprite';
import theme from 'utils/theme';
import useThemeSpacing from 'utils/useThemeSpacing';

import ItemTooltip from '../ItemTooltip';

import ItemStats from './ItemStats';

type SlotVariant = 'item' | 'trash' | 'head' | 'chest' | 'ring' | 'empty';

const getEmptyIcon = (variant: SlotVariant) => {
	switch (variant) {
		case 'item':
			return emptySlot;
		case 'trash':
			return emptyTrash;
		case 'head':
			return emptyHead;
		case 'chest':
			return emptyChest;
		case 'ring':
			return emptyRing;
		case 'empty':
			return undefined;
	}
};

const getItemIcon = (variant: SlotVariant, isOccupied: boolean) => {
	switch (variant) {
		case 'item':
			return itemSlot;
		case 'trash':
			return itemTrash;
		case 'head':
			return isOccupied ? itemOccupied : itemHead;
		case 'chest':
			return isOccupied ? itemOccupied : itemChest;
		case 'ring':
			return isOccupied ? itemOccupied : itemRing;
		case 'empty':
			return undefined;
	}
};

const getHoverIcon = (variant: SlotVariant, isOccupied: boolean) => {
	switch (variant) {
		case 'item':
			return hoverSlot;
		case 'trash':
			return hoverTrash;
		case 'head':
			return isOccupied ? hoverOccupied : hoverHead;
		case 'chest':
			return isOccupied ? hoverOccupied : hoverChest;
		case 'ring':
			return isOccupied ? hoverOccupied : hoverRing;
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
	const spacing = useThemeSpacing();
	const isOccupied = !!item?.count;
	return (
		<ItemTooltip
			title={
				!item || hideTooltip ? (
					''
				) : (
					<ThemeProvider theme={theme(spacing)}>
						{!itemMeta ? (
							<Typography color="badge">
								???
								<Typography variant="caption" color="text.secondary">
									#{item.id}
								</Typography>
							</Typography>
						) : (
							<ItemStats quality={item.quality} {...itemMeta} />
						)}
					</ThemeProvider>
				)
			}
		>
			<IconButton
				onClick={onClick}
				disableRipple
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
						isOccupied
							? getItemIcon(variant, isOccupied)
							: getEmptyIcon(variant)
					})`,
					'backgroundPosition': 'bottom',
					'backgroundRepeat': 'no-repeat',
					'backgroundSize': 'contain',
					'cursor': !onClick ? 'initial' : undefined,
					'opacity': !isOccupied ? '0.5' : undefined,
					':focus-visible,:hover': {
						backgroundImage: `url(${getHoverIcon(variant, isOccupied)})`,
						backgroundColor: 'transparent',
						opacity: 1,
						animation: pulseAnimation
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

				{item && itemMeta && isUpgradeable(itemMeta) && !!item.quality && (
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

				{item &&
					(itemMeta?.sprite ? (
						<Sprite
							img={`${process.env.PUBLIC_URL}/assets/inventory/${itemMeta.sprite[0]}_0.png`}
							width={itemMeta.sprite[1]}
							height={itemMeta.sprite[2]}
							flexShrink={0}
							zIndex={1}
							sx={
								item.discovered === 0
									? { filter: 'brightness(0) opacity(0.5)' }
									: undefined
							}
						/>
					) : (
						<Sprite
							img={questionMark}
							width={8}
							height={10}
							flexShrink={0}
							zIndex={1}
						/>
					))}
			</IconButton>
		</ItemTooltip>
	);
};

export default memo(ItemSlot);
