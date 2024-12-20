import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  authUser: any; // Replace `any` with a specific type for better type safety
  isUpdatingProfile: boolean;
  checkAuth: () => Promise<void>;
  login: (user: any) => void;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      authUser: null,
      isUpdatingProfile: false,

      checkAuth: async () => {
        try {
          const response = await fetch("http://localhost:3001/api/user/checkAuth", {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            set({ authUser: data.user }); // Update the authUser in the state
          } else {
            console.error("Authentication failed or not authorized");
            set({ authUser: null }); // Clear the user on failed auth
          }
        } catch (err) {
          console.error("Error checking authentication:", err);
          set({ authUser: null }); // Clear the user on error
        }
      },

      login: (user) => {
        set({ authUser: user }); // Set the user in the state
      },

      logout: async () => {
        try {
          await fetch("http://localhost:3001/api/user/logout", {
            method: "POST",
            credentials: "include",
          });
          set({ authUser: null }); // Clear the user data after logout
        } catch (err) {
          console.error("Error during logout:", err);
        }
      },

      updateProfile: async (profilepic) => {
        set({ isUpdatingProfile: true }); // Start the updating process
        try {
          const response =  await axios.patch("http://localhost:3001/api/user/update-profile", { profilepic }, {
            withCredentials: true,
          });
          
          set({ authUser: response.data }); // Update the user data
        } catch (err) {
          console.error("Error updating profile:", err);
        } finally {
          set({ isUpdatingProfile: false }); // End the updating process
        }
      },
    }),
    {
      name: "auth-storage", // Name of the localStorage key
      partialize: (state) => ({ authUser: state.authUser }), // Only persist `authUser`
    }
  )
);
