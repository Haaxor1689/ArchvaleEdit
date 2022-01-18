import { IconButton, Tooltip } from '@mui/material';

import Sprite from 'components/Sprite';
import playerIcon from 'assets/world/icons/player.png';

import { useIsRoomRespawn, useMapContext } from '../MapProvider';

const RespawnSwitch = () => {
	const { selected, rooms, setRespawn } = useMapContext();
	const room = rooms?.find(r => r.room_id === selected);
	const isRespawn = useIsRoomRespawn(room);
	if (!room) return null;

	return (
		<Tooltip title={isRespawn ? 'Is spawn point' : 'Set respawn'}>
			<IconButton
				onClick={() => !isRespawn && setRespawn(room)}
				sx={{ opacity: !isRespawn ? 0.5 : undefined }}
			>
				<Sprite img={playerIcon} />
			</IconButton>
		</Tooltip>
	);
};

export default RespawnSwitch;
