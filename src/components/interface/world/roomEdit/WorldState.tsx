import { IconButton, Typography } from '@mui/material';
import { useField } from 'react-final-form';
import { omit } from 'lodash-es';

import Sprite from 'components/Sprite';
import { pulseAnimation, StrokeTextShadow } from 'utils';
import Collapsible from 'components/Collapsible';
import { StateMeta } from 'utils/data/worldStateMeta';

type Props = {
	stateMetaItems: StateMeta[];
	initialExpanded?: boolean;
	columns?: number;
};

const WorldState = ({
	stateMetaItems,
	initialExpanded,
	columns = 2
}: Props) => {
	const {
		input: { value, onChange }
	} = useField('npst', { subscription: { value: true } });

	if (stateMetaItems.length <= 0) return null;

	return (
		<Collapsible
			initialExpanded={initialExpanded}
			title="Events and collectibles"
			sx={{
				display: 'grid',
				gridTemplateColumns: [...Array(columns).keys()]
					.map(() => 'minmax(0, 1fr)')
					.join(' '),
				gap: 1
			}}
		>
			{stateMetaItems.map((s, i) => {
				const obtained = s.flags.some(f => value[f] === (s.value ?? 1));

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
												[f]: obtained ? undefined : s.value ?? 1
											}),
											{}
										)
									}
								}
							});
						}}
						sx={{
							'position': 'relative',
							'display': 'flex',
							'alignItems': 'center',
							'justifyContent': 'center',
							'height': t => t.spacing(20),
							':focus-visible,:hover': {
								animation: pulseAnimation
							}
						}}
					>
						<Sprite
							title={s.name}
							img={s.sprite}
							size={0.5}
							sx={{
								filter: !obtained ? 'saturate(0)' : undefined,
								opacity: !obtained ? 0.5 : undefined
							}}
						/>
						{s.secondarySprite && (
							<Sprite
								img={s.secondarySprite}
								width={5}
								sx={{
									position: 'absolute',
									top: t => t.spacing(1),
									right: t => t.spacing(1),
									filter: !obtained ? 'saturate(0)' : undefined
								}}
							/>
						)}
						<Typography
							variant="caption"
							textAlign="center"
							color={!obtained ? 'text.secondary' : undefined}
							sx={{
								position: 'absolute',
								bottom: t => t.spacing(1),
								width: '100%',
								textShadow: StrokeTextShadow
							}}
						>
							{s.shortName ?? s.name}
						</Typography>
					</IconButton>
				);
			})}
		</Collapsible>
	);
};

export default WorldState;
