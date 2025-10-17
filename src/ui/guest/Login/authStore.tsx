import React from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
// import { handleResponse } from "../../utills/common";
import apiCall from "@/utils/apiCall";
import { handleResponse } from "@/utils/common";
import toast from "@/utils/toast";
import { Cookies } from "react-cookie";
import SecureStorage from "@/utils/SecureStorage";
import { getSession } from "next-auth/react";
// import { useApiLoadingStore } from "../../common/components/ApiLoading/ApiLoadingStore";


export const useAuthStore = create(
    persist((set) => ({
        isDoneIntro: false,
        _hasHydrated: false,
        setHasHydrated: (state: any) => {
            set({
                _hasHydrated: state
            });
        },
        doneIntro: () => {
            set({ isDoneIntro: true })
        },
        user: {},
        isLoggedIn: false,
        setUser: (user: any) => {
            set((state: any) => ({ ...state, user, isLoggedIn: true }))
        },
        login: async (callback: any) => {
            // apiCall('user/login', data, {
            var state = await getSession({
                // req: false
            });

            const user: any = state?.user;
            if (user) {
                set((state: any) => ({ ...state, user, isLoggedIn: true }))
                callback.success()
            } else {
                set((state: any) => ({ ...state, user: {}, isLoggedIn: false }))
            }
        },
        logout: () => {
            set((state: any) => ({
                ...state,
                user: {},
                isLoggedIn: false,                
                admin: {},
                isAdminLoggedIn: false
            }))
            let cookies = new Cookies();            
            cookies.remove('admin-auth');
            SecureStorage.clear();
        },       
        admin: {},
        isAdminLoggedIn: false,
        loginAdmin: (data: any, callback: any) => {
            apiCall('admin/admin-login', data, {
                showLoader: true
            }).then((response) => {
                let responseData = handleResponse(response);
                if (responseData) {
                    if (responseData.status == true) {
                        set((state: any) => ({ ...state, admin: responseData.data, isAdminLoggedIn: true }));
                        toast({ message: responseData.message, status: 'success' });
                        let cookies = new Cookies();
                        let token = Math.random().toString(32).substring(2, 32)
                        cookies.set('admin-auth', token);
                        callback?.success();
                    } else {
                        callback?.error(responseData);
                        toast({ message: responseData.message });
                    }
                }
            });
        },
        logoutAdmin: async () => {
            set((state: any) => ({ ...state, admin: {}, isAdminLoggedIn: false }))
        }
    }), {
        name: "auth-store",
        storage: createJSONStorage(() => SecureStorage),
        onRehydrateStorage: (state) => {
            console.log('hydration starts')

            // optional
            return (state, error) => {
                if (error) {
                    console.log('an error happened during hydration', error)
                } else {
                    state.setHasHydrated(true)
                    console.log('hydration finished')
                }
            }
        },
    })
);

