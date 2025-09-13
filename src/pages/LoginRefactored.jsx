import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { 
  Button, 
  Card, 
  Input, 
  Typography, 
  Container, 
  Grid 
} from "../components/ui";

/**
 * Login Page - Refactored using UI Components
 * Demonstrates component-based architecture
 */
export default function LoginRefactored() {
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
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Typography variant="h1" gradient primary>
            ⚡ Skills Wallet
          </Typography>
          <Typography variant="body" color="white" style={{ marginTop: '0.5rem' }}>
            Digital Credential Management System
          </Typography>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <Typography variant="body" color="white" style={{ marginBottom: '0.5rem', fontWeight: '600' }}>
              Username
            </Typography>
            <Input
              variant="dark"
              size="lg"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <Typography variant="body" color="white" style={{ marginBottom: '0.5rem', fontWeight: '600' }}>
              Password
            </Typography>
            <Input
              variant="dark"
              size="lg"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <Typography variant="body" color="white" style={{ marginBottom: '0.5rem', fontWeight: '600' }}>
              Role
            </Typography>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '1rem',
                fontSize: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontFamily: 'inherit'
              }}
            >
              <option value="provider">Education Provider</option>
              <option value="verifier">HR Verifier</option>
            </select>
          </div>

          {error && (
            <div style={{
              background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
              color: '#DC2626',
              padding: '1rem',
              borderRadius: '0.75rem',
              border: '1px solid #FECACA',
              marginBottom: '1rem',
              fontWeight: '500'
            }}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!username || !password}
            style={{ marginBottom: '2rem' }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div style={{ 
          textAlign: 'center', 
          margin: '2rem 0',
          color: 'rgba(255, 255, 255, 0.6)',
          position: 'relative'
        }}>
          <span style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0 1rem' }}>
            or try demo accounts
          </span>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
            zIndex: -1
          }}></div>
        </div>

        {/* Demo Section */}
        <div>
          <Typography variant="h4" color="white" centered style={{ marginBottom: '1.5rem' }}>
            Demo Accounts
          </Typography>
          
          <Grid columns={2} gap="md" responsive>
            <Card variant="dark" hover>
              <Typography variant="h5" color="white" style={{ marginBottom: '0.75rem' }}>
                Education Provider
              </Typography>
              <Typography variant="caption" color="gray" style={{ marginBottom: '0.25rem' }}>
                Username: <code>admin</code>
              </Typography>
              <Typography variant="caption" color="gray" style={{ marginBottom: '1rem' }}>
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
              <Typography variant="h5" color="white" style={{ marginBottom: '0.75rem' }}>
                HR Verifier
              </Typography>
              <Typography variant="caption" color="gray" style={{ marginBottom: '0.25rem' }}>
                Username: <code>verifier1</code>
              </Typography>
              <Typography variant="caption" color="gray" style={{ marginBottom: '1rem' }}>
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
        </div>

        {/* Help Section */}
        <Card variant="dark" style={{ marginTop: '2rem' }}>
          <Typography variant="h5" color="white" centered style={{ marginBottom: '1rem' }}>
            Available Demo Accounts
          </Typography>
          
          <Grid columns={2} gap="md" responsive>
            <div>
              <Typography variant="body" color="white" style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                Education Providers:
              </Typography>
              <ul style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', paddingLeft: '1.5rem' }}>
                <li>admin / admin123</li>
                <li>teacher1 / teacher123</li>
                <li>school / school123</li>
              </ul>
            </div>
            <div>
              <Typography variant="body" color="white" style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                HR Verifiers:
              </Typography>
              <ul style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', paddingLeft: '1.5rem' }}>
                <li>verifier1 / verify123</li>
                <li>employer / employer123</li>
                <li>recruiter / recruit123</li>
              </ul>
            </div>
          </Grid>
        </Card>
      </Card>
    </Container>
  );
}
