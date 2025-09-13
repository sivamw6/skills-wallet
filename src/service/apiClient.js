/**
 * API Client for Digital Skills Wallet
 * Aligned with UML Class Diagram and RESTful conventions
 */

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

class ApiClient {
  constructor() {
    this.token = localStorage.getItem("auth_token");
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
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
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
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

  async createAssessment(title, questions) {
    return this.request("/providers/assessments", {
      method: "POST",
      body: JSON.stringify({ title, questions }),
    });
  }

  async issueCredential(studentId, studentName, assessmentId, score) {
    return this.request("/providers/credentials", {
      method: "POST",
      body: JSON.stringify({
        studentId,
        studentName,
        assessmentId,
        score,
      }),
    });
  }

  // ========================================
  // ASSESSMENT
  // ========================================

  async getAssessment(assessmentId) {
    return this.request(`/assessments/${assessmentId}`);
  }

  async listAssessments() {
    return this.request("/assessments");
  }

  async evaluateAssessment(assessmentId, studentId, answers) {
    return this.request(`/assessments/${assessmentId}/evaluate`, {
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

  async getInstructorAssessments(instructorId) {
    return this.request(`/instructors/${instructorId}/assessments`);
  }
}

// Export singleton instance
export default new ApiClient();
