import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useField } from 'react-final-form';

import { Badges } from 'utils/data';
import panel from 'assets/badges/panel.png';
import { parseHexArray, parseHexValue, parseToHex } from 'utils';
import { SpriteBox } from 'components/Sprite';
import { PlayerToggle, usePlayerBadges } from 'components/PlayerContext';

import BadgeSlots from './BadgeSlots';
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
	} = useField<string>(usePlayerBadges(), {
		subscription: { value: true },
		parse: v => v
	});

	const {
		input: { value: slots, onChange: onSlotsChange }
	} = useField<number>('badge_slots', {
		subscription: { value: true }
	});

	const equippedBadges = parseHexArray(equipped, 2, parseHexValue);

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
				value: newEquipped.map(e => parseToHex(e, 2)).join('')
			}
		});
	};

	const changeSlotsAmount = (count: number) =>
		onSlotsChange({
			target: { value: Math.max(badgesCost, count) }
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
			<SpriteBox
				img={panel}
				sx={{
					position: 'relative',
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
					gap: 1,
					px: 6,
					pt: 5,
					pb: 7
				}}
			>
				<PlayerToggle />
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
			</SpriteBox>
			<BadgeSlots
				unlocked={Number(slots)}
				used={badgesCost}
				hover={hoverCost}
				onClick={e => {
					e.button === 2 && e.preventDefault();
					changeSlotsAmount(Number(slots) + (e.button === 2 ? -1 : 1));
				}}
			/>
			<Typography variant="caption" mt={2}>
				Right click to learn badge. Left click to equip badge. Use left/right
				click on badge slot panel to change maximum slots.
			</Typography>
		</Box>
	);
};

export default BadgeTab;
