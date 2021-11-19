import { Box, IconButton } from '@mui/material';

import tab from 'assets/tab.png';
import Sprite from 'components/Sprite';

type Props = {
	name: string;
	icon: string;
	active: boolean;
	onClick: () => void;
};

const Tab = ({ name, icon, active, onClick }: Props) => (
	<Sprite
		component={IconButton}
		key={name}
		img={tab}
		onClick={onClick}
		sx={{
			'display': 'flex',
			'alignItems': 'end',
			'px': 5.5,
			'pt': 4,
			'pb': 0,
			'borderRadius': 0,
			'transition': 'transform 0.2s',
			'transform': active ? undefined : 'translateY(50%)',
			':hover': {
				filter: 'brightness(1.5)',
				backgroundColor: 'unset'
			}
		}}
	>
		<Sprite img={icon} width={78} height={78} />
	</Sprite>
);

export default Tab;
