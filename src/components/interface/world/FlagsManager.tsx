import { Box, Typography } from '@mui/material';
import { useField } from 'react-final-form';

import TextInput from 'components/form/TextInput';
import { World } from 'utils/types';

const FlagsManager = () => {
	const {
		input: { value: npst }
	} = useField<World['npst']>('npst', { subscription: { value: true } });
	return (
		<Box
			sx={{
				position: 'absolute',
				top: t => t.spacing(6),
				right: 0,
				transform: 'translateX(100%)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				width: t => t.spacing(30),
				gap: 1,
				p: 2
			}}
		>
			<Typography>Flags:</Typography>
			{Object.entries(npst).map(([key, value]) => (
				<TextInput
					key={key}
					id={`npst.${key}`}
					label={key}
					type="number"
					variant="standard"
				/>
			))}
		</Box>
	);
};

export default FlagsManager;
