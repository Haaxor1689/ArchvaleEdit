import IconInput from 'components/form/IconInput';
import Sprite from 'components/Sprite';
import useShowUnused from 'utils/useShowUnused';
import token from 'assets/world/objects/token.png';

const Runes = () =>
	!useShowUnused()[0] ? null : (
		<IconInput
			id="player_runes"
			label="Runes"
			icon={<Sprite img={token} size={0.5} />}
			type="number"
			inputProps={{
				min: 0,
				step: 1,
				required: true
			}}
			hint="Can be increased by picking up UNUSED Token objects"
		/>
	);

export default Runes;
