import { useCallback, useState } from "react";
interface State<Data, ErrorType> {
    loading: boolean;
    success: boolean;
    error?: ErrorType;
    data?: Data;
  }

export function useRequestState<Data = unknown, ErrorType = unknown>() {
    const [state, setState] = useState<State<Data, ErrorType>>({
        loading: false,
        success: false,
        error: undefined,
        data: undefined,
    });

    const setLoading = useCallback((loading: boolean) => {
        setState({
            loading,
            success: false,
            data: undefined,
            error: undefined,
        });
    }, []);

    const setData = useCallback((data: Data) => {
        setState({
            data,
            success: true,
            loading: false,
            error: undefined,
        });
    }, []);

    const setError = useCallback((error: ErrorType) => {
        setState({
            data: undefined,
            loading: false,
            success: false,
            error,
        });
    }, []);

    return {
        state,
        setState,
        setLoading,
        setData,
        setError,
    };
}
export function useApiRequest<Resp = unknown, Body = void>(
    path: string,
    method = 'POST'
) {
    const {
        setError,
        setLoading,
        setData,
        state
    } = useRequestState<
        Resp,
        string
    >();

    const fn = useCallback(
        async (body: Body) => {
            setLoading(true);

            try {
                const payload = JSON.stringify(body);

                const data: any =
                    await executeFetchRequest<Resp>(path, payload, method);

                setData(data.data);

                if (data.status == false) {
                    setError(data.message);
                }


            } catch (error) {
                const message =
                    error instanceof Error ? error.message : `Unknown error`;

                setError(message);

                return Promise.reject(error);
            }
        },
        [path, method, setLoading, setData, setError]
    );

    return [fn, state] as [typeof fn, typeof state];
}

async function executeFetchRequest<Resp = unknown>(
    url: string,
    payload: string,
    method = 'POST'
) {
    const options: RequestInit = {
        method,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    const methodsSupportingBody
        = ['POST', 'PUT'];

    const supportsBody
        = methodsSupportingBody.includes(method);

    if (payload && supportsBody) {
        options.body = payload;
    }
    console.log(process.env.API_URL);
    try {
        const response = await fetch(process.env.API_URL + "/" + url, options);

        if (response.ok) {
            return (await response.json()) as Promise<Resp>;
        }

        return Promise.reject(response.statusText);
    } catch (e) {
        return Promise.reject(e);
    }
}