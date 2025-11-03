/**
 * API Service Wrapper
 * Switches between mock API and real backend API based on configuration
 */

import { USE_MOCK_API } from "../config/apiConfig";
import * as mockAPI from "./mockAPI";
import apiClient from "./apiClient";

/**
 * Get the appropriate API service based on configuration
 */
function getAPIService() {
  if (USE_MOCK_API) {
    console.log("Using Mock API");
    return mockAPI;
  } else {
    console.log("Using Real Backend API");
    return apiClient;
  }
}

// Export service methods that route to either mock or real API
const apiService = {
  // Authentication
  login: async (email, password, role) => {
    const service = getAPIService();
    if (USE_MOCK_API) {
      // Mock API doesn't have login, return mock session
      return {
        success: true,
        user: {
          userId: "user_001",
          email,
          role,
          name: `Mock ${role}`,
        },
      };
    }
    // Use apiClient with appropriate endpoint based on role
    // TODO: Update endpoint based on your backend routes
    const endpoint =
      role === "student" ? "/student/login" : "/university/login";
    return service.request(endpoint, {
      method: "POST",
      body: { email, password },
    });
  },

  // Get current user (for session-based auth)
  getCurrentUser: async () => {
    const service = getAPIService();
    if (USE_MOCK_API) {
      // Return mock user from localStorage session
      const session = JSON.parse(
        localStorage.getItem("skillswallet_session") || "null"
      );
      return session ? { success: true, user: session } : { success: false };
    }
    return service.request("/auth/me", { method: "GET" });
  },

  // User management (admin only)
  createUser: async (userData) => {
    const service = getAPIService();
    if (USE_MOCK_API) {
      return mockAPI.createUser(userData);
    }
    // TODO: Update endpoint based on your backend
    return service.request("/admin/users", {
      method: "POST",
      body: userData,
    });
  },

  // Subject management
  listSubjects: async () => {
    const service = getAPIService();
    if (USE_MOCK_API) {
      return mockAPI.listSubjects();
    }
    return service.request("/university/subjects", { method: "GET" });
  },

  createSubject: async (subjectData) => {
    const service = getAPIService();
    if (USE_MOCK_API) {
      return mockAPI.createSubject(...Object.values(subjectData));
    }
    return service.request("/university/subjects", {
      method: "POST",
      body: subjectData,
    });
  },

  // Exam management
  listExams: async () => {
    const service = getAPIService();
    if (USE_MOCK_API) {
      return mockAPI.listExams();
    }
    return service.request("/exams", { method: "GET" });
  },

  getExam: async (examId) => {
    const service = getAPIService();
    if (USE_MOCK_API) {
      return mockAPI.getExam(examId);
    }
    return service.request(`/exams/${examId}`, { method: "GET" });
  },

  // Add more methods as needed...
  // You can gradually replace mockAPI calls with real API calls
};

export default apiService;
