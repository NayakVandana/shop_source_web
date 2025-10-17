import secureLocalStorage from "react-secure-storage";
const storage = secureLocalStorage;
const SecureStorage: any = {
    setItem: (name: string, value: string) => typeof window !== 'undefined' ? storage.setItem(name, value) : null,
    getItem: (name: string) => typeof window !== 'undefined' ? storage.getItem(name) ?? null : null,
    removeItem: (name: string) => storage.removeItem(name),
    clear: () => storage.clear(),
};

export default SecureStorage