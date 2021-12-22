import { Box, Button, Typography } from '@mui/material';
import { useField } from 'react-final-form';

import { StrokeTextShadow } from 'utils';
import {
	fixIncorrectExits,
	revealDungeons,
	revealRooms
} from 'utils/roomUtils';
import { Dungeon, Room } from 'utils/types';

const Tools = () => {
	const {
		input: { value: rooms, onChange: onRoomsChange }
	} = useField<Room[]>('world.rooms', { subscription: { value: true } });

	const {
		input: { value: dungeons, onChange: onDungeonsChange }
	} = useField<Dungeon[]>('dungeon_data', { subscription: { value: true } });

	return (
		<Box
			sx={{
				position: 'absolute',
				top: t => t.spacing(6),
				left: 0,
				transform: 'translateX(-100%)',
				display: 'flex',
				flexDirection: 'column',
				width: t => t.spacing(30),
				gap: 1,
				p: 2
			}}
		>
			<Typography variant="h3" sx={{ textShadow: StrokeTextShadow }}>
				Tools:
			</Typography>
			<Button
				variant="outlined"
				size="small"
				onClick={() =>
					onRoomsChange({ target: { value: fixIncorrectExits(rooms) } })
				}
				sx={{
					textShadow: StrokeTextShadow,
					color: 'primary.main'
				}}
			>
				Fix room exits
			</Button>
			<Button
				variant="outlined"
				size="small"
				onClick={() => {
					onRoomsChange({ target: { value: revealRooms(rooms) } });
					onDungeonsChange({ target: { value: revealDungeons(dungeons) } });
				}}
				sx={{
					textShadow: StrokeTextShadow,
					color: 'primary.main'
				}}
			>
				Reveal map
			</Button>
		</Box>
	);
};

export default Tools;
