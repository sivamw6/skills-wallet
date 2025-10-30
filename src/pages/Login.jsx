import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../App";
import { 
  Button, 
  Card, 
  Input, 
  Select,
  Typography, 
  Container, 
  Grid,
  ErrorMessage,
  Divider,
  FormGroup,
  Header
} from "../components/ui";

/**
 * Login Page - Modern design inspired by the provided images
 * Features gradient backgrounds, glowing effects, and modern typography
 */
export default function Login() {
  const { setSession } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("provider");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock user database for PoC
  const mockUsers = {
    provider: [
      { username: "admin", password: "admin123", name: "Education Admin", role: "provider" },
      { username: "teacher1", password: "teacher123", name: "Ms. Johnson", role: "provider" },
      { username: "school", password: "school123", name: "Springfield High", role: "provider" }
    ],
    verifier: [
      { username: "verifier1", password: "verify123", name: "HR Verifier", role: "verifier" },
      { username: "employer", password: "employer123", name: "Tech Corp", role: "verifier" },
      { username: "recruiter", password: "recruit123", name: "Talent Agency", role: "verifier" }
    ]
  };

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const users = mockUsers[role];
      const user = users.find(u => u.username === username && u.password === password);
      
      if (user) {
        const session = { 
          role: user.role, 
          name: user.name,
          username: user.username,
          isAuthenticated: true
        };
        setSession(session);
        navigate(role === "provider" ? "/provider/dashboard" : "/verifier/dashboard", { replace: true });
      } else {
        setError("Invalid username or password for the selected role.");
      }
      setIsLoading(false);
    }, 800);
  }

  function handleDemoLogin(role) {
    const demoUsers = mockUsers[role];
    const demoUser = demoUsers[0]; // Use first demo user
    
    const session = { 
      role: demoUser.role, 
      name: demoUser.name,
      username: demoUser.username,
      isAuthenticated: true
    };
    setSession(session);
    navigate(role === "provider" ? "/provider/dashboard" : "/verifier/dashboard", { replace: true });
  }

  return (
    <Container variant="default" size="lg" fullHeight centered>
      <Card variant="glass" size="lg" hover>
        <Header 
          title={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <img 
                src="/kanavoogle-logo.png" 
                alt="Kanavoogle" 
                style={{ width: '48px', height: '48px' }}
              />
              <span>Skills Wallet</span>
            </div>
          }
          subtitle="Digital Credential Management System"
          variant="centered"
          gradient
        />

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <FormGroup label="Username" required>
            <Input
              variant="dark"
              size="lg"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup label="Password" required>
            <Input
              variant="dark"
              size="lg"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup label="Role">
            <Select 
              variant="dark"
              size="lg"
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="provider">Education Provider</option>
              <option value="verifier">HR Verifier</option>
            </Select>
          </FormGroup>

          {error && (
            <ErrorMessage variant="error">
              {error}
            </ErrorMessage>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!username || !password}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <Divider text="or try demo accounts" />

        {/* Demo Section */}
        <Grid columns={2} gap="md" responsive>
          <Card variant="dark" hover>
            <Typography variant="h5" color="white">
              Education Provider
            </Typography>
            <Typography variant="caption" color="white">
              Username: <code>admin</code>
            </Typography>
            <Typography variant="caption" color="white">
              Password: <code>admin123</code>
            </Typography>
            <Button
              variant="success"
              size="md"
              fullWidth
              onClick={() => handleDemoLogin("provider")}
            >
              Demo as Provider
            </Button>
          </Card>

          <Card variant="dark" hover>
            <Typography variant="h5" color="white">
              HR Verifier
            </Typography>
            <Typography variant="caption" color="white">
              Username: <code>verifier1</code>
            </Typography>
            <Typography variant="caption" color="white">
              Password: <code>verify123</code>
            </Typography>
            <Button
              variant="success"
              size="md"
              fullWidth
              onClick={() => handleDemoLogin("verifier")}
            >
              Demo as HR
            </Button>
          </Card>
        </Grid>
      </Card>
    </Container>
  );
}