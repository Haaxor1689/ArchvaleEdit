import { Box, Button, Typography } from '@mui/material';

import FileInput from 'components/form/FileInput';
import Sprite from 'components/Sprite';
import AutoSubmit from 'components/AutoSubmit';
import Form from 'components/form/Form';
import { World, WorldSchema } from 'utils/types';
import { makeBase64File } from 'utils';

type Props = {
	setWorldData: (save: [string, World]) => void;
};

const FileLoadForm = ({ setWorldData }: Props) => (
	<Form
		initialValues={{ file: undefined as File | undefined }}
		onSubmit={async ({ file }) => {
			try {
				setWorldData([
					file.name,
					WorldSchema.parse(JSON.parse(atob(atob(await makeBase64File(file)))))
				]);
			} catch (e) {
				console.error(e);
				return { file: 'Failed to parse file' };
			}
		}}
		validate={({ file }) =>
			!file
				? { file: 'Required' }
				: !file.name.endsWith('.avsv')
				? { file: 'Wrong file type' }
				: undefined
		}
		sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			flexGrow: 1,
			gap: 6
		}}
	>
		<Sprite
			img={`${process.env.PUBLIC_URL}/assets/logo-512.png`}
			height={100}
			sx={{ aspectRatio: '1', imageRendering: 'initial', mb: -16 }}
		/>
		<Typography textAlign="center" variant="body2">
			Start by opening a save file named{' '}
			<Typography component="span" color="badge">
				worldX.avsv
			</Typography>
			.{' '}
			<Typography component="span" color="badge">
				X
			</Typography>{' '}
			corresponds to the order of the save file. Save location is based on the
			version of the game you own.
		</Typography>
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				alignItems: 'center',
				gap: 4,
				textAlign: 'center'
			}}
		>
			<Typography variant="h3" color="primary.main">
				Steam or GoG
			</Typography>
			<Typography variant="h3" color="primary.main">
				XBox GamePass
			</Typography>
			<Typography color="badge" sx={{ wordBreak: 'break-word' }}>
				%AppData%\AV_gms2_3
			</Typography>
			<Typography color="badge" sx={{ wordBreak: 'break-word' }}>
				C:\Users\{'{{USER_NAME}}'}\AppData\Local\Packages\HumbleBundle.Archvale_
				{'{{HASH}}'}\LocalCache\Roaming\AV_gms2_3
			</Typography>
			<Typography />
		</Box>
		<Typography variant="caption" textAlign="center">
			If you started playing on the release version on XBox GamePass, after
			updating to the latest update, you may see your saves missing. You can fix
			this by going the the GamePass save folder and renaming all the old{' '}
			<Typography component="span" variant="caption" color="badge">
				worldX.json
			</Typography>{' '}
			files to{' '}
			<Typography component="span" variant="caption" color="badge">
				worldX.avsv
			</Typography>
			.
		</Typography>
		<Button
			variant="contained"
			onClick={() => setWorldData(['', undefined as never])}
		>
			New game
		</Button>
		<FileInput id="file" label="Load game" acceptFileTypes={['.avsv']} />
		<AutoSubmit />
	</Form>
);

export default FileLoadForm;
