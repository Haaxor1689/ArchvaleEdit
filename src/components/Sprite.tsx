import { Box, BoxProps } from '@mui/material';

type Props = {
	img?: string;
} & BoxProps;

const Sprite = ({ img, sx, ...props }: Props) => (
	<Box
		{...props}
		sx={{
			background: img ? `url(${img})` : undefined,
			backgroundSize: 'contain',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			...sx
		}}
	/>
);

export default Sprite;
