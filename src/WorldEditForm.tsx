import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import badgesTab from 'assets/badgesTab.png';
import inventoryTab from 'assets/inventoryTab.png';
import storageTab from 'assets/storageTab.png';
import characterTab from 'assets/characterTab.png';
import collectionTab from 'assets/collectionTab.png';
import progressionTab from 'assets/progressionTab.png';
import worldTab from 'assets/worldTab.png';
import { downloadBlob } from 'utils';
import { World } from 'utils/types';
import { ExperimentalVersionName } from 'utils/useIsExperimental';
import Form from 'components/form/Form';
import BadgeTab from 'components/interface/badges/BadgeTab';
import InventoryTab from 'components/interface/inventory/InventoryTab';
import CollectionTab from 'components/interface/inventory/CollectionTab';
import CharacterTab from 'components/interface/character/CharacterTab';
import ProgressionTab from 'components/interface/progression/ProgressionTab';
import Tab from 'components/interface/Tab';
import WorldTab from 'components/interface/world/WorldTab';
import Header from 'components/Header';
import { PlayerProvider } from 'components/PlayerContext';

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
		name: 'collection',
		icon: collectionTab,
		component: <CollectionTab />
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
	},
	{
		name: 'progression',
		icon: progressionTab,
		component: <ProgressionTab />
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
	useEffect(() => {
		document.title = `${name} | Archvale Save Edit`;
		return () => {
			document.title = 'Archvale Save Edit';
		};
	}, [name]);
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
			<PlayerProvider>
				<Header name={name} reset={reset} />
				<Box
					sx={{
						display: 'flex',
						alignSelf: 'center',
						mb: -6,
						overflow: 'hidden'
					}}
				>
					{tabs
						// Hide collection tab in non experimental save
						.filter(
							t =>
								t.name !== 'collection' ||
								world.version.match(ExperimentalVersionName)
						)
						.map(t => (
							<Tab
								key={t.name}
								{...t}
								active={t.name === activeTab}
								onClick={() => setActiveTab(t.name)}
							/>
						))}
				</Box>
				{tab?.component}
			</PlayerProvider>
		</Form>
	);
};

export default WorldEditForm;
