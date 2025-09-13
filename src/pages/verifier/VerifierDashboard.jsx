import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import { verifyByTxId, verifyByCredentialId } from "../../service/mockAPI";
import { Button, Typography, Container } from "../../components/ui";
import VerificationForm from "../../components/verifier/VerificationForm";
import VerificationResult from "../../components/verifier/VerificationResult";
import HelpSection from "../../components/verifier/HelpSection";

/**
 * Verifier Dashboard - HR Credential Verification
 * Modern design with gradient backgrounds and glowing effects
 */
export default function VerifierDashboard() {
  const { session, setSession } = useAuth();
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("txId");
  const [searchValue, setSearchValue] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  function handleLogout() {
    setSession(null);
    navigate("/login", { replace: true });
  }

  async function handleVerify(e) {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setIsSearching(true);
    try {
      let result;
      if (searchType === "txId") {
        result = await verifyByTxId(searchValue);
      } else {
        result = await verifyByCredentialId(searchValue);
      }
      setVerificationResult(result);
    } catch {
      setVerificationResult({ 
        valid: false, 
        error: "Credential not found or invalid. Please check the ID and try again." 
      });
    }
    setIsSearching(false);
  }

  function clearResult() {
    setVerificationResult(null);
    setSearchValue("");
  }

  return (
    <Container variant="default" size="lg">
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: '3rem' 
      }}>
        <div>
          <Typography variant="h1" color="primary">
            🔍 HR Credential Verification
          </Typography>
          <Typography variant="body" color="white">
            Welcome, <strong>{session?.name || "HR Verifier"}</strong>
          </Typography>
          <Typography variant="body" color="white">
            Verify candidate credentials by entering their Transaction ID or Credential ID.
          </Typography>
        </div>
        <Button variant="danger" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Verification Form Section */}
      <div style={{ marginBottom: '3rem' }}>
        <Typography variant="h2" color="white" centered style={{ marginBottom: '1rem' }}>
          Candidate Credential Check
        </Typography>
        <Typography variant="body" color="white" centered style={{ marginBottom: '2rem' }}>
          Enter the candidate's credential information to verify their skills and qualifications.
        </Typography>
        
        <VerificationForm
          searchType={searchType}
          setSearchType={setSearchType}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSubmit={handleVerify}
          isSearching={isSearching}
        />
      </div>

      {/* Verification Result Section */}
      <VerificationResult 
        result={verificationResult} 
        onClear={clearResult} 
      />

      {/* Help Section */}
      <HelpSection />
    </Container>
  );
}