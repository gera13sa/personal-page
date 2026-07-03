/* eslint-disable */
import {useState, useCallback} from 'react';

type ApiFunction<TArgs extends any[], TResult> = (...args: TArgs) => Promise<TResult>;

export function useApi<TArgs extends any[], TResult>(apiFn: ApiFunction<TArgs, TResult>) {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<TResult | null>(null);
	const [error, setError] = useState<any>(null);

	const call = useCallback(async (...args: TArgs): Promise<TResult | null> => {
		setLoading(true);
		setError(null);
		try {
			const result = await apiFn(...args);
			const finalData = (result && typeof result === 'object' && 'data' in result)
				? (result as any).data
				: result;
			setData(finalData);
			return result;
		} catch (err) {
			setError(err);
			return null;
		} finally {
			setLoading(false);
		}
	}, [apiFn]);

	return {loading, data, error, call};
}
