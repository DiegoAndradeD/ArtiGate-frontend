import { create } from "zustand";
import { toast } from "react-toastify";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../types/User";
import { userRegistrationFormData } from "../schemas/subscription-schema";
import { LoginFormData } from "../schemas/login-schema";
import UserService from "../services/UserService";
import { setAuthCookies } from "../services/AuthService";

interface UserStore {
  user: User | null;
  token: string | null;
  users: User[];
  selectedUser: User | null;
  loading: boolean;

  fetchUsers: () => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
  createUser: (data: userRegistrationFormData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  loginUser: (data: LoginFormData) => Promise<void>;
  clearSelectedUser: () => void;
  clearUserData: () => void;
}

const handleErrorToast = (action: string, error: unknown) => {
  const message = error instanceof Error ? error.message : "Erro desconhecido";
  toast.error(`Erro ao ${action}: ${message}`);
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      users: [],
      selectedUser: null,
      loading: false,

      fetchUsers: async () => {
        set({ loading: true });
        try {
          const users = await UserService.getAll();
          set({ users });
          toast.success("Usuários carregados com sucesso.");
        } catch (error) {
          handleErrorToast("carregar usuários", error);
        } finally {
          set({ loading: false });
        }
      },

      fetchUserById: async (id: string) => {
        set({ loading: true });
        try {
          const user = await UserService.getById(id);
          set({ selectedUser: user });
          toast.success("Usuário carregado com sucesso.");
        } catch (error) {
          handleErrorToast("carregar usuário", error);
        } finally {
          set({ loading: false });
        }
      },

      createUser: async (data: userRegistrationFormData) => {
        set({ loading: true });
        try {
          await UserService.create(data);
          toast.success("Usuário criado com sucesso.");
        } catch (error) {
          handleErrorToast("criar usuário", error);
        } finally {
          set({ loading: false });
        }
      },

      deleteUser: async (id: string) => {
        set({ loading: true });
        try {
          await UserService.delete(id);
          await useUserStore.getState().fetchUsers();
          toast.success("Usuário deletado com sucesso.");
        } catch (error) {
          handleErrorToast("deletar usuário", error);
        } finally {
          set({ loading: false });
        }
      },

      loginUser: async (data: LoginFormData) => {
        set({ loading: true });
        try {
          const { user, token } = await UserService.login(data);
          console.log("store ", user, token);
          await setAuthCookies(user, token);
          set({ user, token });
          toast.success("Login realizado com sucesso.");
        } catch (error) {
          handleErrorToast("fazer login", error);
        } finally {
          set({ loading: false });
        }
      },

      clearSelectedUser: () => set({ selectedUser: null }),
      clearUserData: () => set({ user: null, token: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
