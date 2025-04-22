import { create } from 'zustand';

interface SearchQueryStoreInterface {
    query: string;
    setQuery: (queryProp: string) => void;
}

export const useSearchQueryStore = create<SearchQueryStoreInterface>((set) => ({
    query: "",
    setQuery: (queryProp: string) => {
        set({ query: queryProp});
    },
}));