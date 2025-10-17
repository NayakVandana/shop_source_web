import axios from "axios";
import { useApiLoadingStore } from "@/components/ApiLoading/ApiLoadingStore";
import { useAuthStore } from "@/ui/guest/Login/authStore";
import { getSession, signOut, useSession } from "next-auth/react";
import SecureStorage from "./SecureStorage";

const instance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 120000,  // Set your preferred timeout
});

const instanceNextAuth = axios.create({
    baseURL: process.env.NEXTAUTH_URL,
    timeout: 10000, // Set your preferred timeout
});

// Cache to store pending requests
const pendingRequests: { [key: string]: Promise<any> } = {};

// get Auth token
const getAuthToken = async () => {
    try {
        // with local storage
        // var userSession: any = {
        //     value: "",
        //     lastFetch: null
        // };

        // var state: any = SecureStorage.getItem("userSession");

        // if (state) {
        //     userSession = JSON.parse(state);
        // }

        // // get token from session if it exists get new session next 1 minute
        // if (state && userSession.lastFetch && (Date.now() - userSession.lastFetch) < 60000) {
        //     state = userSession.value;
        // } else {
        // var state = await getSession({
        //     // req: false
        // });
        //     userSession = {
        //         value: state,
        //         lastFetch: new Date().getTime()
        //     }
        //     SecureStorage.setItem("userSession", JSON.stringify(userSession));
        // }

        const state = useAuthStore.getState();
        const user: any = state?.user;
        // const isLoggedIn = state?.isLoggedIn;

        console.log("access token", user?.access_token);

        if (user) {
            return `Bearer ${user.access_token}`;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}



const getAdminToken = () => {
    try {
        const state: any = useAuthStore.getState();
        const admin = state?.admin;
        const isLoggedIn = state?.isAdminLoggedIn;
        console.log("admin")
        console.log(isLoggedIn)
        // console.log(isLoggedIn, "isLoggedIn");
        if (isLoggedIn) {
            return `${admin.access_token}`;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Helper function to handle unauthorized responses
const handleUnauthorized = async () => {
    await signOut({
        callbackUrl: `/login`,
    });
    const authstate: any = useAuthStore.getState();
    authstate.logout();
};

// Helper function to extract error messages
const extractErrorMessage = (error: any): string => {
    if (error?.response?.data?.message) {
        return error.response.data.message;
    } else if (error?.response?.statusText) {
        return error.response.statusText;
    } else if (error?.message) {
        return error.message;
    }
    return 'An error occurred.';
};

// Common API function with request deduplication
const apiCall = async (endpoint: string, data: any = null, headers: any = {}) => {
    // Create a unique key for this request
    // Clone headers to avoid modifying the original object
    const headersCopy = { ...headers };
    // Create a key that doesn't include showLoader since that doesn't affect the actual request
    const requestKey = `${endpoint}-${JSON.stringify(data)}-${JSON.stringify(
        Object.keys(headersCopy)
            .filter(key => !['showLoader'].includes(key))
            .reduce((obj: any, key) => {
                obj[key] = headersCopy[key];
                return obj;
            }, {})
    )}`;

    // If this exact request is already in progress, return the existing promise
    if (pendingRequests[requestKey]) {
        console.log(`Duplicate request prevented: ${endpoint}`);
        return pendingRequests[requestKey];
    }

    const apiCallPromise = (async () => {
        var token;       
        var adminToken;

        if (headers.notoken) {
            // No tokens needed
        } else {
            token = await getAuthToken();          
            adminToken = await getAdminToken();
        }

        const { showLoader, hideLoader }: any = useApiLoadingStore.getState();

        const config = {
            headers: {
                'Authorization': token,                
                'AdminToken': adminToken,
                ...headers
            }
        };

        let method = 'post';
        try {
            // console.log("payload", data);
            // console.log("endpoint", endpoint);
            if (headers.showLoader) {
                showLoader();
                headers.showLoader = undefined;
            }

            if (headers.method && headers.method === "GET") {
                method = 'get';
                // headers.method = undefined;
            }

            // console.log(config);
            var response;
            if (headers.nextAuth) {
                headers.nextAuth = undefined;
                response = await instanceNextAuth.post(endpoint, data, config);
            } else {
                headers.nextAuth = undefined;
                if (method === 'get') {
                    response = await instance.get(endpoint, config);
                } else {
                    response = await instance.post(endpoint, data, config);
                }
            }

            hideLoader();
            if (headers.responseType === "blob") {
                return response;
            }

            // if user is unauthenticated logged out them
            if (response?.data?.message == "Unauthorized") {
                await handleUnauthorized();
            }

            return { success: true, data: response.data };
        } catch (error: any) {
            hideLoader();
            const errorMessage = extractErrorMessage(error);

            // if user is unauthenticated logged out them
            if (errorMessage == "Unauthorized") {
                await handleUnauthorized();
            }
            console.log(error);
            return { success: false, error: errorMessage };
        } finally {
            // Remove from pending requests once completed
            delete pendingRequests[requestKey];
        }
    })();

    // Store the promise in the cache
    pendingRequests[requestKey] = apiCallPromise;

    return apiCallPromise;
};

export default apiCall;
