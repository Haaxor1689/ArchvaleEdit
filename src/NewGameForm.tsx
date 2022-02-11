import { Box, Button, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Sprite from 'components/Sprite';
import { getAsset, StrokeTextShadow } from 'utils';
import BlankSaveFile from 'utils/data/blankSaveFile';
import { World } from 'utils/types';
import GeneratedMaps from 'utils/data/generatedMaps';

type Props = {
	setWorldData: (save?: [string, World]) => void;
};

const NewGameForm = ({ setWorldData }: Props) => {
	const [slot, setSlot] = useState('');
	const [mp, setMp] = useState(-1);
	const [difficulty, setDifficulty] = useState(-1);

	const [shiftDown, setShiftDown] = useState(false);

	const createNewGame = (map: number) =>
		setWorldData([
			`world${slot}.avsv`,
			{ ...BlankSaveFile(GeneratedMaps[map]), mp, difficulty }
		]);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) =>
			e.key === 'Shift' && setShiftDown(true);
		const onKeyUp = (e: KeyboardEvent) =>
			e.key === 'Shift' && setShiftDown(false);

		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('keyup', onKeyUp);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
			document.removeEventListener('keyup', onKeyUp);
		};
	}, []);

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
				textAlign="center"
				sx={{ mb: 2, textShadow: StrokeTextShadow }}
			>
				{!slot
					? 'Select save slot'
					: mp === -1
					? 'Select a mode'
					: difficulty === -1
					? 'Select a difficulty'
					: 'Select world template'}
			</Typography>
			{!slot ? (
				<Box sx={{ display: 'flex', gap: 2 }}>
					{[...Array(5).keys()].map(i => (
						<Button
							key={i}
							onClick={() => setSlot(`${i + 1}${shiftDown ? '_testing' : ''}`)}
							variant="outlined"
						>
							{`${i + 1}${shiftDown ? '_testing' : ''}`}
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
						display: 'grid',
						justifyContent: 'center',
						gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr'],
						gap: 4
					}}
				>
					{GeneratedMaps.map((m, i) => (
						<IconButton
							key={i}
							onClick={() => createNewGame(i)}
							sx={{
								'position': 'relative',
								'overflow': 'hidden',
								'minHeight': t => t.spacing(50),
								'p': 3,
								':hover > span': { opacity: 0 }
							}}
						>
							{m.sprite && <Sprite img={getAsset('mapgen', m.sprite)} />}
							<Typography
								variant="h3"
								component="span"
								sx={{
									position: 'absolute',
									transition: 'opacity .3s ease-in-out',
									textShadow: StrokeTextShadow
								}}
							>
								{m.name}
							</Typography>
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
