import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';

import FileLoadForm from 'components/FIleLoadForm';
import WorldEditForm from 'components/WorldEditForm';
import { World } from 'utils/types';

import theme from './utils/theme';

const App = () => {
	const [save, setSave] = useState<[string, World]>();
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container
				maxWidth="lg"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
					py: 6
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
