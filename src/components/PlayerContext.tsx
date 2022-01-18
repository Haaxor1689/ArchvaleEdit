import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { noop } from 'lodash-es';
import { createContext, FC, useContext, useState } from 'react';
import { useField } from 'react-final-form';

import { StrokeTextShadow } from 'utils';
import playerIcon from 'assets/world/icons/player.png';
import multiplayerIcon from 'assets/world/icons/multiplayer.png';

import Sprite from './Sprite';

type P = 'P1' | 'P2';

const PlayerContext = createContext<[P, (p: P) => void]>(['P1', noop]);

export const usePlayer = () => useContext(PlayerContext)[0];

export const usePlayerBadges = () =>
	useContext(PlayerContext)[0] === 'P1'
		? 'badges_equipped'
		: 'badges_equipped_p2';

export const getPlayerColor = (p: P): 'badge' | 'player_2' =>
	p === 'P1' ? 'badge' : 'player_2';

export const usePlayerStats = () =>
	useContext(PlayerContext)[0] === 'P1' ? 'player_stats' : 'player_2_stats';

export const MultiplayerToggle = () => {
	const {
		input: { value: mp, onChange: onMpChange }
	} = useField<number>('mp');

	const setP = useContext(PlayerContext)[1];

	return (
		<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
			<Tooltip title="Single-player">
				<IconButton
					onClick={() => {
						onMpChange({ target: { value: 0 } });
						setP('P1');
					}}
					sx={{ filter: !mp ? undefined : 'saturate(0)' }}
				>
					<Sprite img={playerIcon} />
				</IconButton>
			</Tooltip>
			<Tooltip title="Multi-player">
				<IconButton
					onClick={() => onMpChange({ target: { value: 1 } })}
					sx={{ filter: mp ? undefined : 'saturate(0)' }}
				>
					<Sprite img={multiplayerIcon} />
				</IconButton>
			</Tooltip>
		</Box>
	);
};

export const PlayerToggle = () => {
	const [p, setP] = useContext(PlayerContext);

	const {
		input: { value: mp }
	} = useField<number>('mp', { subscription: { value: true } });

	return mp ? (
		<IconButton
			onClick={() => setP(p === 'P1' ? 'P2' : 'P1')}
			sx={{
				position: 'absolute',
				top: 0,
				right: 0,
				transform: 'translateY(-50%)',
				color: getPlayerColor(p),
				textShadow: StrokeTextShadow,
				p: 1
			}}
		>
			<Typography variant="h3">{p}</Typography>
		</IconButton>
	) : null;
};

export const PlayerProvider: FC = ({ children }) => {
	const [p, setP] = useState<P>('P1');
	return (
		<PlayerContext.Provider value={[p, setP]}>
			{children}
		</PlayerContext.Provider>
	);
};
