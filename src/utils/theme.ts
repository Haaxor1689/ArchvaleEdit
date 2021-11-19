import { createTheme } from '@mui/material';

import 'assets/font/stylesheet.css';

import background from 'assets/background.png';

declare module '@mui/material/styles' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Palette {
		badge?: string;
		highlight?: string;
		uncommon?: string;
		legendary?: string;
	}
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface PaletteOptions {
		badge?: string;
		highlight?: string;
		uncommon?: string;
		legendary?: string;
	}
}

const theme = createTheme({
	palette: {
		text: { secondary: '#5a6988' },
		error: { main: '#e43b44' },
		success: { main: '#63c74d' },
		badge: '#2ce8f5',
		highlight: '#fee761',
		uncommon: '#55c157',
		legendary: '#ff3d3d',
		mode: 'dark',
		primary: { main: '#ffc825' },
		background: { default: '#262b44' }
	},
	typography: {
		fontSize: 20,
		fontFamily: 'Nokia, Arial',
		h1: {
			fontSize: '4rem'
		},
		h2: {
			fontSize: '3rem'
		},
		caption: {
			fontSize: '0.666rem'
		},
		body2: {
			fontSize: '0.95rem'
		}
	},
	spacing: 6,
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				'*': {
					imageRendering: 'pixelated'
				},
				'body': {
					position: 'relative'
				},
				'body:before': {
					content: '" "',
					position: 'absolute',
					bottom: 0,
					right: 0,
					minHeight: '100%',
					zIndex: -1,
					opacity: 0.2,
					backgroundImage: `url(${background})`,
					backgroundPosition: 'bottom right',
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
					backgroundRepeatY: 'repeat',
					aspectRatio: '336/284',
					filter: 'blur(10px)'
				}
			}
		}
	}
});

export default theme;
