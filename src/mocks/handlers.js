import { http, HttpResponse } from "msw";
import { db, newId } from "./store.js";

export const handlers = [
  // POST /auth/login
  http.post("/auth/login", async ({ request }) => {
    const { email, password } = await request.json();
    const user = db.users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user)
      return HttpResponse.json({ error: "Invalid creds" }, { status: 401 });
    return HttpResponse.json({ token: "fake-token", user });
  }),

  // GET /assessments/:id
  http.get("/assessments/:id", ({ params }) => {
    const a = db.assessments[params.id];
    if (!a) return HttpResponse.json({ error: "Not found" }, { status: 404 });
    return HttpResponse.json(a);
  }),

  // POST /assessments/:id/attempts
  http.post("/assessments/:id/attempts", async ({ params, request }) => {
    const a = db.assessments[params.id];
    if (!a) return HttpResponse.json({ error: "Not found" }, { status: 404 });
    const { studentId, answers } = await request.json();
    let score = 0;
    a.questions.forEach((q, i) => {
      if (answers?.[i]?.choice === q.answerIndex) score++;
    });
    const attemptId = newId("att");
    db.attempts[attemptId] = {
      attemptId,
      studentId,
      assessmentId: a.id,
      score,
      max: a.questions.length,
    };
    return HttpResponse.json({ attemptId, score, max: a.questions.length });
  }),

  // POST /credentials/issue
  http.post("/credentials/issue", async ({ request }) => {
    const { studentId, assessmentId, attemptId, score, issuer } =
      await request.json();
    const credentialId = newId("cred");
    const txId = "0x" + Math.random().toString(16).slice(2, 10);
    const issuedAt = new Date().toISOString();
    db.credentials[credentialId] = {
      credentialId,
      studentId,
      assessmentId,
      attemptId,
      score,
      issuer,
      txId,
      issuedAt,
    };
    (db.wallets[studentId] ||= []).push({
      credentialId,
      title: db.assessments[assessmentId]?.title || "Skill",
      txId,
    });
    db.txs.push({ txId, credentialId });
    return HttpResponse.json({ credentialId, txId, issuedAt });
  }),

  // GET /wallet/:studentId
  http.get("/wallet/:studentId", ({ params }) => {
    const items = db.wallets[params.studentId] || [];
    return HttpResponse.json({
      studentId: params.studentId,
      credentials: items,
    });
  }),

  // POST /verify
  http.post("/verify", async ({ request }) => {
    const { credentialId } = await request.json();
    const cred = db.credentials[credentialId];
    if (!cred) return HttpResponse.json({ valid: false });
    return HttpResponse.json({
      valid: true,
      txId: cred.txId,
      issuer: cred.issuer,
    });
  }),
];
