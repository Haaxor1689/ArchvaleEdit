import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useField } from 'react-final-form';
import { useState } from 'react';

import TextInput from 'components/form/TextInput';

const FlagSelect = () => {
	const {
		input: { value: npst }
	} = useField<Record<string, number>>(`npst`, {
		subscription: { value: true }
	});

	const [flag, setFlag] = useState(Object.keys(npst)[0]);

	return (
		<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
			<FormControl variant="standard" fullWidth size="small">
				<InputLabel id="npst.select">Flag</InputLabel>
				<Select
					labelId="npst.select"
					value={flag}
					onChange={e => setFlag(e.target.value)}
				>
					{Object.keys(npst).map(k => (
						<MenuItem key={k} value={k}>
							{k}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{flag && (
				<TextInput id={`npst[${flag}]`} variant="standard" label="Value" />
			)}
		</Box>
	);
};

export default FlagSelect;
