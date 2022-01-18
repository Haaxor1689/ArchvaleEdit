import { useField } from 'react-final-form';
import { IconButton } from '@mui/material';

import { Room } from 'utils/types';
import trash from 'assets/trash.png';
import Sprite from 'components/Sprite';

type Props = {
	id: number;
};

const DeleteRoomButton = ({ id }: Props) => {
	const {
		input: { value, onChange }
	} = useField<Room[]>('world.rooms', { subscription: { value: true } });

	return (
		<IconButton
			onClick={() =>
				onChange({
					target: {
						value: value
							.filter(r => r.room_id !== id)
							.map((r, i) => ({ ...r, room_id: i }))
					}
				})
			}
		>
			<Sprite img={trash} size={0.3} />
		</IconButton>
	);
};

export default DeleteRoomButton;
