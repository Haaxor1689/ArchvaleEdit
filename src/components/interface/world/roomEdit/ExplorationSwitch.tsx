import { IconButton, Tooltip } from '@mui/material';

import Sprite from 'components/Sprite';
import explorationHidden from 'assets/world/icons/explorationHidden.png';
import explorationOutline from 'assets/world/icons/explorationOutline.png';
import explorationSeen from 'assets/world/icons/explorationSeen.png';
import explorationVisited from 'assets/world/icons/explorationVisited.png';

import { useMapContext } from '../MapProvider';

const ExplorationSprites = {
	Hidden: explorationHidden,
	Outline: explorationOutline,
	Seen: explorationSeen,
	Visited: explorationVisited,
	Cleared: explorationVisited
};

const ExplorationSwitch = () => {
	const { selected, rooms, toggleExplored, getRoomStatus } = useMapContext();
	const room = rooms?.find(r => r.room_id === selected);
	if (!room) return null;
	const status = getRoomStatus(room.room_id);

	return (
		<Tooltip title={`Exploration: ${status}`}>
			<IconButton onClick={() => toggleExplored?.(room.room_id)}>
				<Sprite img={ExplorationSprites[status]} />
			</IconButton>
		</Tooltip>
	);
};

export default ExplorationSwitch;
