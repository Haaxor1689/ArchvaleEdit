import { Box, Button, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

import Sprite from 'components/Sprite';
import { getAsset, StrokeTextShadow } from 'utils';
import BlankSaveFile from 'utils/data/blankSaveFile';
import { World } from 'utils/types';

type Props = {
	setWorldData: (save?: [string, World]) => void;
};

const NewGameForm = ({ setWorldData }: Props) => {
	const [slot, setSlot] = useState<number>(-1);
	const [mp, setMp] = useState<number>(-1);
	const [difficulty, setDifficulty] = useState<number>(-1);
	const createNewGame = (map: number) =>
		setWorldData([
			`world${slot}.avsv`,
			{ ...BlankSaveFile(map), mp, difficulty }
		]);
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				flexGrow: 1,
				my: 10,
				gap: 2
			}}
		>
			<Typography
				component="h2"
				variant="h3"
				color="#da6580"
				sx={{ mb: 2, textShadow: StrokeTextShadow }}
			>
				{slot === -1
					? 'Select save slot'
					: mp === -1
					? 'Select a mode'
					: difficulty === -1
					? 'Select a difficulty'
					: 'Select world template'}
			</Typography>
			{slot === -1 ? (
				<Box sx={{ display: 'flex', gap: 2 }}>
					{[...Array(5).keys()].map(i => (
						<Button key={i} onClick={() => setSlot(i + 1)} variant="outlined">
							{i + 1}
						</Button>
					))}
				</Box>
			) : mp === -1 ? (
				<>
					<Button onClick={() => setMp(0)} variant="outlined">
						Singleplayer
					</Button>
					<Button onClick={() => setMp(1)} variant="outlined">
						Local Multiplayer
					</Button>
				</>
			) : difficulty === -1 ? (
				<>
					<Button onClick={() => setDifficulty(0)} variant="outlined">
						Easy
					</Button>
					<Button onClick={() => setDifficulty(1)} variant="outlined">
						Normal
					</Button>
					<Button onClick={() => setDifficulty(2)} variant="outlined">
						Hard
					</Button>
				</>
			) : (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexWrap: 'wrap',
						gap: 4
					}}
				>
					{[...Array(5).keys()].map(i => (
						<IconButton
							key={i}
							onClick={() => createNewGame(i)}
							sx={{ overflow: 'hidden' }}
						>
							<Sprite
								img={getAsset('mapgen', `s_mapgen_test_${i}`)}
								sx={{ mx: -16, my: -22 }}
							/>
						</IconButton>
					))}
				</Box>
			)}
			<Button
				onClick={() => setWorldData(undefined)}
				sx={{ mt: 2, color: 'text.primary' }}
			>
				Back
			</Button>
		</Box>
	);
};

export default NewGameForm;
