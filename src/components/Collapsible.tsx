import { FC, ReactNode, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { SxProps } from '@mui/system';

type Props = {
	title: ReactNode;
	initialExpanded?: boolean;
	sx?: SxProps;
};

const Collapsible: FC<Props> = ({ title, initialExpanded, sx, children }) => {
	const [expanded, setExpanded] = useState(initialExpanded ?? false);
	return (
		<Accordion
			expanded={expanded}
			onChange={(_, e) => setExpanded(e)}
			elevation={0}
			sx={{
				'background': 'none',
				':before': { display: 'none' }
			}}
		>
			<AccordionSummary
				expandIcon={expanded ? '-' : '+'}
				sx={{
					'typography': 'h4',
					'px': 0,
					'& > *': { m: '0 !important' }
				}}
			>
				{title}
			</AccordionSummary>
			<AccordionDetails sx={sx}>{children}</AccordionDetails>
		</Accordion>
	);
};

export default Collapsible;
