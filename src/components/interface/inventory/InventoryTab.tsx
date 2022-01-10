import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useField } from 'react-final-form';
import Scrollbars from 'react-custom-scrollbars';

import inventoryPanel from 'assets/inventory/inventoryPanel.png';
import storagePanel from 'assets/inventory/storagePanel.png';
import {
	isStackable,
	isUpgradeable,
	parseHexArray,
	parseHexValue,
	parseToHex,
	stackItem,
	upgradeItem
} from 'utils';
import { InventoryItem } from 'utils/types';
import { Items } from 'utils/data';
import Sprite from 'components/Sprite';
import { MaxStackSize } from 'utils/inventoryUtils';

import ItemCheatMenu from './ItemCheatMenu';
import GrabbedItem from './GrabbedItem';
import ItemSlot from './ItemSlot';
import Equipment from './Equipment';
import SortInventoryButton from './SortInventoryButton';

type Props = {
	variant: 'inventory' | 'storage';
};

const InventoryTab = ({ variant }: Props) => {
	const {
		input: { value: inventory, onChange: onInventoryChange }
	} = useField<string>(variant, { subscription: { value: true } });

	const [heldItem, setHeldItem] = useState<InventoryItem>();
	const [trashedItem, setTrashedItem] = useState<InventoryItem>();

	const inventoryItems = parseHexArray<InventoryItem | undefined>(
		inventory,
		7,
		v =>
			v === 'FFFF000'
				? undefined
				: {
						id: parseHexValue(v.slice(0, 4)),
						count: parseHexValue(v.slice(4, 6)),
						quality: parseHexValue(v[6])
				  }
	);

	const setItem = (index: number, item: InventoryItem | undefined) => {
		onInventoryChange({
			target: {
				value:
					inventory.substring(0, index * 7) +
					(!item
						? 'FFFF000'
						: parseToHex(item.id, 4) +
						  parseToHex(item.count, 2) +
						  parseToHex(item.quality, 1)) +
					inventory.substring((index + 1) * 7)
			}
		});
	};

	return (
		<GrabbedItem item={heldItem}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignSelf: 'stretch',
					alignItems: 'center',
					gap: 2
				}}
			>
				<Sprite
					img={variant === 'storage' ? storagePanel : inventoryPanel}
					width={161}
					height={variant === 'inventory' ? 116 : 111}
					sx={{
						position: 'relative',
						px: 5,
						pt: 5,
						pb: 27,
						mb: variant === 'storage' ? 5 : 0
					}}
				>
					<Scrollbars style={{ width: '100%', height: '100%' }}>
						<Box
							sx={{
								'display': 'grid',
								'gridTemplateColumns': '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
								'gap': 1,
								'> *:first-of-type': {
									mb: variant === 'inventory' ? 5 : undefined
								}
							}}
						>
							{inventoryItems.map((item, index) => (
								<ItemSlot
									key={index}
									item={item}
									hideTooltip={!!heldItem}
									onClick={e => {
										if (item && e.shiftKey && !heldItem) {
											const delta = e.button === 2 ? -1 : 1;
											setItem(
												index,
												stackItem(upgradeItem(item, delta), delta)
											);
											return;
										}

										if (
											item &&
											heldItem &&
											isStackable(Items[item.id], heldItem)
										) {
											const sum = item.count + heldItem.count;
											if (sum <= MaxStackSize) {
												setHeldItem(undefined);
												setItem(index, { ...item, count: sum });
											} else {
												setHeldItem({ ...item, count: sum - MaxStackSize });
												setItem(index, { ...item, count: MaxStackSize });
											}
											return;
										}

										setHeldItem(item);
										setItem(index, heldItem);
									}}
								/>
							))}
						</Box>
					</Scrollbars>
					<Box
						sx={{
							position: 'absolute',
							left: t => t.spacing(2),
							bottom: t => t.spacing(2)
						}}
					>
						<SortInventoryButton
							items={
								variant === 'inventory'
									? inventoryItems.slice(8)
									: inventoryItems
							}
							onSort={newItems =>
								onInventoryChange({
									target: {
										value: (variant === 'inventory'
											? [...inventoryItems.slice(0, 8), ...newItems]
											: newItems
										)
											.map(item =>
												!item
													? 'FFFF000'
													: parseToHex(item.id, 4) +
													  parseToHex(item.count, 2) +
													  parseToHex(item.quality, 1)
											)
											.join('')
									}
								})
							}
						/>
					</Box>
					<Box
						sx={{
							position: 'absolute',
							right: t => t.spacing(5),
							bottom: t => t.spacing(7)
						}}
					>
						<ItemSlot
							item={trashedItem}
							variant="trash"
							hideTooltip={!!heldItem}
							onClick={() => {
								setHeldItem(!heldItem ? trashedItem : undefined);
								setTrashedItem(heldItem);
							}}
						/>
					</Box>
					{variant === 'inventory' && (
						<Equipment
							onSlotClick={(index, equipped) => {
								if (!heldItem) {
									setHeldItem(equipped);
									return undefined;
								}

								const itemMeta = Items[heldItem.id];
								const canEquip =
									index === 0 || index === 3
										? itemMeta.subtype === 'Head'
										: index === 1 || index === 4
										? itemMeta.subtype === 'Body'
										: itemMeta.subtype === 'Ring';

								if (!canEquip) {
									return equipped;
								}

								setHeldItem(equipped);
								return heldItem;
							}}
						/>
					)}
					<ItemCheatMenu
						hideTooltip={!!heldItem}
						onClick={(item, e) => {
							setHeldItem(
								heldItem
									? undefined
									: {
											id: item.id,
											count: e.shiftKey && isStackable(item) ? MaxStackSize : 1,
											quality: e.shiftKey && isUpgradeable(item) ? 5 : 0
									  }
							);
						}}
					/>
				</Sprite>
				<Typography variant="caption" textAlign="center">
					Pick new items from item database on the left, pick full stack (
					{MaxStackSize}) or highest quality (+5) using shift. Use left and
					right click together with shift to modify count/quality of items in
					the {variant}.
				</Typography>
			</Box>
		</GrabbedItem>
	);
};

export default InventoryTab;
