import { Box, Typography } from '@mui/material';

import Form from 'components/form/Form';
import { World } from 'utils/types';
import { makeBase64File } from 'utils';

import FileInput from './form/FileInput';
import Sprite from './Sprite';
import AutoSubmit from './AutoSubmit';

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
					JSON.parse(atob(atob(await makeBase64File(file)))) as World
				]);
			} catch (e) {
				return { file: 'Failed to parse file' };
			}
		}}
		validate={({ file }) =>
			!file
				? { file: 'Required' }
				: !file.name.endsWith('.avsv') && !file.name.endsWith('.json')
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
			Start by opening your save file.{' '}
			<Typography component="span" color="badge">
				X
			</Typography>{' '}
			corresponds to the order of the save file. Save location is based on the
			version of game you own.
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
				Steam
			</Typography>
			<Typography variant="h3" color="primary.main">
				XBox GamePass
			</Typography>
			<Typography>
				<Typography component="span" color="badge">
					worldX.avsv
				</Typography>{' '}
				in{' '}
				<Typography component="span" color="badge">
					%AppData%\AV_gms2_3
				</Typography>{' '}
				folder
			</Typography>
			<Typography sx={{ wordBreak: 'break-word' }}>
				Search for{' '}
				<Typography component="span" color="badge">
					C:\{'{{USER_NAME}}'}\AppData\Local\Packages\HumbleBundle.Archvale_
					{'{{HASH}}'}\LocalCache\Roaming\AV_gms2_3
				</Typography>{' '}
				folder and open{' '}
				<Typography component="span" color="badge">
					worldX.json
				</Typography>
			</Typography>
			<Typography />
		</Box>
		<FileInput id="file" label="Select" acceptFileTypes={['.avsv', '.json']} />
		<AutoSubmit />
	</Form>
);

export default FileLoadForm;
