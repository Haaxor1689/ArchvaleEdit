import { Box, BoxProps, useTheme } from '@mui/material';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

type Props = {
	img?: string;
	width?: number;
	height?: number;
	size?: number;
} & Omit<BoxProps, 'children' | 'width' | 'height'>;

const Sprite = ({ img, width, height, size = 1, sx, ...props }: Props) => {
	const theme = useTheme();
	const spacing = Number(theme.spacing(1).match(/(\d+)/)?.[1] ?? 1);

	const imgRef = useRef<HTMLImageElement>();

	const [loaded, setLoaded] = useState(false);
	const [bounds, setBounds] = useState<[number, number]>();

	const w = width || height ? width : bounds?.[0];
	const h = width || height ? height : bounds?.[1];

	const onLoad = () => {
		if (loaded) return;
		setLoaded(true);
		setBounds([
			imgRef.current?.clientWidth ?? 0,
			imgRef.current?.clientHeight ?? 0
		]);
	};

	useEffect(() => setLoaded(false), [img]);

	return !img ? null : (
		<Box
			ref={imgRef}
			component="img"
			src={img}
			{...props}
			style={
				loaded
					? {
							width: w ? w * spacing * size : undefined,
							height: h ? h * spacing * size : undefined
					  }
					: undefined
			}
			onLoad={onLoad}
			sx={{
				...sx,
				visibility: bounds ? 'visible' : 'hidden',
				objectFit: 'contain'
			}}
		/>
	);
};

export const SpriteBox = ({
	img,
	width,
	height,
	sx,
	...props
}: PropsWithChildren<Props>) => (
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
