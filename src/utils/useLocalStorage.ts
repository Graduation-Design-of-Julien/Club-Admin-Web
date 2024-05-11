interface IUseLocalStorage {
    setLocalStorage: (name: string, data: any) => void;
    getLocalStorage: (name: string) => any;
    removeLocalStorage: (name: string) => any;
}

const useLocalStorage = (): IUseLocalStorage => ({
    setLocalStorage: (name, data) =>
        localStorage.setItem(name, JSON.stringify(data)),
    getLocalStorage: (name) => JSON.parse(localStorage.getItem(name)!),
    removeLocalStorage: (name) => localStorage.removeItem(name),
});

export { useLocalStorage };
