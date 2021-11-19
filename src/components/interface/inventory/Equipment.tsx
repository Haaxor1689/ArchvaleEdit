import { useField } from 'react-final-form';
import { Box } from '@mui/material';

import equipPanel from 'assets/inventory/equipPanel.png';
import { parseHexArray, parseHexValue, parseToHex } from 'utils';
import { InventoryItem } from 'utils/types';
import Sprite from 'components/Sprite';

import ItemSlot from './ItemSlot';

type Props = {
	onSlotClick: (
		index: number,
		item: InventoryItem | undefined
	) => InventoryItem | undefined;
};

const Equipment = ({ onSlotClick }: Props) => {
	const {
		input: { value: equipment, onChange: onEquipmentChange }
	} = useField<string>('equipment', { subscription: { value: true } });

	const equipmentItems = parseHexArray<InventoryItem | undefined>(
		equipment,
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

	const setEquipment = (index: number, item: InventoryItem | undefined) => {
		onEquipmentChange({
			target: {
				value:
					equipment.substring(0, index * 7) +
					(!item
						? 'FFFF000'
						: parseToHex(item.id, 4) +
						  parseToHex(item.count, 2) +
						  parseToHex(item.quality, 1)) +
					equipment.substring((index + 1) * 7)
			}
		});
	};

	return (
		<Sprite
			img={equipPanel}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 1,
				pt: 4,
				pb: 6,
				pl: 1,
				pr: 5,
				mb: 26
			}}
		>
			<ItemSlot
				item={equipmentItems[0]}
				variant="head"
				onClick={() => setEquipment(0, onSlotClick(0, equipmentItems[0]))}
			/>
			<ItemSlot
				item={equipmentItems[1]}
				variant="chest"
				onClick={() => setEquipment(1, onSlotClick(1, equipmentItems[1]))}
			/>
			<ItemSlot
				item={equipmentItems[2]}
				variant="ring"
				onClick={() => setEquipment(2, onSlotClick(2, equipmentItems[2]))}
			/>
		</Sprite>
	);
};

export default Equipment;
