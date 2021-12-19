import { Box, Button, IconButton, Typography } from '@mui/material';
import { noop } from 'lodash-es';
import { createContext, FC, useContext, useState } from 'react';
import { useField } from 'react-final-form';

import { StrokeTextShadow } from 'utils';

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
		<Box sx={{ display: 'flex', gap: 2 }}>
			<Button
				variant={!mp ? 'outlined' : 'text'}
				size="small"
				onClick={() => {
					onMpChange({ target: { value: 0 } });
					setP('P1');
				}}
				sx={{
					textShadow: StrokeTextShadow,
					color: !mp ? 'primary.main' : 'text.primary'
				}}
			>
				Off
			</Button>
			<Button
				variant={mp ? 'outlined' : 'text'}
				size="small"
				onClick={() => onMpChange({ target: { value: 1 } })}
				sx={{
					textShadow: StrokeTextShadow,
					color: mp ? 'primary.main' : 'text.primary'
				}}
			>
				On
			</Button>
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
				borderRadius: 0,
				textShadow: StrokeTextShadow
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
