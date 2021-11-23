import { Box, IconButton, Typography } from '@mui/material';
import { useField } from 'react-final-form';
import { omit } from 'lodash-es';

import Sprite from 'components/Sprite';
import { WorldStateMeta } from 'utils/data';
import { Room } from 'utils/types';
import { StrokeTextShadow } from 'utils';

const RoomState = ({ type }: Room) => {
	const {
		input: { value, onChange }
	} = useField('npst', { subscription: { value: true } });

	const stateMeta = WorldStateMeta.filter(f => f.types.indexOf(type) >= 0);

	return (
		<Typography variant="caption" color="text.secondary">
			Events and collectibles
			<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
				{stateMeta.map((s, i) => {
					const obtained = s.flags.some(f => value[f] === 1);
					return (
						<IconButton
							key={i}
							onClick={() => {
								onChange({
									target: {
										value: {
											...omit(value, s.flags),
											...s.flags.reduce(
												(obj, f) => ({
													...obj,
													[f]: obtained ? undefined : 1
												}),
												{}
											)
										}
									}
								});
							}}
							sx={{
								display: 'flex',
								alignItems: 'center',
								borderRadius: 0,
								height: t => t.spacing(16)
							}}
						>
							<Sprite
								title={s.name}
								img={s.sprite[0]}
								width={s.sprite[1] / 2}
								height={s.sprite[2] / 2}
								sx={{
									filter: obtained ? 'saturate(0)' : undefined
								}}
							/>
							<Typography
								variant="caption"
								textAlign="center"
								color={obtained ? 'text.secondary' : undefined}
								sx={{
									position: 'absolute',
									bottom: t => t.spacing(1),
									width: '100%',
									textShadow: StrokeTextShadow
								}}
							>
								{s.name}
							</Typography>
						</IconButton>
					);
				})}
			</Box>
		</Typography>
	);
};

export default RoomState;
