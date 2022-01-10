import { IconButton } from '@mui/material';

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
			'px': 5,
			'pt': 4,
			'pb': 0,
			'mx': -0.5,
			'borderRadius': 0,
			'transition': 'transform 0.2s',
			'transform': active ? undefined : 'translateY(50%)',
			':hover': {
				filter: 'brightness(1.5)',
				backgroundColor: 'unset'
			},
			'&:nth-of-type(1)': { ml: 0 },
			'&:last-of-type': { mr: 0 }
		}}
	>
		<Sprite img={icon} width={13} height={13} />
	</Sprite>
);

export default Tab;
