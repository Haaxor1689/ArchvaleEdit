import { Box, IconButton, Tooltip } from '@mui/material';

import Sprite from 'components/Sprite';
import explorationHidden from 'assets/world/icons/explorationHidden.png';
import explorationOutline from 'assets/world/icons/explorationOutline.png';
import explorationSeen from 'assets/world/icons/explorationSeen.png';
import explorationVisited from 'assets/world/icons/explorationVisited.png';

import { useMapContext } from '../MapProvider';

const ExplorationSprites = {
	Hidden: {
		img: explorationHidden,
		width: 10,
		height: 10
	},
	Outline: {
		img: explorationOutline,
		width: 10,
		height: 10
	},
	Seen: {
		img: explorationSeen,
		width: 10,
		height: 10
	},
	Visited: {
		img: explorationVisited,
		width: 10,
		height: 10
	},
	Cleared: {
		img: explorationVisited,
		width: 10,
		height: 10
	}
};

const ExplorationSwitch = () => {
	const { selected, rooms, toggleExplored, getRoomStatus } = useMapContext();
	const room = rooms?.find(r => r.room_id === selected);
	if (!room) return null;
	const status = getRoomStatus(room.room_id);

	return (
		<Tooltip title={`Exploration: ${status}`}>
			<Box>
				<Sprite
					component={IconButton}
					{...ExplorationSprites[status]}
					onClick={() => toggleExplored?.(room.room_id)}
					sx={{ borderRadius: 0 }}
				/>
			</Box>
		</Tooltip>
	);
};

export default ExplorationSwitch;
