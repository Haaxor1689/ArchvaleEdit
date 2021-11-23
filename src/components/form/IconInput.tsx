import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

import Sprite from 'components/Sprite';
import questionMark from 'assets/questionMark.png';
import { StrokeTextShadow } from 'utils';

import TextInput, { TextInputProps } from './TextInput';

type Props = {
	icon: ReactNode;
	hint?: string;
} & Omit<TextInputProps, 'variant'>;

const IconInput = ({ icon, hint, ...props }: Props) => (
	<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
		{icon}
		<TextInput
			variant="standard"
			{...props}
			sx={{ width: t => t.spacing(50), ...props.sx }}
		/>
		{hint && (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					maxWidth: t => t.spacing(40),
					gap: 2
				}}
			>
				<Sprite img={questionMark} width={4} height={5} flexShrink={0} />
				<Typography variant="caption" sx={{ textShadow: StrokeTextShadow }}>
					{hint}
				</Typography>
			</Box>
		)}
	</Box>
);

export default IconInput;
