import { Box, IconButton, Tooltip } from '@mui/material';

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
			<Box>
				<Sprite
					component={IconButton}
					img={playerIcon}
					width={10}
					height={10}
					onClick={() => !isRespawn && setRespawn(room)}
					sx={{
						borderRadius: 0,
						opacity: !isRespawn ? 0.5 : undefined
					}}
				/>
			</Box>
		</Tooltip>
	);
};

export default RespawnSwitch;
