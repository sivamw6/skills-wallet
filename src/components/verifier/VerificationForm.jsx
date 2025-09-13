import React from 'react';
import { Button, Typography, Grid } from '../ui';

/**
 * Verification Form Component
 * Handles credential verification input and submission
 */
export default function VerificationForm({ 
  searchType, 
  setSearchType, 
  searchValue, 
  setSearchValue, 
  onSubmit, 
  isSearching 
}) {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Typography variant="body" color="white" style={{ marginBottom: '0.5rem' }}>
          Search Type
        </Typography>
        <select 
          value={searchType} 
          onChange={(e) => setSearchType(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            fontSize: '1rem'
          }}
        >
          <option value="txId">Transaction ID</option>
          <option value="credentialId">Credential ID</option>
        </select>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <Typography variant="body" color="white" style={{ marginBottom: '0.5rem' }}>
          {searchType === "txId" ? "Transaction ID" : "Credential ID"}
        </Typography>
        <input
          type="text"
          placeholder={`Enter ${searchType === "txId" ? "Transaction" : "Credential"} ID`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            fontSize: '1rem'
          }}
          required
        />
      </div>

      <Button 
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isSearching || !searchValue.trim()}
        loading={isSearching}
      >
        {isSearching ? "Verifying..." : "Verify Candidate Credential"}
      </Button>
    </form>
  );
}
