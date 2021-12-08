import { useEffect, useState } from 'react';
import * as storage from 'store';
import eventsPlugin from 'store/plugins/events';

type StoreJsAPI = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	watch(key: string, callback: (value: any) => void): string;
	unwatch(watchId: string): void;
} & typeof storage;

// Add events plugin
storage.addPlugin(eventsPlugin);

const useLocalStorage = <T extends unknown>(key: string, defaultValue?: T) => {
	const [value, setValue] = useState<T | undefined>(
		storage.get(key, defaultValue)
	);
	useEffect(() => {
		const watchId = (storage as StoreJsAPI).watch(key, setValue);
		return () => {
			(storage as StoreJsAPI).unwatch(watchId);
		};
	}, [key]);
	return [value, (newVal?: T) => storage.set(key, newVal)] as const;
};

export default useLocalStorage;
