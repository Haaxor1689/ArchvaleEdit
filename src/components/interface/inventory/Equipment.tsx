import { useField } from 'react-final-form';

import equipPanel from 'assets/inventory/equipPanel.png';
import { parseHexArray, parseHexValue, parseToHex } from 'utils';
import { InventoryItem } from 'utils/types';
import Sprite from 'components/Sprite';
import { PlayerToggle, usePlayer } from 'components/PlayerContext';

import ItemSlot from './ItemSlot';

const Slots = {
	P1: [
		[0, 'head'],
		[1, 'chest'],
		[2, 'ring']
	],
	P2: [
		[3, 'head'],
		[4, 'chest'],
		[5, 'ring']
	]
} as const;

type Props = {
	onSlotClick: (
		index: number,
		item: InventoryItem | undefined
	) => InventoryItem | undefined;
};

const Equipment = ({ onSlotClick }: Props) => {
	const player = usePlayer();

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
				position: 'absolute',
				right: 0,
				transform: 'translateX(100%)',
				top: t => t.spacing(7),
				display: 'flex',
				flexDirection: 'column',
				gap: 1,
				pt: 4,
				pb: 6,
				pl: 1,
				pr: 5
			}}
		>
			<PlayerToggle />
			{Slots[player].map(([i, slot]) => (
				<ItemSlot
					key={slot}
					item={equipmentItems[i]}
					variant={slot}
					onClick={() => setEquipment(i, onSlotClick(i, equipmentItems[i]))}
				/>
			))}
		</Sprite>
	);
};

export default Equipment;
