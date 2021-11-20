import { Box, Typography } from '@mui/material';

import Sprite from 'components/Sprite';
import panel from 'assets/character/panel.png';
import cost from 'assets/stats/cost.png';
import bankCoin from 'assets/character/bankCoin.png';
import IconInput from 'components/form/IconInput';

import Health from './Health';
import HealingPotions from './HealingPotions';
import Difficulty from './Difficulty';
import HealingLevel from './HealingLevel';
import BankLevel from './BankLevel';
import Plums from './Plums';
import Stats from './Stats';
import Dashes from './Dashes';
import Bombs from './Bombs';

const CharacterTab = () => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			alignSelf: 'stretch',
			alignItems: 'center',
			gap: 2
		}}
	>
		<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
			<Sprite
				img={panel}
				sx={{
					display: 'flex',
					width: 966,
					height: 738,
					p: 6
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						flexGrow: 1,
						gap: 1
					}}
				>
					<Health />
					<Dashes />
					<HealingPotions />
					<HealingLevel />
					<Plums />

					<IconInput
						id="player_coins"
						label="Coins"
						icon={<Sprite img={cost} width={42} height={30} />}
						type="number"
						inputProps={{
							max: Number.MAX_SAFE_INTEGER,
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
							max: Number.MAX_SAFE_INTEGER,
							min: 0,
							step: 1,
							required: true
						}}
					/>

					<BankLevel />
					<Bombs />
				</Box>
				<Stats />
			</Sprite>
			<Difficulty />
		</Box>
		<Typography variant="caption" textAlign="center">
			You can use right click to lower clickable values like health, potions
			etc.
		</Typography>
	</Box>
);

export default CharacterTab;