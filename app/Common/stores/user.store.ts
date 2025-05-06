import { create } from "zustand";
import { toast } from "react-toastify";
import { UserService } from "../services/UserService";
import type { User } from "../types/User";
import type { userRegistrationFormData } from "../schemas/subscription-schema";

interface UserStore {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
  createUser: (data: userRegistrationFormData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  clearSelectedUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await UserService.getAll();
      set({ users });
      toast.success("Usuários carregados com sucesso!");
    } catch (error: any) {
      set({ error: error.message });
      toast.error(`Erro ao carregar usuários: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  },

  fetchUserById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const user = await UserService.getById(id);
      set({ selectedUser: user });
      toast.success("Usuário carregado com sucesso!");
    } catch (error: any) {
      set({ error: error.message });
      toast.error(`Erro ao carregar usuário: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  },

  createUser: async (data: userRegistrationFormData) => {
    set({ loading: true, error: null });
    try {
      await UserService.create(data);
      toast.success("Usuário criado com sucesso!");
    } catch (error: any) {
      set({ error: error.message });
      toast.error(`Erro ao criar usuário: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await UserService.delete(id);
      await useUserStore.getState().fetchUsers();
      toast.success("Usuário deletado com sucesso!");
    } catch (error: any) {
      set({ error: error.message });
      toast.error(`Erro ao deletar usuário: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  },

  clearSelectedUser: () => set({ selectedUser: null }),
}));
