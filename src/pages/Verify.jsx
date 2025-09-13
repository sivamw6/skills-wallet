import { useState } from "react";
import { verifyByTxId } from "../service/mockAPI";
import { 
  Button, 
  Card, 
  Input, 
  Typography, 
  Container, 
  Badge 
} from "../components/ui";

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
    <Container variant="default" size="lg" fullHeight centered>
      <Card variant="glass" size="lg">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Typography variant="h2" gradient primary>
            🔍 Verifier Portal
          </Typography>
          <Typography variant="body" color="white" style={{ marginTop: '0.5rem' }}>
            Paste a TxID from the blockchain records to verify a credential.
          </Typography>
        </div>

        <form onSubmit={handleVerify} style={{ display: 'flex', gap: '1rem', maxWidth: '560px', margin: '0 auto' }}>
          <Input
            variant="dark"
            size="lg"
            value={txId}
            onChange={(e) => setTxId(e.target.value)}
            placeholder="Enter TxID"
            style={{ flex: 1 }}
          />
          <Button type="submit" variant="primary" size="lg">
            Verify
          </Button>
        </form>

        {result && (
          <Card variant="glass" style={{ marginTop: '2rem' }}>
            {result.ok ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <Badge variant="success" size="lg" style={{ marginBottom: '0.5rem', display: 'block' }}>
                    Valid credential
                  </Badge>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body" color="white">Student:</Typography>
                    <Typography variant="body" color="white" style={{ fontWeight: '600' }}>{result.data.studentName}</Typography>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body" color="white">Skill:</Typography>
                    <Typography variant="body" color="white" style={{ fontWeight: '600' }}>{result.data.skillName}</Typography>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body" color="white">Score:</Typography>
                    <Badge variant={result.data.score >= 70 ? 'success' : result.data.score >= 50 ? 'warning' : 'error'}>
                      {result.data.score}%
                    </Badge>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body" color="white">TxID:</Typography>
                    <code style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontFamily: 'monospace'
                    }}>
                      {result.data.txId}
                    </code>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Badge variant="error" size="lg" style={{ marginBottom: '0.5rem', display: 'block' }}>
                  Not found
                </Badge>
                <Typography variant="body" color="white">
                  TxID does not exist.
                </Typography>
              </div>
            )}
          </Card>
        )}
      </Card>
    </Container>
  );
}
