export const db = {
  users: [
    {
      id: "u1",
      email: "prov@example.edu",
      password: "pass123",
      role: "provider",
      name: "Provider A",
    },
  ],
  assessments: {
    "asm-001": {
      id: "asm-001",
      title: "Logic MCQ",
      questions: [
        {
          id: "q1",
          text: "2 + 2 = ?",
          options: ["3", "4", "5"],
          answerIndex: 1,
        },
        {
          id: "q2",
          text: "5 - 3 = ?",
          options: ["1", "2", "3"],
          answerIndex: 1,
        },
        {
          id: "q3",
          text: "3 * 2 = ?",
          options: ["5", "6", "8"],
          answerIndex: 1,
        },
      ],
    },
  },
  attempts: {}, // { attemptId: { ... } }
  credentials: {}, // { credentialId: { ... } }
  wallets: { s1: [] }, // student s1's credentials
  txs: [], // [{txId, credentialId}]
  seq: 1,
};

export function newId(prefix) {
  return `${prefix}-${db.seq++}`;
}
