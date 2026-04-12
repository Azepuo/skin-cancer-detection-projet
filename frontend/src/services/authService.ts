import api, { handleApiError } from "./api";
import type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  ApiResponse,
} from "@/types";

export const authService = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        credentials,
      );
      if (response.data.data) {
        return response.data.data;
      }
      throw new Error("Invalid response format");
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Register a new user
   */
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>(
        "/auth/register",
        data,
      );
      if (response.data.data) {
        return response.data.data;
      }
      throw new Error("Invalid response format");
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Verify current token and get user info
   */
  me: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Logout (typically just clears local state)
   */
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (email: string) => {
    try {
      const response = await api.post("/auth/password-reset-request", {
        email,
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string) => {
    try {
      const response = await api.post("/auth/password-reset", {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
