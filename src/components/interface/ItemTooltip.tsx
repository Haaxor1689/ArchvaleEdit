import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

type Props = Pick<TooltipProps, 'children' | 'title'>;

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))({
	[`& .${tooltipClasses.tooltip}`]: {
		maxWidth: 800,
		background: 'rgba(0,0,0,0.75)',
		display: 'flex',
		flexDirection: 'column',
		gap: 4
	}
});

const ItemTooltip = ({ title, children }: Props) => (
	<CustomTooltip title={title} followCursor placement="bottom-start">
		{children}
	</CustomTooltip>
);

export default ItemTooltip;
