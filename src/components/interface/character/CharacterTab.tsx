import { Box } from '@mui/material';

import Sprite from 'components/Sprite';
import panel from 'assets/character/panel.png';
import cost from 'assets/stats/cost.png';
import bankCoin from 'assets/character/bankCoin.png';
import bombLevel from 'assets/character/bombLevel.png';
import IconInput from 'components/form/IconInput';

import Health from './Health';
import HealingPotions from './HealingPotions';
import Difficulty from './Difficulty';
import HealingLevel from './HealingLevel';
import BankLevel from './BankLevel';
import Plums from './Plums';

const CharacterTab = () => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			alignSelf: 'stretch',
			alignItems: 'center'
		}}
	>
		<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
			<Sprite
				img={panel}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					width: 966,
					height: 696,
					gap: 1,
					p: 6
				}}
			>
				<Health />
				<HealingPotions />
				<HealingLevel />
				<Plums />

				<IconInput
					id="player_coins"
					label="Coins"
					icon={<Sprite img={cost} width={42} height={30} />}
					type="number"
					inputProps={{
						max: 2147483648,
						min: 0,
						step: 1,
						required: true
					}}
				/>

				<IconInput
					id="player_coins_banked"
					label="Banked coins"
					icon={<Sprite img={bankCoin} width={42} height={39} />}
					type="number"
					inputProps={{
						max: 2147483648,
						min: 0,
						step: 1,
						required: true
					}}
				/>

				<BankLevel />

				<IconInput
					id="player_bomb_level"
					label="Bomb level"
					icon={<Sprite img={bombLevel} width={42} height={39} />}
					type="number"
					inputProps={{
						min: 0,
						step: 1,
						required: true
					}}
				/>
			</Sprite>
			<Difficulty />
		</Box>
	</Box>
);

export default CharacterTab;
