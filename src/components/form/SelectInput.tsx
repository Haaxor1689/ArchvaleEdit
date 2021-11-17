import {
	Box,
	Checkbox,
	CircularProgress,
	FormControl,
	FormHelperText,
	InputLabel,
	ListItemText,
	ListSubheader,
	MenuItem,
	Select,
	SelectProps
} from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { useField } from 'react-final-form';
import * as Yup from 'yup';
import { isEqual, mapValues } from 'lodash-es';

import makeValidate from 'utils';

const SelectLoadingIcon = () => (
	<Box sx={{ display: 'flex', alignItems: 'center', pr: 1 }}>
		<CircularProgress size={20} color="secondary" />
	</Box>
);

type Props<T extends unknown> = {
	validate: Yup.BaseSchema;
	helperText?: string;
	options: T[];
	groups?: Record<string, T[]>;
	loading?: boolean;
	error?: ReactNode | string;
	multiple?: boolean;
	mapOptions?: (
		selected: T & T[],
		compare: Required<Props<T>>['compareOptions']
	) => (option: T) => ReactNode;
	renderValue?: (value: T & T[]) => ReactNode;
	compareOptions?: (lhs: T, rhs: T) => boolean;
} & Required<Pick<SelectProps, 'id'>> &
	Omit<
		SelectProps,
		| 'labelId'
		| 'input'
		| 'error'
		| 'renderValue'
		| 'multiple'
		| 'placeholder'
		| 'variant'
		| 'size'
	>;

const SelectInput = <T extends unknown>({
	id,
	helperText,
	options,
	groups,
	loading,
	error,
	disabled,
	required,
	multiple,
	renderValue,
	mapOptions,
	validate,
	compareOptions = isEqual,
	...props
}: Props<T>) => {
	const { input, meta } = useField<T & T[]>(id, {
		validate: makeValidate(validate, required),
		subscription: { value: true, error: true, touched: true },
		parse: v => v
	});

	// Fix reference equality problem for comparing options
	const { refOptions, refGroups } = useMemo(
		() => ({
			refOptions: options.map(
				v =>
					(multiple ? input.value : [input.value]).find(i =>
						compareOptions(i, v)
					) ?? v
			),
			refGroups: mapValues(groups ?? {}, opts =>
				opts.map(
					v =>
						(multiple ? input.value : [input.value]).find(i =>
							compareOptions(i, v)
						) ?? v
				)
			)
		}),
		[input.value, options, groups]
	);

	const length =
		options.length +
		Object.values(groups ?? {}).reduce((prev, g) => prev + g.length, 0);

	const renderOptions = (opt: T[]) =>
		opt.map(
			mapOptions?.(input.value, compareOptions) ??
				(o =>
					multiple ? (
						<MenuItem key={o as string} value={o as string}>
							<Checkbox
								checked={
									(input.value as T[]).findIndex(v => compareOptions(v, o)) > -1
								}
							/>
							<ListItemText primary={o as string} />
						</MenuItem>
					) : (
						<MenuItem key={o as string} value={o as string}>
							{o as string}
						</MenuItem>
					))
		);

	return (
		<FormControl
			error={(meta.error && meta.touched) || error}
			required={required}
		>
			<InputLabel id={`${id}-label`}>{props.label}</InputLabel>
			<Select
				id={id}
				{...props}
				{...input}
				multiple={multiple}
				IconComponent={loading ? SelectLoadingIcon : undefined}
				labelId={`${id}-label`}
				renderValue={
					(renderValue as never) ??
					(multiple ? selected => (selected as string[]).join(', ') : undefined)
				}
				disabled={!!meta.submitting || !!loading || disabled}
			>
				{length <= 0 ? (
					<MenuItem disabled value="">
						<em>No options</em>
					</MenuItem>
				) : (
					[
						renderOptions(refOptions),
						Object.entries(refGroups ?? {})
							.filter(e => e[1].length)
							.map(([t, g]) => [
								<ListSubheader key={t}>{t}</ListSubheader>,
								renderOptions(g)
							])
					]
				)}
				{/* Values missing from options */}
				{(multiple ? input.value : [input.value])
					.filter(v => !refOptions.find(o => isEqual(o, v)))
					.map(o => (
						<option key={o as string} value={o as string} hidden />
					))}
			</Select>
			{((meta.error && meta.touched) || error || helperText) && (
				<FormHelperText>
					{meta.error && meta.touched ? meta.error : error ? error : helperText}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default SelectInput;
