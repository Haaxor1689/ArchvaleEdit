import * as Yup from 'yup';

import { Item, Items } from './data';
import { MaxStackSize } from './inventoryUtils';
import { InventoryItem } from './types';

export const makeBase64File = (file: File) =>
	new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () =>
			resolve((reader.result as string).match(/;base64,(.*)/)?.[1] ?? '');
		reader.onerror = error => reject(error);
	});

export const downloadBlob = (blob: Blob, title: string) => {
	const url = window.URL.createObjectURL(blob);
	const link = document.createElement('a');

	link.href = url;
	link.download = title;

	link.click();
};

export const validateStringAsNull = (value: unknown, originalValue: unknown) =>
	String(originalValue).trim() === '' ? null : value;

export const makeValidate =
	(schema: Yup.BaseSchema, required?: boolean) => (value: unknown) =>
		(required ? schema.required() : schema.nullable())
			.validate(value)
			.then(() => undefined)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.catch((err: any) => err.errors);

export const pad = (val: string, digits: number) =>
	([...Array(digits).keys()].map(() => '0').join('') + val).slice(-digits);

export const parseToHex = (val: number, digits: number) =>
	pad(val.toString(16), digits).toUpperCase();

export const parseHexValue = (val: string) => parseInt(`0x${val}`);

export const parseHexArray = <T extends unknown>(
	arr: string,
	length: number,
	parse: (item: string) => T
) =>
	[...Array(arr.length / length).keys()]
		.map(k => k * length)
		.map(k => arr.slice(k, k + length))
		.map(parse);

export const StrokeTextShadow = `
    -1px -1px 0 #000,  
     1px -1px 0 #000,
    -1px  1px 0 #000,
		 1px  1px 0 #000,
		 1px  3px 0 #000,
		 3px  2px 0 #000`;

const isSame = (item: Item, other?: Pick<Item, 'id'>) =>
	!other || item.id === other.id;

export const isStackable = (item: Item, other?: Pick<Item, 'id'>) =>
	item?.type === 'Material' && isSame(item, other);

export const stackItem = (
	item: InventoryItem,
	delta: number,
	other?: Pick<Item, 'id'>
) =>
	isStackable(Items[item.id], other)
		? {
				...item,
				count: Math.max(1, Math.min(MaxStackSize, item.count + delta))
		  }
		: item;

export const isUpgradeable = (item: Item, other?: Pick<Item, 'id'>) =>
	item?.type === 'Weapon' && isSame(item, other);

export const upgradeItem = (
	item: InventoryItem,
	delta: number,
	other?: Pick<Item, 'id'>
) =>
	isUpgradeable(Items[item.id], other)
		? { ...item, quality: Math.max(0, Math.min(5, item.quality + delta)) }
		: item;

export const secondsToPlaytime = (value: number) => {
	const seconds = value % 60;
	const minutes = ((value - seconds) / 60) % 60;
	const hours = (((value - seconds) / 60 - minutes) / 60) % 60;
	return `${hours ? `${hours}h ` : ''}${
		hours || minutes ? `${minutes}m ` : ''
	}${seconds.toFixed(1)}s`;
};

export const getItemFullType = ({
	type,
	subtype,
	category
}: Pick<Item, 'type' | 'subtype' | 'category'>) =>
	[
		subtype,
		subtype === 'Ring' ? undefined : type,
		category ? `(${category})` : undefined
	]
		.filter(v => v)
		.join(' ');
