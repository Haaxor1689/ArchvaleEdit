import { Box, Typography } from '@mui/material';

import Form from 'components/form/Form';
import { World } from 'utils/types';
import { makeBase64File, StrokeTextShadow } from 'utils';
import logo from 'assets/logo.png';

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
			gap: 10
		}}
	>
		<Sprite
			img={logo}
			height={56}
			sx={{ aspectRatio: '2/1', imageRendering: 'initial' }}
		/>
		<Typography
			variant="h1"
			mt={-16}
			mb={6}
			textAlign="center"
			color="primary.main"
			sx={{ textShadow: StrokeTextShadow }}
		>
			Save Editor
		</Typography>
		<Typography textAlign="center" variant="body2" mb={-4}>
			Open a{' '}
			<Box component="span" fontWeight="bold" sx={{ color: 'badge' }}>
				&quot;.avsv&quot;
			</Box>{' '}
			save file from{' '}
			<Box component="span" fontWeight="bold" sx={{ color: 'badge' }}>
				&quot;%AppData%\AV_gms2_3&quot;
			</Box>{' '}
			folder.
		</Typography>
		<FileInput id="file" label="File" acceptFileTypes={['.avsv']} />
		<AutoSubmit />
	</Form>
);

export default FileLoadForm;
