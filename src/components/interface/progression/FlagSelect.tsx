import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography
} from '@mui/material';
import { useField } from 'react-final-form';
import { useState } from 'react';

import TextInput from 'components/form/TextInput';
import WorldStateMeta from 'utils/data/worldStateMeta';

const FlagSelect = () => {
	const {
		input: { value: npst }
	} = useField<Record<string, number>>(`npst`, {
		subscription: { value: true }
	});

	const flags = Object.keys(npst)
		.filter(
			k => !WorldStateMeta.find(m => m.flags.indexOf(k) >= 0) && !k.match(/^n9/)
		)
		.sort();

	const [flag, setFlag] = useState(flags[0]);

	if (flags.length <= 0) return null;

	return (
		<>
			<Typography variant="h4">Unknown flags:</Typography>
			<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
				<FormControl variant="standard" fullWidth size="small">
					<InputLabel id="npst.select">Flag</InputLabel>
					<Select
						labelId="npst.select"
						value={flag}
						onChange={e => setFlag(e.target.value)}
					>
						{flags.map(k => (
							<MenuItem key={k} value={k}>
								{k}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{flag && (
					<TextInput
						id={`npst[${flag}]`}
						type="number"
						variant="standard"
						label="Value"
					/>
				)}
			</Box>
		</>
	);
};

export default FlagSelect;
