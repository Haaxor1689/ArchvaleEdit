import { useField } from 'react-final-form';

import Collapsible from 'components/Collapsible';
import { parseHexValue } from 'utils';
import { ParsedObject } from 'utils/data';
import { Room } from 'utils/types';
import TextButton from 'components/TextButton';

import ObjectInfo from './ObjectInfo';

const RoomObjectsInfo = ({ room_id }: Pick<Room, 'room_id'>) => {
	const {
		input: { value, onChange }
	} = useField<string[]>(`world.rooms[${room_id}].objects`, {
		subscription: { value: true }
	});

	const onDelete = (i: number) => {
		const newVal = [...value];
		newVal.splice(i, 1);
		onChange({ target: { value: newVal } });
	};

	const onAdd = () => {
		onChange({ target: { value: [...value, '00001000100001'] } });
	};

	const objects = value.map<ParsedObject>(o => ({
		o,
		type: parseHexValue(o.slice(0, 4)),
		can_take: parseHexValue(o.slice(4, 5)),
		x: parseHexValue(o.slice(5, 8)),
		_foo: parseHexValue(o.slice(8, 9)),
		y: parseHexValue(o.slice(9, 12)),
		_bar: parseHexValue(o.slice(12, 14)),
		ore_type: parseHexValue(o.slice(14, 18)),
		fountain_unlocked: parseHexValue(o[14]),
		chest_opened: parseHexValue(o[14]),
		chest_item: parseHexValue(o.slice(15, 23)),
		plum_picked: parseHexValue(o[14])
	}));

	return (
		<Collapsible
			title="Objects"
			sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
		>
			{objects.map((o, i) => (
				<ObjectInfo
					key={i}
					id={`world.rooms[${room_id}].objects[${i}]`}
					o={o}
					i={i}
					onDelete={onDelete}
				/>
			))}
			<TextButton onClick={onAdd}>+ Add new object</TextButton>
		</Collapsible>
	);
};

export default RoomObjectsInfo;
