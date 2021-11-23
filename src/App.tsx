import {
	Container,
	CssBaseline,
	ThemeProvider,
	useMediaQuery
} from '@mui/material';
import { useState } from 'react';

import FileLoadForm from 'components/FIleLoadForm';
import WorldEditForm from 'components/WorldEditForm';
import { World } from 'utils/types';

import theme from './utils/theme';

const App = () => {
	const [save, setSave] = useState<[string, World]>();

	const sm = useMediaQuery('(max-width:900px)');
	const lg = useMediaQuery('(max-width:1200px)');
	const xl = useMediaQuery('(max-width:1536px)');

	return (
		<ThemeProvider theme={theme(sm ? 3 : lg ? 4 : xl ? 5 : 6)}>
			<CssBaseline />
			<Container
				maxWidth="lg"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
					py: 0
				}}
			>
				{!save ? (
					<FileLoadForm setWorldData={setSave} />
				) : (
					<WorldEditForm save={save} reset={() => setSave(undefined)} />
				)}
			</Container>
		</ThemeProvider>
	);
};

export default App;
