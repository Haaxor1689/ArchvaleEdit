import { capitalize, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useField } from 'react-final-form';
import { MouseEventHandler } from 'react';

import Sprite from 'components/Sprite';
import { StatsMetadata } from 'utils/data';
import { StrokeTextShadow } from 'utils';

const Indexes = [
	undefined,
	undefined,
	'def',
	'spd',
	'all_dmg',
	'melee_dmg',
	'range_dmg',
	'magic_dmg',
	'atk_spd',
	undefined
];

const Stats = () => {
	const {
		input: { value: stats, onChange }
	} = useField<number[]>('player_stats', { subscription: { value: true } });

	const setStat = (index: number, delta: number) => {
		const newStats = [...stats];
		newStats[index] = stats[index] + delta;
		onChange({ target: { value: newStats } });
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-end'
			}}
		>
			<Typography color="text.secondary">Stats</Typography>
			{Indexes.map((attr, i) => {
				const meta = StatsMetadata[attr as never];
				const value = stats[i];
				const onClick: MouseEventHandler = e => {
					e.button === 2 && e.preventDefault();
					setStat(i, e.button === 2 ? -1 : 1);
				};
				return !attr || !meta ? null : (
					<IconButton
						onClick={onClick}
						onContextMenu={onClick}
						title={meta.title ?? capitalize(attr)}
						sx={{
							display: 'flex',
							alignItems: 'center',
							borderRadius: 0,
							gap: 1
						}}
					>
						<Typography
							color={
								value === 0 || !meta.getValue
									? undefined
									: value > 0
									? 'success.main'
									: 'error.main'
							}
							sx={{ textShadow: StrokeTextShadow }}
						>
							{meta.getValue?.(Number(value)) ?? value}
						</Typography>
						<Sprite img={meta.icon} width={32} height={32} />
					</IconButton>
				);
			})}
		</Box>
	);
};

export default Stats;
