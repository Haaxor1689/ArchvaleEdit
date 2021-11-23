import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(p => ({
	[`& .${tooltipClasses.tooltip}`]: {
		maxWidth: p.theme.spacing(90),
		background: 'rgba(0,0,0,0.75)',
		display: 'flex',
		flexDirection: 'column',
		gap: 4
	}
}));

const ItemTooltip = ({
	title,
	children,
	followCursor = true,
	placement = 'bottom-start',
	...props
}: TooltipProps) => (
	<CustomTooltip
		title={title}
		followCursor={followCursor}
		placement={placement}
		{...props}
	>
		{children}
	</CustomTooltip>
);

export default ItemTooltip;
