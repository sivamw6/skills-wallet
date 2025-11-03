/**
 * API Client for Digital Skills Wallet
 * Supports both session-based (cookie) and token-based authentication
 */

import { API_BASE_URL, SESSION_CONFIG } from "../config/apiConfig";

class ApiClient {
  constructor() {
    // For token-based auth (optional, if backend uses JWT)
    this.token = localStorage.getItem("auth_token");
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    // Prepare headers
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add token if available (for JWT-based auth)
    if (this.token && !SESSION_CONFIG.useSessionCookies) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const config = {
      method: options.method || "GET",
      headers,
      // Include cookies for session-based authentication
      credentials: SESSION_CONFIG.credentials || "include",
      ...options,
      // Don't override headers we just set
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    // Add body if provided
    if (options.body) {
      config.body =
        typeof options.body === "string"
          ? options.body
          : JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || "Request failed");
      }

      if (!response.ok) {
        throw new Error(
          data.error || data.message || `Request failed: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  // ========================================
  // AUTHENTICATION (User)
  // ========================================

  async login(email, password, role) {
    // This method can be overridden based on role
    // For now, use a generic endpoint (update based on your backend)
    const endpoint =
      role === "student"
        ? "/student/login"
        : role === "provider" || role === "university"
        ? "/university/login"
        : "/auth/login";

    return this.request(endpoint, {
      method: "POST",
      body: { email, password, role },
    });
  }

  // Get current user from session
  async getCurrentUser() {
    return this.request("/auth/me", {
      method: "GET",
    });
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  // ========================================
  // EDUCATION PROVIDER
  // ========================================

  async createExam(title, questions) {
    return this.request("/providers/exams", {
      method: "POST",
      body: JSON.stringify({ title, questions }),
    });
  }

  async issueCredential(studentId, studentName, examId, score) {
    return this.request("/providers/credentials", {
      method: "POST",
      body: JSON.stringify({
        studentId,
        studentName,
        examId,
        score,
      }),
    });
  }

  // ========================================
  // EXAM
  // ========================================

  async getExam(examId) {
    return this.request(`/exams/${examId}`);
  }

  async listExams() {
    return this.request("/exams");
  }

  async evaluateExam(examId, studentId, answers) {
    return this.request(`/exams/${examId}/evaluate`, {
      method: "POST",
      body: JSON.stringify({ studentId, answers }),
    });
  }

  // ========================================
  // VERIFIER
  // ========================================

  async verifyCredential(credentialId) {
    return this.request("/verifiers/verify/credential", {
      method: "POST",
      body: JSON.stringify({ credentialId }),
    });
  }

  async verifyTransaction(txId) {
    return this.request("/verifiers/verify/transaction", {
      method: "POST",
      body: JSON.stringify({ txId }),
    });
  }

  // ========================================
  // CREDENTIAL
  // ========================================

  async getCredential(credentialId) {
    return this.request(`/credentials/${credentialId}`);
  }

  async listCredentials() {
    return this.request("/credentials");
  }

  // ========================================
  // BLOCKCHAIN
  // ========================================

  async getTransaction(txId) {
    return this.request(`/blockchain/transactions/${txId}`);
  }

  async listTransactions() {
    return this.request("/blockchain/transactions");
  }

  // ========================================
  // INSTRUCTOR (Future Extension)
  // ========================================

  async getInstructorExams(instructorId) {
    return this.request(`/instructors/${instructorId}/exams`);
  }
}

// Export singleton instance
export default new ApiClient();
