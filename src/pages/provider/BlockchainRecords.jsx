import { listChainTx } from "../../service/mockAPI";

/** PoC page: show mock blockchain tx history */
export default function BlockchainRecords() {
  const txs = listChainTx();
  return (
    <div style={{...box, backgroundColor: "#0f172a", color: "white", minHeight: "100vh"}}>
      <h2 style={{color: "#ff6b35", fontSize: "2rem", marginBottom: "20px"}}>Blockchain Records (Mock)</h2>
      <p style={{color: "rgba(255, 255, 255, 0.8)", fontSize: "1.1rem", marginBottom: "30px"}}>Each issued credential is recorded with a pseudo TxID to simulate immutability.</p>
      <ul style={{ paddingLeft: 18 }}>
        {txs.length === 0 && <li style={{color: "rgba(255, 255, 255, 0.6)", fontSize: "1.1rem"}}>No transactions yet.</li>}
        {txs.map(tx => (
          <li key={tx.txId} style={{color: "white", margin: "10px 0", padding: "10px", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "8px"}}>
            <code style={{backgroundColor: "rgba(255, 255, 255, 0.2)", padding: "2px 6px", borderRadius: "4px"}}>{tx.txId}</code> — {tx.studentName} / {tx.skillName} / score {tx.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
// Basic styles only
const box = { padding: 20 };