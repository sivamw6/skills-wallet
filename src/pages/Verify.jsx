import { useState } from "react";
import { verifyByTxId } from "../service/mockAPI";

/** Verifier page: paste TxID to check credential integrity */
export default function Verify() {
  const [txId, setTxId] = useState("");
  const [result, setResult] = useState(null);

  function handleVerify(e) {
    e.preventDefault();
    const res = verifyByTxId(txId.trim());
    setResult(res);
  }

  return (
    <div style={{...box, backgroundColor: "#0f172a", color: "white", minHeight: "100vh"}}>
      <h2 style={{color: "#ff6b35", fontSize: "2rem", marginBottom: "20px"}}>Verifier Portal</h2>
      <p style={{color: "rgba(255, 255, 255, 0.8)", fontSize: "1.1rem", marginBottom: "30px"}}>Paste a TxID from the blockchain records to verify a credential.</p>

      <form onSubmit={handleVerify} style={{ display: "flex", gap: 8, maxWidth: 560 }}>
        <input
          style={{...input, backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "8px"}}
          value={txId}
          onChange={(e) => setTxId(e.target.value)}
          placeholder="Enter TxID"
        />
        <button type="submit" style={{...btn, backgroundColor: "#ff6b35", color: "white", border: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "1.1rem"}}>Verify</button>
      </form>

      {result && (
        <div style={{...card, backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", borderRadius: "12px", padding: "20px", marginTop: "20px"}}>
          {result.ok ? (
            <>
              <p style={{color: "#4ecdc4", fontSize: "1.2rem", marginBottom: "15px"}}><strong>Valid credential</strong></p>
              <p style={{color: "white", margin: "8px 0"}}>Student: {result.data.studentName}</p>
              <p style={{color: "white", margin: "8px 0"}}>Skill: {result.data.skillName}</p>
              <p style={{color: "white", margin: "8px 0"}}>Score: {result.data.score}</p>
              <p style={{color: "white", margin: "8px 0"}}>TxID: <code style={{backgroundColor: "rgba(255, 255, 255, 0.2)", padding: "2px 6px", borderRadius: "4px"}}>{result.data.txId}</code></p>
            </>
          ) : (
            <p style={{color: "#ef4444", fontSize: "1.1rem"}}><strong>Not found</strong>: TxID does not exist.</p>
          )}
        </div>
      )}
    </div>
  );
}

// Basic styles only
const box = { padding: 20 };
const input = { padding: 8, margin: "5px" };
const btn = { padding: "8px 12px" };
const card = { marginTop: 12, border: "1px solid #ccc", padding: 12 };