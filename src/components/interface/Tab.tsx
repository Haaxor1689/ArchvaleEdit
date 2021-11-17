import { IconButton } from '@mui/material';

import tab from 'assets/tab.png';

type Props = {
	name: string;
	icon: string;
	active: boolean;
	onClick: () => void;
};

const Tab = ({ name, icon, active, onClick }: Props) => (
	<IconButton
		key={name}
		onClick={onClick}
		sx={{
			'display': 'flex',
			'alignItems': 'end',
			'background': `url(${tab})`,
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
		<img src={icon} alt={name} />
	</IconButton>
);

export default Tab;
