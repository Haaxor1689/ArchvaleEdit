import { Box, IconButton, ThemeProvider, Tooltip } from '@mui/material';
import { MouseEvent, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { Items } from 'utils/data';
import itemCheatPanel from 'assets/inventory/itemCheatPanel.png';
import theme from 'utils/theme';
import useThemeSpacing from 'utils/useThemeSpacing';
import Sprite from 'components/Sprite';
import allIcon from 'assets/allIcon.png';
import materialIcon from 'assets/materialIcon.png';
import meleeIcon from 'assets/meleeIcon.png';
import rangeIcon from 'assets/rangeIcon.png';
import magicIcon from 'assets/magicIcon.png';
import headIcon from 'assets/headIcon.png';
import bodyIcon from 'assets/bodyIcon.png';
import ringIcon from 'assets/ringIcon.png';
import treasureIcon from 'assets/treasureIcon.png';
import { sortItems } from 'utils/inventoryUtils';
import useShowUnused from 'utils/useShowUnused';
import { getItemFullType } from 'utils';

import ItemSlot from './ItemSlot';

type Props = {
	hideTooltip?: boolean;
	onClick: (item: typeof Items[number], event: MouseEvent) => void;
};

const ItemCheatMenu = ({ hideTooltip, onClick }: Props) => {
	const spacing = useThemeSpacing();
	const [filter, setFilter] = useState<string>();
	const [showUnused] = useShowUnused();
	return (
		<ThemeProvider theme={theme(spacing - 2)}>
			<Box
				sx={{
					'position': 'absolute',
					'left': 0,
					'top': 0,
					'transform': 'translateX(-100%)',
					'backgroundColor': '#262b44',
					'height': t => t.spacing(170),
					'width': t => t.spacing(87),
					'::after': {
						content: '" "',
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						pointerEvents: 'none',
						background: `url(${itemCheatPanel})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
						zIndex: 1
					}
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						top: t => t.spacing(-1),
						transform: 'translateY(-100%)',
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
						gap: 1
					}}
				>
					{(
						[
							[undefined, allIcon],
							['Material', materialIcon],
							['Melee Weapon', meleeIcon],
							['Ranged Weapon', rangeIcon],
							['Magical Weapon', magicIcon],
							['Head Armour', headIcon],
							['Body Armour', bodyIcon],
							['Ring', ringIcon],
							['Treasure', treasureIcon]
						] as const
					).map(([f, img]) => (
						<Tooltip key={f ?? 'All'} title={f ?? 'All'} followCursor>
							<IconButton
								onClick={() => setFilter(f)}
								sx={{
									'backgroundColor': f === filter ? 'primary.main' : undefined,
									'borderRadius': 0,
									'p': 1,
									':hover': {
										backgroundColor: f === filter ? 'primary.main' : undefined
									}
								}}
							>
								<Sprite img={img} width={9} height={9} />
							</IconButton>
						</Tooltip>
					))}
				</Box>
				<Scrollbars style={{ width: '100%', height: '100%' }}>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr 1fr 1fr',
							gap: 1,
							p: 6,
							backgroundColor: '#262b44'
						}}
					>
						{Items.filter(v => v && (showUnused || !v.unused))
							.sort(sortItems)
							.filter(v => !filter || getItemFullType(v).match(filter))
							.map(item => (
								<ItemSlot
									key={item.id}
									hideTooltip={hideTooltip}
									item={{ id: item.id, count: 0, quality: 0 }}
									onClick={e => onClick(item, e)}
								/>
							))}
					</Box>
				</Scrollbars>
			</Box>
		</ThemeProvider>
	);
};

export default ItemCheatMenu;
