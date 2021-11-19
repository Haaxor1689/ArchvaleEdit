export type World = {
	badges: string;
	badges_equipped: string;
	badge_slots: number;
	inventory: string;
	storage: string;
};

export type InventoryItem = {
	id: number;
	count: number;
	quality: number;
};
