import * as Yup from 'yup';

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
