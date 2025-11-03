import React, { useState } from 'react';
import { Container, Card, Typography, FormGroup, Input, Select, Button } from '../../components/ui';
import { createUser } from '../../service/mockAPI';

export default function CreateUser() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'provider',
  });
  const [created, setCreated] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setCreated(null);
    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }
    const user = createUser({ email: form.email, password: form.password, role: form.role });
    setCreated(user);
    setForm({ email: '', password: '', role: 'provider' });
  };

  return (
    <Container variant="glass" className="p-8">
      <Card variant="glass" spacing="lg">
        <Typography variant="h2" color="primary">Create User</Typography>
        <Typography variant="body" color="white">Minimal details: email and password, and a role.</Typography>

        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <FormGroup label="Email" required>
            <Input
              type="email"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              placeholder="name@example.com"
              error={!!error && !form.email}
              helperText={!form.email && error ? 'Please enter an email' : ''}
            />
          </FormGroup>

          <FormGroup label="Password" required>
            <Input
              type="password"
              value={form.password}
              onChange={e => handleChange('password', e.target.value)}
              placeholder="Enter a password"
              error={!!error && !form.password}
              helperText={!form.password && error ? 'Please enter a password' : ''}
            />
          </FormGroup>

          <FormGroup label="Role" required>
            <Select
              value={form.role}
              onChange={e => handleChange('role', e.target.value)}
            >
              <option value="provider">Education Provider</option>
              <option value="student">Student</option>
              <option value="hr">HR</option>
              <option value="verifier">Verifier</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </Select>
          </FormGroup>

          {error && (
            <Typography variant="body" color="secondary" style={{ marginBottom: '0.5rem' }}>
              {error}
            </Typography>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button variant="primary" type="submit">Create</Button>
            <Button variant="secondary" type="button" onClick={() => setForm({ email: '', password: '', role: 'provider' })}>Reset</Button>
          </div>
        </form>

        {created && (
          <Card variant="outlined" spacing="sm" style={{ marginTop: '1rem' }}>
            <Typography variant="h4" color="primary">User Created</Typography>
            <Typography variant="body" color="white">ID: {created.userId}</Typography>
            <Typography variant="body" color="white">Email: {created.email}</Typography>
            <Typography variant="body" color="white">Role: {created.role}</Typography>
          </Card>
        )}
      </Card>
    </Container>
  );
}


