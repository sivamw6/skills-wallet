import { listChainTx } from "../../service/mockAPI";
import { Link } from "react-router-dom";
import styles from "./BlockchainRecords.module.scss";

/**
 * Blockchain Records Page - Shows mock blockchain transaction history
 * Displays all issued credentials with their transaction IDs
 */
export default function BlockchainRecords() {
  const txs = listChainTx();

  function getScoreClass(score) {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'pass';
    return 'fail';
  }

  function getScoreLabel(score) {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Pass';
    return 'Fail';
  }

  return (
    <div className={styles.blockchainContainer}>
      <div className={styles.header}>
        <h2>🔗 Blockchain Records</h2>
        <p>Each issued credential is recorded with a unique transaction ID to simulate blockchain immutability and tamper-proof verification.</p>
      </div>

      <div className={styles.recordsList}>
        {txs.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📋</span>
            <p>No transactions recorded yet.</p>
            <p>Start by issuing credentials to see them appear here.</p>
          </div>
        ) : (
          <ul className={styles.transactionList}>
            {txs.map(tx => (
              <li key={tx.txId} className={styles.transactionItem}>
                <div className={styles.transactionInfo}>
                  <div className={styles.txId}>{tx.txId}</div>
                  <div className={styles.credentialDetails}>
                    <div className={styles.studentName}>{tx.studentName}</div>
                    <div className={styles.skillInfo}>
                      {tx.skillName} • Issued {new Date(tx.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className={`${styles.scoreBadge} ${styles[getScoreClass(tx.score)]}`}>
                  {tx.score}%
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.legend}>
        <h3>Score Legend</h3>
        <div className={styles.legendItems}>
          <div className={styles.legendItem}>
            <div className={`${styles.colorIndicator} ${styles.excellent}`}></div>
            <div className={styles.label}>Excellent (90%+)</div>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.colorIndicator} ${styles.good}`}></div>
            <div className={styles.label}>Good (80-89%)</div>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.colorIndicator} ${styles.pass}`}></div>
            <div className={styles.label}>Pass (70-79%)</div>
          </div>
            <div className={styles.legendItem}>
              <div className={`${styles.colorIndicator} ${styles.fail}`}></div>
              <div className={styles.label}>Fail (&lt;70%)</div>
            </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/provider/dashboard" style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#2e86ab',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px'
        }}>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}