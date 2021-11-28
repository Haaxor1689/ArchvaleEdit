import { FC } from 'react';
import { IconButton, IconButtonProps, Typography } from '@mui/material';

const TextButton: FC<IconButtonProps> = ({ children, sx, ...props }) => (
	<IconButton
		{...props}
		sx={{
			background: t => `${t.palette.primary.main}66`,
			alignSelf: 'flex-start',
			color: 'text.primary',
			borderRadius: 0,
			...sx
		}}
	>
		<Typography color="text.primary">{children}</Typography>
	</IconButton>
);

export default TextButton;
