export const API = {
  login: () => "/auth/login",
  assessment: (id) => `/assessments/${id}`,
  submitAttempt: (id) => `/assessments/${id}/attempts`,
  issueCredential: () => "/credentials/issue",
  wallet: (studentId) => `/wallet/${studentId}`,
  verify: () => "/verify",
};
