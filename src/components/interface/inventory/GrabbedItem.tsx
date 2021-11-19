import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import { InventoryItem } from 'utils/types';

import ItemSlot from './ItemSlot';

type Props = Pick<TooltipProps, 'children'> & {
	item?: InventoryItem;
};

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))({
	[`& .${tooltipClasses.tooltip}`]: {
		background: 'rgba(0,0,0,0)'
	}
});

const GrabbedItem = ({ item, children }: Props) => (
	<CustomTooltip
		title={item ? <ItemSlot item={item} variant="empty" /> : ''}
		followCursor
		placement="bottom-start"
	>
		{children}
	</CustomTooltip>
);

export default GrabbedItem;
