import { useState } from 'react';
import { Box } from '@mui/material';

import badgesTab from 'assets/badgesTab.png';
import inventoryTab from 'assets/inventoryTab.png';
import storageTab from 'assets/storageTab.png';
import characterTab from 'assets/characterTab.png';
import worldTab from 'assets/worldTab.png';
import { downloadBlob } from 'utils';
import { World } from 'utils/types';

import Form from './form/Form';
import BadgeTab from './interface/badges/BadgeTab';
import InventoryTab from './interface/inventory/InventoryTab';
import CharacterTab from './interface/character/CharacterTab';
import Tab from './interface/Tab';
import WorldTab from './interface/world/WorldTab';
import Header from './Header';

const tabs = [
	{
		name: 'character',
		icon: characterTab,
		component: <CharacterTab />
	},
	{
		name: 'inventory',
		icon: inventoryTab,
		component: <InventoryTab variant="inventory" />
	},
	{
		name: 'storage',
		icon: storageTab,
		component: <InventoryTab variant="storage" />
	},
	{
		name: 'badges',
		icon: badgesTab,
		component: <BadgeTab />
	},
	{
		name: 'world',
		icon: worldTab,
		component: <WorldTab />
	}
] as const;

type TabName = typeof tabs[number]['name'];

type Props = {
	save: [string, World];
	reset: () => void;
};

const WorldEditForm = ({ save: [name, world], reset }: Props) => {
	const [activeTab, setActiveTab] = useState<TabName>('character');
	const tab = tabs.find(t => t.name === activeTab);
	return (
		<Form
			initialValues={world}
			onSubmit={async values => {
				const json = JSON.stringify(values);
				const base = `data:application/octet-stream;base64,${btoa(btoa(json))}`;
				const blob = await fetch(base).then(r => r.blob());
				downloadBlob(blob, name);
			}}
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 6
			}}
		>
			<Header name={name} reset={reset} />
			<Box
				sx={{
					display: 'flex',
					alignSelf: 'center',
					gap: 2,
					mb: -6,
					overflow: 'hidden'
				}}
			>
				{tabs.map(t => (
					<Tab
						key={t.name}
						{...t}
						active={t.name === activeTab}
						onClick={() => setActiveTab(t.name)}
					/>
				))}
			</Box>
			{tab?.component}
		</Form>
	);
};

export default WorldEditForm;
