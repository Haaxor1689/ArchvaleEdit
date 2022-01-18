import { IconButton, Tooltip } from '@mui/material';

import sortIcon from 'assets/sortIcon.png';
import Sprite from 'components/Sprite';
import { sortInventoryItems } from 'utils/inventoryUtils';
import { InventoryItem } from 'utils/types';

type Props = {
	items: (InventoryItem | undefined)[];
	onSort: (items: (InventoryItem | undefined)[]) => void;
};

const SortInventoryButton = ({ items, onSort }: Props) => (
	<Tooltip title="Sort" followCursor>
		<IconButton
			onClick={() => onSort(items.sort(sortInventoryItems))}
			sx={{ p: 1 }}
		>
			<Sprite img={sortIcon} />
		</IconButton>
	</Tooltip>
);

export default SortInventoryButton;
