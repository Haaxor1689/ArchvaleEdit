import { useField } from 'react-final-form';
import { IconButton } from '@mui/material';

import Collapsible from 'components/Collapsible';
import { DungeonRoom } from 'utils/data';
import ItemSlot from 'components/interface/inventory/ItemSlot';
import Sprite from 'components/Sprite';
import { hasBit, pulseAnimation, toggleBit } from 'utils';
import keyBoss from 'assets/world/keyBoss.png';
import keySilver from 'assets/world/keySilver.png';
import damageBlessing from 'assets/world/damageBlessing.png';

import { useMapContext } from '../MapProvider';

const ToggleButton = ({
	onClick,
	sprite,
	hidden
}: {
	onClick: () => void;
	sprite: { img: string; width: number; height: number };
	hidden: boolean;
}) => (
	<IconButton
		onClick={onClick}
		disableRipple
		sx={{
			'position': 'relative',
			'height': t => t.spacing(19),
			'width': t => t.spacing(18),
			'borderRadius': 0,
			':focus-visible,:hover': {
				animation: pulseAnimation
			}
		}}
	>
		<Sprite
			{...sprite}
			flexShrink={0}
			zIndex={1}
			sx={hidden ? { filter: 'brightness(0) opacity(0.5)' } : undefined}
		/>
	</IconButton>
);

const DungeonRoomLoot = ({ keys, loot }: DungeonRoom) => {
	const { map } = useMapContext();

	const {
		input: { value: lootData, onChange: onLootChange }
	} = useField<number>(`dungeon_data[${map}].loot`, {
		subscription: { value: true }
	});

	const {
		input: { value: keyData, onChange: onKeysChange }
	} = useField<number>(`dungeon_data[${map}].key_data`, {
		subscription: { value: true }
	});

	return loot?.length || keys?.length ? (
		<Collapsible title="Loot" initialExpanded sx={{ display: 'flex', gap: 4 }}>
			{loot?.map(([id, item]) =>
				item === -1 ? (
					<ToggleButton
						key={id}
						onClick={() =>
							onLootChange({
								target: {
									value: toggleBit(lootData, id)
								}
							})
						}
						sprite={{ img: damageBlessing, width: 10, height: 10 }}
						hidden={!hasBit(lootData, id)}
					/>
				) : (
					<ItemSlot
						key={id}
						item={{
							id: item,
							count: 1,
							discovered: hasBit(lootData, id)
						}}
						variant="empty"
						onClick={() =>
							onLootChange({
								target: {
									value: toggleBit(lootData, id)
								}
							})
						}
					/>
				)
			)}
			{keys?.map(([id, type]) => (
				<ToggleButton
					key={id}
					onClick={() =>
						onKeysChange({
							target: {
								value: toggleBit(keyData, id)
							}
						})
					}
					sprite={
						type === 'boss'
							? { img: keyBoss, width: 5 * 2, height: 7.5 * 2 }
							: { img: keySilver, width: 4 * 2, height: 6.5 * 2 }
					}
					hidden={!hasBit(keyData, id)}
				/>
			))}
		</Collapsible>
	) : null;
};

export default DungeonRoomLoot;
