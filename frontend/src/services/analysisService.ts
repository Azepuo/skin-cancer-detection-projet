import api, { handleApiError } from "./api";
import { useAuthStore } from "@/store/authStore";
import type { AnalysisResult, AnalysisHistoryItem, ApiResponse } from "@/types";

export const analysisService = {
  /**
   * Upload image and start analysis
   */
  uploadImage: async (file: File): Promise<AnalysisResult> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post<any>("/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      const user = useAuthStore.getState().user;

      // Map backend response to frontend AnalysisResult structure
      const result: AnalysisResult = {
        id: Math.random().toString(36).substring(7),
        userId: user?.id || "guest",
        imageUrl: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
        analysis: {
          condition: data.prediction,
          severity: "moderate", // Default severity as backend doesn't provide it yet
          confidence: data.confidence,
          recommendations: [
            "Consult a dermatologist for a professional evaluation.",
            "Monitor the area for any changes in size, shape, or color.",
            "Avoid excessive sun exposure and use high-SPF sunscreen.",
          ],
          description: data.description || "No detailed description provided.",
        },
        status: "completed",
      };

      return result;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Get analysis result by ID
   */
  getAnalysis: async (id: string): Promise<AnalysisResult> => {
    try {
      const response = await api.get<ApiResponse<any>>(`/analysis/${id}`);
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        const baseURL = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

        return {
          id: data.id.toString(),
          userId: data.user_id.toString(),
          imageUrl: `${baseURL}/api/uploads/${data.image_path}`,
          uploadedAt: data.created_at,
          analysis: {
            condition: data.prediction,
            severity: "moderate",
            confidence: data.confidence,
            recommendations: [
              "Consult a dermatologist for a professional evaluation.",
              "Monitor the area for any changes in size, shape, or color.",
              "Avoid excessive sun exposure and use high-SPF sunscreen.",
            ],
            description: "No detailed description provided.",
          },
          status: "completed",
        };
      }
      throw new Error("Invalid response format");
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Get analysis history for current user
   */
  getHistory: async (
    limit = 20,
    offset = 0,
  ): Promise<AnalysisHistoryItem[]> => {
    try {
      const response = await api.get<ApiResponse<any[]>>(
        `/analysis/history?limit=${limit}&offset=${offset}`,
      );
      if (response.data.success && response.data.data) {
        const baseURL = import.meta.env.VITE_API_BASE_URL.replace("/api", "");
        return response.data.data.map((item) => ({
          id: item.id.toString(),
          uploadedAt: item.created_at,
          condition: item.prediction,
          severity: "moderate",
          confidence: item.confidence,
          imageUrl: `${baseURL}/api/uploads/${item.image_path}`,
        }));
      }
      return [];
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Delete analysis by ID
   */
  deleteAnalysis: async (id: string): Promise<void> => {
    try {
      await api.delete(`/analysis/${id}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
