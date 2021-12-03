import { Box } from '@mui/material';

import Collapsible from 'components/Collapsible';
import { Room } from 'utils/types';

import { useMapContext } from './MapProvider';
import RoomControl from './RoomControl';

const RoomEdit = ({ x, y }: Pick<Room, 'x' | 'y'>) => {
	const { rooms } = useMapContext();

	const neighbors = [
		[-1, -1],
		[0, -1],
		[1, -1],
		[-1, 0],
		[0, 0],
		[1, 0],
		[-1, 1],
		[0, 1],
		[1, 1]
	].map(
		([xN, yN]) =>
			[xN, yN, rooms.find(r => r.x - xN === x && r.y - yN === y)] as const
	);

	return (
		<Collapsible
			title="Edit room"
			initialExpanded
			sx={{
				display: 'flex',
				flexDirection: 'column',
				rowGap: 1
			}}
		>
			<Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
				<RoomControl variant="Move" neighbors={neighbors} />
				<RoomControl variant="Exits" neighbors={neighbors} />
				<RoomControl variant="Create" neighbors={neighbors} />
				<RoomControl variant="Select" neighbors={neighbors} />
			</Box>
		</Collapsible>
	);
};

export default RoomEdit;
