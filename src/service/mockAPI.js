/**
 * Mock API for Digital Skills Wallet PoC
 * Simulates backend + blockchain layer with in-memory storage
 * Implements the data model from UML diagram
 */

// Mock data stores
let assessments = []; // Assessment storage
let credentials = []; // Issued credentials
let chainTx = []; // "Blockchain" transaction log

// Mock Assessment data
const mockQuestions = [
  {
    questionId: "q1",
    text: "2, 4, 8, 16, ?",
    options: ["20", "32", "18"],
    correctAnswer: "32",
  },
  {
    questionId: "q2",
    text: "Which is a prime number?",
    options: ["13", "21", "1"],
    correctAnswer: "13",
  },
  {
    questionId: "q3",
    text: "Sort ascending: [7, 2, 5]",
    options: ["[7,5,2]", "[5,7,2]", "[2,5,7]"],
    correctAnswer: "[2,5,7]",
  },
];

// Initialize with a default assessment
const defaultAssessment = {
  assessmentId: "assess_001",
  title: "Logical Reasoning Assessment",
  questions: mockQuestions,
};
assessments.push(defaultAssessment);

/**
 * Assessment Management
 */
export function createAssessment(title, questions) {
  const assessmentId = "assess_" + Date.now();
  const assessment = {
    assessmentId,
    title,
    questions: questions || mockQuestions,
  };
  assessments.unshift(assessment);
  return assessment;
}

export function getAssessment(assessmentId) {
  return (
    assessments.find((a) => a.assessmentId === assessmentId) ||
    defaultAssessment
  );
}

export function listAssessments() {
  return assessments;
}

/**
 * Assessment Evaluation
 */
export function evaluateAssessment(assessmentId, answers) {
  const assessment = getAssessment(assessmentId);
  let correctCount = 0;

  assessment.questions.forEach((q, index) => {
    if (answers[index] && answers[index] === q.correctAnswer) {
      correctCount++;
    }
  });

  const score = Math.round((correctCount / assessment.questions.length) * 100);
  return {
    score,
    maxScore: 100,
    correctAnswers: correctCount,
    totalQuestions: assessment.questions.length,
  };
}

/**
 * Credential Management
 */
export function issueCredential({
  studentId,
  studentName,
  assessmentId,
  score,
}) {
  const credentialId = "cred_" + Date.now();
  const txId =
    "0x" + Math.random().toString(16).slice(2) + Date.now().toString(16);

  const credential = {
    credentialId,
    studentId: studentId || "student_001",
    studentName: studentName || "Student A",
    assessmentId: assessmentId || "assess_001",
    score,
    txId,
    timestamp: new Date().toISOString(),
  };

  credentials.unshift(credential);
  chainTx.unshift(credential);

  return { credentialId, txId, credential };
}

export function listCredentials() {
  return credentials;
}

export function getCredential(credentialId) {
  return credentials.find((c) => c.credentialId === credentialId);
}

/**
 * Blockchain Simulation
 */
export function listChainTx() {
  return chainTx;
}

export function getTransaction(txId) {
  return chainTx.find((tx) => tx.txId === txId);
}

/**
 * Verifier Functions
 */
export function verifyByTxId(txId) {
  const found = getTransaction(txId);
  if (!found) return { ok: false, error: "Transaction not found" };
  return { ok: true, data: found };
}

export function verifyByCredentialId(credentialId) {
  const found = getCredential(credentialId);
  if (!found) return { ok: false, error: "Credential not found" };
  return { ok: true, data: found };
}
