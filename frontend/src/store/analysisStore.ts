import { create } from "zustand";
import type { AnalysisResult, AnalysisHistoryItem } from "@/types";

interface AnalysisStore {
  results: any[];
  currentResult: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;

  setResults: (results: any[]) => void;
  setCurrentResult: (result: AnalysisResult | null) => void;
  addResult: (result: AnalysisResult) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearResults: () => void;
  fetchHistory: () => Promise<void>;
  deleteAnalysis: (id: string) => Promise<void>;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  results: [],
  currentResult: null,
  isLoading: false,
  error: null,

  setResults: (results) => set({ results }),
  setCurrentResult: (result) => set({ currentResult: result }),

  addResult: (result) =>
    set((state) => ({
      results: [result, ...state.results],
      currentResult: result,
    })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearResults: () => set({ results: [], currentResult: null }),

  fetchHistory: async () => {
    const { analysisService } = await import("@/services/analysisService");
    set({ isLoading: true, error: null });
    try {
      const history = await analysisService.getHistory();
      set({ results: history, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteAnalysis: async (id: string) => {
    const { analysisService } = await import("@/services/analysisService");
    try {
      await analysisService.deleteAnalysis(id);
      set((state) => ({
        results: state.results.filter((item) => item.id !== id),
      }));
    } catch (error: any) {
      console.error("Delete store error:", error);
      throw error;
    }
  },
}));
