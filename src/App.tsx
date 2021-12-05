import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';

import FileLoadForm from 'components/FIleLoadForm';
import WorldEditForm from 'components/WorldEditForm';
import { World } from 'utils/types';
import useThemeSpacing from 'utils/useThemeSpacing';

import theme from './utils/theme';

const App = () => {
	const [save, setSave] = useState<[string, World]>();
	const spacing = useThemeSpacing();

	return (
		<ThemeProvider theme={theme(spacing)}>
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
