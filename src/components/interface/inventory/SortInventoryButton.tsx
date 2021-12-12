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
			sx={{ borderRadius: 0, p: 1 }}
		>
			<Sprite img={sortIcon} width={15} height={15} />
		</IconButton>
	</Tooltip>
);

export default SortInventoryButton;
