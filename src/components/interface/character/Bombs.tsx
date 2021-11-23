import { useField } from 'react-final-form';
import { IconButton } from '@mui/material';

import IconInput from 'components/form/IconInput';
import Sprite from 'components/Sprite';
import bombLevel from 'assets/character/bombLevel.png';
import MaxAdornment from 'components/MaxAdornment';

const BombDamage = [150, 200, 260, 340, 445, 575, 750, 850];
const MaxLevel = BombDamage.length - 1;

const Bombs = () => {
	const {
		input: { value: level }
	} = useField('player_bomb_level', { subscription: { value: true } });

	const {
		input: { value, onChange }
	} = useField('npst.n50106', { subscription: { value: true } });

	const hasBombs = value === 1;
	const toggleBombs = () => onChange({ target: { value: hasBombs ? 0 : 1 } });

	return (
		<IconInput
			id="player_bomb_level"
			label="Bomb level"
			icon={
				<Sprite
					component={IconButton}
					img={bombLevel}
					width={7}
					height={7}
					onClick={toggleBombs}
					title={!hasBombs ? 'Enable' : 'Disable'}
					sx={{
						filter: !hasBombs ? 'saturate(0)' : undefined
					}}
				/>
			}
			type="number"
			disabled={!hasBombs}
			InputProps={{
				endAdornment: level < MaxLevel ? undefined : <MaxAdornment />
			}}
			inputProps={{
				max: MaxLevel,
				min: 0,
				step: 1,
				required: true
			}}
			hint={
				!hasBombs
					? 'Click bomb icon to enable bombs.'
					: `Bombs will deal ${BombDamage[level]} damage.`
			}
		/>
	);
};

export default Bombs;
