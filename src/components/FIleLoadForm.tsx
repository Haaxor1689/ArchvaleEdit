import { Box, Button, Typography } from '@mui/material';

import Form from 'components/form/Form';
import { World } from 'utils/types';
import { makeBase64File } from 'utils';

import FileInput from './form/FileInput';

type Props = {
	setWorldData: (save: [string, World]) => void;
};

const FileLoadForm = ({ setWorldData }: Props) => (
	<Form
		initialValues={{ file: undefined as File | undefined }}
		onSubmit={async ({ file }) => {
			setWorldData([
				file.name,
				JSON.parse(atob(atob(await makeBase64File(file)))) as World
			]);
		}}
		sx={{ gap: 2, flexGrow: 1 }}
	>
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}
		>
			<Typography variant="h1">Select save file</Typography>
			<Button type="submit" variant="contained" size="large">
				Load
			</Button>
		</Box>
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				flexGrow: 1,
				gap: 10
			}}
		>
			<Typography textAlign="center" variant="body2">
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
			<FileInput id="file" label="File" required acceptFileTypes={['.avsv']} />
		</Box>
	</Form>
);

export default FileLoadForm;
