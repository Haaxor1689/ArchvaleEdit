import { createTheme } from '@mui/material';

import 'assets/font/stylesheet.css';

import background from 'assets/background.png';

declare module '@mui/material/styles' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Palette {
		badge?: string;
		highlight?: string;
		rarity: {
			uncommon: string;
			rare: string;
			epic: string;
			supreme: string;
			legendary: string;
			ancient: string;
			mythical: string;
			divine: string;
		};
	}
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface PaletteOptions {
		badge?: string;
		highlight?: string;
		rarity: {
			uncommon: string;
			rare: string;
			epic: string;
			supreme: string;
			legendary: string;
			ancient: string;
			mythical: string;
			divine: string;
		};
	}
}

const theme = (spacing: number) =>
	createTheme({
		palette: {
			primary: { main: '#ffc825' },
			background: { default: '#262b44' },
			text: { secondary: '#5a6988' },
			error: { main: '#e43b44' },
			success: { main: '#63c74d' },
			badge: '#2ce8f5',
			highlight: '#fee761',
			rarity: {
				uncommon: '#55c157',
				rare: '#59beff',
				epic: '#cf4bd8',
				supreme: '#ffd800',
				legendary: '#ff830f',
				ancient: '#00ffba',
				mythical: '#ff3d3d',
				divine: '#2ce8f5'
			},
			mode: 'dark'
		},
		typography: {
			fontSize: spacing * 3,
			fontFamily: 'Nokia, Arial',
			h1: { fontSize: spacing * 3 * 4 },
			h2: { fontSize: spacing * 3 * 3 },
			h3: { fontSize: spacing * 3 * 1.8 },
			h4: { fontSize: spacing * 3 * 1.4 },
			caption: { fontSize: spacing * 3 * 0.75 },
			body2: { fontSize: spacing * 3 * 0.95 }
		},
		spacing,
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
			},
			MuiInputLabel: {
				styleOverrides: {
					root: {
						fontSize: spacing * 3 * 0.95
					}
				}
			},
			MuiInput: {
				styleOverrides: {
					root: {
						fontSize: spacing * 3,
						marginTop: `${spacing * 3}px !important`
					}
				}
			}
		}
	});

export default theme;
