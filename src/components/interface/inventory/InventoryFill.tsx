import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useField } from 'react-final-form';

import { parseToHex, StrokeTextShadow } from 'utils';

const InventoryFill = () => {
	const {
		input: { onChange: onInventoryChange }
	} = useField<string>('storage', { subscription: { value: true } });

	const [index, setIndex] = useState(0);
	return (
		<Box
			sx={{
				position: 'absolute',
				right: 0,
				transform: 'translateX(100%)',
				top: t => t.spacing(7),
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				gap: 2,
				pl: 2
			}}
		>
			<Typography variant="h3" sx={{ textShadow: StrokeTextShadow }}>
				Inventory fill
			</Typography>
			<TextField
				label="Start index"
				type="number"
				value={index}
				onChange={e => setIndex(Number(e.target.value))}
				inputProps={{ min: 0, step: 44 }}
				variant="standard"
				InputProps={{
					endAdornment: (
						<Button
							variant="text"
							size="small"
							onClick={() => {
								onInventoryChange({
									target: {
										value: [...Array(44).keys()]
											.map(i => `${parseToHex(i + index, 4)}010`)
											.join('')
									}
								});
							}}
							sx={{
								textShadow: StrokeTextShadow,
								color: 'primary.main'
							}}
						>
							Fill
						</Button>
					)
				}}
				sx={{ width: 180 }}
			/>
		</Box>
	);
};

export default InventoryFill;
