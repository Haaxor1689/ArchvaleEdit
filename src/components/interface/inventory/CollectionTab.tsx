import { Box, Typography } from '@mui/material';
import { useField } from 'react-final-form';
import { MouseEventHandler } from 'react';

import collectionPanel from 'assets/inventory/collectionPanel.png';
import { parseHexArray, parseHexValue, parseToHex } from 'utils';
import { InventoryItem } from 'utils/types';
import Sprite from 'components/Sprite';

import ItemSlot from './ItemSlot';

const CollectionTab = () => {
	const {
		input: { value: inventory, onChange: onInventoryChange }
	} = useField<string>('collection', { subscription: { value: true } });

	// TODO: Adjust based on layout of data
	const inventoryItems = parseHexArray<InventoryItem>(inventory, 7, v => ({
		id: parseHexValue(v.slice(0, 4)),
		count: parseHexValue(v.slice(4, 6)),
		quality: parseHexValue(v[6])
	}));

	// TODO: Adjust based on layout of data
	const onItemClick =
		(item: InventoryItem, index: number): MouseEventHandler<Element> =>
		e => {
			const delta = (e.button === 2 ? -1 : 1) * (e.shiftKey ? 5 : 1);
			const count = Math.min(Math.max(item.count + delta, 0), 255);
			onInventoryChange({
				target: {
					value:
						inventory.substring(0, index * 7) +
						(parseToHex(item.id, 4) +
							parseToHex(count, 2) +
							parseToHex(item.quality, 1)) +
						inventory.substring((index + 1) * 7)
				}
			});
		};

	return (
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
				img={collectionPanel}
				width={161}
				height={104}
				sx={{ px: 5, pt: 5 }}
			>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
						gap: 1
					}}
				>
					{inventoryItems.slice(0, 16).map((item, index) => (
						<ItemSlot
							key={index}
							item={item}
							onClick={onItemClick(item, index)}
						/>
					))}
				</Box>
				<Box sx={{ display: 'flex', mt: 14, ml: 4, gap: 12 }}>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
							gap: 1
						}}
					>
						{inventoryItems.slice(16, 26).map((item, index) => (
							<ItemSlot
								key={index + 16}
								item={item}
								onClick={onItemClick(item, index + 16)}
							/>
						))}
					</Box>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: 1
						}}
					>
						{inventoryItems.slice(26).map((item, index) => (
							<ItemSlot
								key={index + 26}
								item={item}
								onClick={onItemClick(item, index + 26)}
							/>
						))}
					</Box>
				</Box>
			</Sprite>
			<Typography variant="caption" textAlign="center">
				Use left and right click together with shift to modify count of
				materials in the collection.
			</Typography>
		</Box>
	);
};

export default CollectionTab;
