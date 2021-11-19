import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useField } from 'react-final-form';

import { Badges } from 'utils/data';
import panel from 'assets/badges/panel.png';
import minus from 'assets/minus.png';
import plus from 'assets/plus.png';
import { parseHexArray } from 'utils';
import Sprite from 'components/Sprite';

import BadgeSlots, { MaxBadgeSlots } from './BadgeSlots';
import Badge from './Badge';

const BadgeTab = () => {
	const {
		input: { value: badges, onChange: onBadgesChange }
	} = useField<string>('badges', {
		subscription: { value: true },
		parse: v => v
	});

	const {
		input: { value: equipped, onChange: onEquippedChange }
	} = useField<string>('badges_equipped', {
		subscription: { value: true },
		parse: v => v
	});

	const {
		input: { value: slots, onChange: onSlotsChange }
	} = useField<number>('badge_slots', {
		subscription: { value: true }
	});

	const equippedBadges = parseHexArray(equipped, 2, v => Number(v));

	const badgesCost = equippedBadges.reduce(
		(sum, i) => sum + (Badges[i]?.slots ?? 0),
		0
	);

	const [badgeHover, setBadgeHover] = useState<number>();
	const hoverCost =
		badgeHover === undefined
			? 0
			: (Badges[badgeHover]?.slots ?? 0) *
			  (equippedBadges.indexOf(badgeHover) >= 0 ? -1 : 1);
	const overflow = Math.max(badgesCost + hoverCost - slots, 0);

	const toggleBadge = (index: number, right: boolean) => {
		onBadgesChange({
			target: {
				value:
					badges.substring(0, index) +
					(badges[index] === '1' && right ? '0' : '1') +
					badges.substring(index + 1)
			}
		});

		const newEquipped = [...equippedBadges];

		const idx = equippedBadges.findIndex(v => v === index);

		if (idx >= 0) {
			newEquipped.splice(idx, 1);
		} else if (!right && !overflow) {
			newEquipped.push(index);
		}

		onEquippedChange({
			target: {
				value: newEquipped.map(e => (e < 10 ? `0${e}` : `${e}`)).join('')
			}
		});
	};

	const changeSlotsAmount = (count: number) =>
		onSlotsChange({
			target: { value: Math.min(MaxBadgeSlots, Math.max(badgesCost, count)) }
		});

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignSelf: 'stretch',
				alignItems: 'center'
			}}
		>
			<Sprite
				img={panel}
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
					gap: 1,
					px: 6,
					pt: 5,
					pb: 7
				}}
			>
				{[...badges].map((unlocked, index) => (
					<Badge
						key={index}
						index={index}
						active={equippedBadges.indexOf(index) >= 0}
						unlocked={unlocked === '1'}
						onClick={e => {
							toggleBadge(index, e.button === 2);
						}}
						setHover={setBadgeHover}
					/>
				))}
			</Sprite>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<IconButton
					onClick={() => changeSlotsAmount(slots - 1)}
					sx={{ width: 60, height: 60 }}
				>
					<Sprite img={minus} width="100%" height="100%" />
				</IconButton>
				<BadgeSlots
					unlocked={Number(slots)}
					used={badgesCost}
					hover={hoverCost}
				/>
				<IconButton
					onClick={() => changeSlotsAmount(slots + 1)}
					sx={{ width: 60, height: 60 }}
				>
					<Sprite img={plus} width="100%" height="100%" />
				</IconButton>
			</Box>
			<Typography variant="caption" mt={2}>
				Right click to learn badge. Left click to equip badge. Use plus/minus to
				unlock badge slots.
			</Typography>
		</Box>
	);
};

export default BadgeTab;
