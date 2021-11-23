import { Box, BoxProps } from '@mui/material';

type Props = {
	img?: string;
	width?: number | string;
	height?: number | string;
} & BoxProps;

const Sprite = ({ img, width, height, sx, ...props }: Props) => (
	<Box
		{...props}
		width={typeof width === 'number' ? t => t.spacing(width) : width}
		height={typeof height === 'number' ? t => t.spacing(height) : height}
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
