import { useField } from 'react-final-form';
import { IconButton } from '@mui/material';

import plate from 'assets/world/objects/plate.png';
import lockSilver from 'assets/world/objects/lockSilver.png';
import lockBoss from 'assets/world/objects/lockBoss.png';
import Collapsible from 'components/Collapsible';
import { DungeonRoom } from 'utils/data';
import Sprite from 'components/Sprite';
import { hasBit, pulseAnimation, toggleBit } from 'utils';

import { useMapContext } from '../MapProvider';

const Sprites = {
	plate,
	silver: lockSilver,
	boss: lockBoss
};

const ToggleButton = ({
	onClick,
	img,
	hidden
}: {
	onClick: () => void;
	img: string;
	hidden: boolean;
}) => (
	<IconButton
		onClick={onClick}
		disableRipple
		sx={{
			'position': 'relative',
			'height': t => t.spacing(19),
			'width': t => t.spacing(18),
			'filter': hidden ? 'brightness(0) opacity(0.5)' : undefined,
			':focus-visible,:hover': {
				animation: pulseAnimation
			}
		}}
	>
		<Sprite img={img} />
	</IconButton>
);

const DungeonRoomLocks = ({ locks }: DungeonRoom) => {
	const { map } = useMapContext();

	const {
		input: { value, onChange }
	} = useField<number>(`dungeon_data[${map}].lock_data`, {
		subscription: { value: true }
	});

	return locks?.length ? (
		<Collapsible title="Locks" initialExpanded sx={{ display: 'flex', gap: 4 }}>
			{locks?.map(([id, type]) => (
				<ToggleButton
					key={id}
					onClick={() =>
						onChange({
							target: {
								value: toggleBit(value, id)
							}
						})
					}
					img={Sprites[type]}
					hidden={!hasBit(value, id)}
				/>
			))}
		</Collapsible>
	) : null;
};

export default DungeonRoomLocks;
