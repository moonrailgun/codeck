import create from 'zustand';

interface RegistryState {
  inited: boolean;
}

export const useRegistryStore = create<RegistryState>()((set, get) => ({
  inited: false,
}));
