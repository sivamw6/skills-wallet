import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import { 
  verifyByTxId, 
  verifyByCredentialId, 
  getStudentCredentials, 
  verifyCredentialToken 
} from "../../service/mockAPI";
import { 
  Button, 
  Typography, 
  Container, 
  Card, 
  Badge, 
  Input, 
  Select, 
  FormGroup 
} from "../../components/ui";
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
  const [verificationType, setVerificationType] = useState("txId");
  const [searchValue, setSearchValue] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [studentCredentials, setStudentCredentials] = useState(null);
  const [isLoadingStudent, setIsLoadingStudent] = useState(false);
  const [skillSearch, setSkillSearch] = useState("");
  const [skillResults, setSkillResults] = useState(null);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  const [searchMode, setSearchMode] = useState("individual"); // "individual", "skills"

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
      if (verificationType === "txId") {
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

  async function handleStudentSearch(e) {
    e.preventDefault();
    if (!studentId.trim()) return;

    setIsLoadingStudent(true);
    try {
      const result = await getStudentCredentials(studentId);
      setStudentCredentials(result);
    } catch {
      setStudentCredentials({ 
        success: false, 
        error: "Failed to load student credentials. Please try again." 
      });
    }
    setIsLoadingStudent(false);
  }

  async function handleTokenVerify(tokenId) {
    try {
      const result = await verifyCredentialToken(tokenId);
      setVerificationResult(result);
    } catch {
      setVerificationResult({ 
        valid: false, 
        error: "Failed to verify token. Please try again." 
      });
    }
  }

  function clearStudentResults() {
    setStudentCredentials(null);
    setStudentId("");
  }

  async function handleSkillSearch(e) {
    e.preventDefault();
    if (!skillSearch.trim()) return;

    setIsLoadingSkills(true);
    try {
      // Mock skill-based search - in real implementation, this would query a database
      const mockSkillResults = await searchBySkills(skillSearch);
      setSkillResults(mockSkillResults);
    } catch {
      setSkillResults({ 
        success: false, 
        error: "Failed to search by skills. Please try again." 
      });
    }
    setIsLoadingSkills(false);
  }

  function clearSkillResults() {
    setSkillResults(null);
    setSkillSearch("");
  }

  // Mock function for skill-based search
  async function searchBySkills(skillQuery) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data - in real implementation, this would come from a database
    const mockCandidates = [
      {
        studentId: "student_001",
        studentName: "John Doe",
        skills: ["python", "javascript", "dataStructures"],
        credentials: [
          {
            credentialId: "cred_001",
            examId: "exam_001",
            score: 85,
            skill: "python",
            timestamp: "2024-01-15T10:30:00Z"
          },
          {
            credentialId: "cred_002", 
            examId: "exam_002",
            score: 78,
            skill: "javascript",
            timestamp: "2024-01-16T14:20:00Z"
          }
        ],
        averageScore: 81.5,
        totalCredentials: 2
      },
      {
        studentId: "student_002",
        studentName: "Jane Smith",
        skills: ["python", "dataStructures", "webDevelopment"],
        credentials: [
          {
            credentialId: "cred_003",
            examId: "exam_003", 
            score: 92,
            skill: "python",
            timestamp: "2024-01-17T09:15:00Z"
          },
          {
            credentialId: "cred_004",
            examId: "exam_004",
            score: 88,
            skill: "dataStructures", 
            timestamp: "2024-01-18T11:45:00Z"
          }
        ],
        averageScore: 90,
        totalCredentials: 2
      }
    ];

    // Filter candidates based on skill query
    const querySkills = skillQuery.toLowerCase().split(',').map(s => s.trim());
    const matchingCandidates = mockCandidates.filter(candidate => 
      querySkills.some(skill => 
        candidate.skills.some(candidateSkill => 
          candidateSkill.toLowerCase().includes(skill) || 
          skill.includes(candidateSkill.toLowerCase())
        )
      )
    );

    return {
      success: true,
      query: skillQuery,
      totalCandidates: matchingCandidates.length,
      candidates: matchingCandidates
    };
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
            Search for candidates by skills or verify individual credentials by Transaction ID or Credential ID.
          </Typography>
        </div>
        <Button variant="danger" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Search Mode Selector */}
      <div style={{ marginBottom: '2rem' }}>
        <Typography variant="h3" color="white" style={{ marginBottom: '1rem' }}>
          Search Mode
        </Typography>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button
            variant={searchMode === "individual" ? "primary" : "secondary"}
            onClick={() => setSearchMode("individual")}
          >
            Individual Verification
          </Button>
          <Button
            variant={searchMode === "skills" ? "primary" : "secondary"}
            onClick={() => setSearchMode("skills")}
          >
            Skill-Based Search
          </Button>
        </div>
      </div>

      {/* Verification Options */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '2rem', 
        marginBottom: '3rem' 
      }}>
        {/* Individual Token Verification */}
        {searchMode === "individual" && (
          <Card variant="glass" spacing="lg">
            <Typography variant="h3" color="primary" style={{ marginBottom: '1rem' }}>
              🔍 Individual Token Verification
            </Typography>
            <Typography variant="body" color="white" style={{ marginBottom: '2rem' }}>
              Verify a specific credential by entering its Transaction ID or Credential ID.
            </Typography>
            
            <VerificationForm
              searchType={verificationType}
              setSearchType={setVerificationType}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onSubmit={handleVerify}
              isSearching={isSearching}
            />
          </Card>
        )}

        {/* Skill-Based Search */}
        {searchMode === "skills" && (
          <Card variant="glass" spacing="lg">
            <Typography variant="h3" color="primary" style={{ marginBottom: '1rem' }}>
              🎯 Skill-Based Candidate Search
            </Typography>
            <Typography variant="body" color="white" style={{ marginBottom: '2rem' }}>
              Search for candidates based on their verified skills and competencies. 
              Find Python programmers, web developers, or any specific skill set.
            </Typography>
            
            <form onSubmit={handleSkillSearch}>
              <FormGroup>
                <Input
                  label="Skills to Search"
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  placeholder="e.g., python, javascript, dataStructures"
                  helperText="Enter skills separated by commas (e.g., python, web development, data analysis)"
                  required
                />
              </FormGroup>
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                loading={isLoadingSkills}
              >
                {isLoadingSkills ? "Searching..." : "Search by Skills"}
              </Button>
            </form>
          </Card>
        )}

        {/* Student ID Search */}
        <Card variant="glass" spacing="lg">
          <Typography variant="h3" color="primary" style={{ marginBottom: '1rem' }}>
            👤 Student Credentials Lookup
          </Typography>
          <Typography variant="body" color="white" style={{ marginBottom: '2rem' }}>
            Enter a student ID to view all their credentials and exam results.
          </Typography>
          
          <form onSubmit={handleStudentSearch}>
            <FormGroup>
              <Input
                label="Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter student ID (e.g., student_001)"
                required
              />
            </FormGroup>
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              loading={isLoadingStudent}
            >
              {isLoadingStudent ? "Searching..." : "Search Student"}
            </Button>
          </form>
        </Card>
      </div>

      {/* Verification Result Section */}
      <VerificationResult 
        result={verificationResult} 
        onClear={clearResult} 
      />

      {/* Skill Search Results */}
      {skillResults && (
        <Card variant="glass" spacing="lg" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <Typography variant="h3" color="primary">
              🎯 Skill Search Results
            </Typography>
            <Button variant="secondary" size="sm" onClick={clearSkillResults}>
              Clear Results
            </Button>
          </div>
          
          {skillResults.success ? (
            <div>
              <Typography variant="body" color="white" style={{ marginBottom: '1rem' }}>
                Found <strong>{skillResults.totalCandidates}</strong> candidates with skills matching "{skillResults.query}"
              </Typography>
              
              {skillResults.candidates.length > 0 ? (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {skillResults.candidates.map((candidate, index) => (
                    <Card key={candidate.studentId} variant="dark" style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                          <Typography variant="h4" color="white" style={{ marginBottom: '0.5rem' }}>
                            {candidate.studentName}
                          </Typography>
                          <Typography variant="body" color="white" style={{ marginBottom: '0.5rem' }}>
                            Student ID: {candidate.studentId}
                          </Typography>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            {candidate.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="info" size="sm">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <Typography variant="h4" color="success" style={{ marginBottom: '0.5rem' }}>
                            {candidate.averageScore}%
                          </Typography>
                          <Typography variant="body" color="white">
                            Average Score
                          </Typography>
                        </div>
                      </div>
                      
                      <div>
                        <Typography variant="h5" color="white" style={{ marginBottom: '0.5rem' }}>
                          Verified Credentials ({candidate.totalCredentials})
                        </Typography>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                          {candidate.credentials.map((credential, credIndex) => (
                            <div key={credIndex} style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              padding: '0.75rem',
                              background: 'rgba(255, 255, 255, 0.05)',
                              borderRadius: '0.5rem'
                            }}>
                              <div>
                                <Typography variant="body" color="white" style={{ fontWeight: 'bold' }}>
                                  {credential.skill}
                                </Typography>
                                <Typography variant="body" color="white" style={{ fontSize: '0.875rem' }}>
                                  {new Date(credential.timestamp).toLocaleDateString()}
                                </Typography>
                              </div>
                              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <Badge 
                                  variant={credential.score >= 80 ? 'success' : credential.score >= 60 ? 'warning' : 'error'}
                                  size="sm"
                                >
                                  {credential.score}%
                                </Badge>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleTokenVerify(credential.credentialId)}
                                >
                                  Verify
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Typography variant="body" color="white" style={{ textAlign: 'center', padding: '2rem' }}>
                  No candidates found with the specified skills.
                </Typography>
              )}
            </div>
          ) : (
            <Typography variant="body" color="error" style={{ textAlign: 'center', padding: '2rem' }}>
              {skillResults.error}
            </Typography>
          )}
        </Card>
      )}

      {/* Student Credentials Results */}
      {studentCredentials && (
        <Card variant="glass" spacing="lg" style={{ marginBottom: '3rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <Typography variant="h3" color="primary">
              Student Credentials Results
            </Typography>
            <Button variant="secondary" size="sm" onClick={clearStudentResults}>
              Clear Results
            </Button>
          </div>

          {studentCredentials.success ? (
            <>
              {/* Student Summary */}
              <Card variant="dark" spacing="md" style={{ marginBottom: '2rem' }}>
                <Typography variant="h4" color="white" style={{ marginBottom: '1rem' }}>
                  📊 Student Summary
                </Typography>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  <div>
                    <Typography variant="body" color="white">
                      <strong>Student Name:</strong><br />
                      {studentCredentials.studentName}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body" color="white">
                      <strong>Student ID:</strong><br />
                      {studentCredentials.studentId}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body" color="white">
                      <strong>Total Credentials:</strong><br />
                      {studentCredentials.totalCredentials}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body" color="white">
                      <strong>Average Score:</strong><br />
                      <Badge variant="success" size="lg">
                        {studentCredentials.averageScore}%
                      </Badge>
                    </Typography>
                  </div>
                </div>
              </Card>

              {/* Individual Credentials */}
              <Typography variant="h4" color="white" style={{ marginBottom: '1rem' }}>
                🎓 Individual Credentials
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                  {studentCredentials.credentials.map((cred, idx) => (
                  <Card key={cred.credentialId} variant="dark" spacing="md">
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ flex: 1 }}>
                        <Typography variant="h5" color="primary" style={{ marginBottom: '0.5rem' }}>
                          Credential #{idx + 1}
                        </Typography>
                        <Typography variant="body" color="white" style={{ marginBottom: '0.25rem' }}>
                          <strong>Exam ID:</strong> {cred.examId}
                        </Typography>
                        <Typography variant="body" color="white" style={{ marginBottom: '0.25rem' }}>
                          <strong>Issued Date:</strong> {new Date(cred.timestamp).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body" color="white" style={{ marginBottom: '0.25rem' }}>
                          <strong>Transaction ID:</strong> 
                          <span style={{ 
                            fontFamily: 'monospace', 
                            fontSize: '0.875rem',
                            wordBreak: 'break-all',
                            marginLeft: '0.5rem'
                          }}>
                            {cred.txId}
                          </span>
                        </Typography>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <Badge 
                          variant={cred.score >= 70 ? 'success' : cred.score >= 50 ? 'warning' : 'error'}
                          size="lg"
                        >
                          {cred.score}%
                        </Badge>
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleTokenVerify(cred.txId)}
                        >
                          Verify This Token
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card variant="dark" spacing="md">
              <Typography variant="h4" color="error" style={{ marginBottom: '1rem' }}>
                ❌ No Credentials Found
              </Typography>
              <Typography variant="body" color="white">
                {studentCredentials.error}
              </Typography>
            </Card>
          )}
        </Card>
      )}

      {/* Help Section */}
      <HelpSection />
    </Container>
  );
}