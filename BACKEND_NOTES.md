#  Notes
### User Roles in This Web App
- **Education Provider** 
- **HR Verifier** 
- **Admin** (under education provider) 

---

## 🔗 Frontend-Backend Connection Explanation

### `VITE_API_BASE_URL`

This is an **environment variable** used to configure the backend API base URL.


- The frontend uses this variable to know where the backend API is located
- Different backend URLs can be used for development and production environments

**How does it work**
1. The frontend will set this in a `.env` file:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

2. The frontend code will automatically read this variable and send all API requests to:
   - `http://localhost:3000/api` + endpoint path

**Example:**
- Setting `VITE_API_BASE_URL=http://localhost:3000/api`
- Frontend wants to call `/auth/provider/login` endpoint
- Actual request will be sent to: `http://localhost:3000/api/auth/provider/login`

**For  backend:**
- Only need to provide API endpoints (e.g., `/api/auth/login`)
- The frontend will automatically prepend the base URL set in `.env`
- So  backend should have routes like: `http://your-server-address:port/api/...`

---

## Authentication Method

### Session Cookie Authentication

Frontend uses **Session Cookie** authentication:

1. **During login**:
   - Frontend sends POST request to backend
   - After successful validation, backend sets session cookie
   - Subsequent frontend requests will automatically include this cookie

2. **Subsequent requests**:
   - Frontend automatically includes the cookie in every request
   - Backend can read user information from the session

3. **CORS Configuration** (Important!):
   ```javascript
   // Backend needs to allow frontend origin
   app.use(cors({
     origin: 'http://localhost:5173', // Frontend dev server address
     credentials: true,  // Allow cookies
   }));
   ```

4. **Session Cookie Configuration**:
   ```javascript
   app.use(session({
     secret: 'your-secret-key',
     resave: false,
     saveUninitialized: false,
     cookie: {
       secure: false, // false for dev, true for production (requires HTTPS)
       httpOnly: true,
       sameSite: 'lax' // or 'none' (if cross-origin)
     }
   }));
   ```

---

## 📋 Required API Endpoints

### 1. Authentication

#### 1.1 Provider Login
```
POST /api/auth/provider/login
Content-Type: application/json

Request Body:
{
  "username": "admin",
  "password": "admin123"
}

Response (200):
{
  "success": true,
  "user": {
    "userId": "provider_001",
    "username": "admin",
    "email": "admin@university.edu",
    "name": "Education Admin",
    "role": "provider"
  }
}

Response (401):
{
  "error": "Invalid username or password"
}
```

#### 1.2 Verifier Login
```
POST /api/auth/verifier/login
Content-Type: application/json

Request Body:
{
  "username": "verifier1",
  "password": "verify123"
}

Response (200):
{
  "success": true,
  "user": {
    "userId": "verifier_001",
    "username": "verifier1",
    "email": "verifier@company.com",
    "name": "HR Verifier",
    "role": "verifier"
  }
}
```

#### 1.3 Get Current User Info
```
GET /api/auth/me

Response (200):
{
  "success": true,
  "user": {
    "userId": "provider_001",
    "username": "admin",
    "email": "admin@university.edu",
    "name": "Education Admin",
    "role": "provider"
  }
}

Response (401):
{
  "error": "Not authenticated"
}
```

#### 1.4 Logout
```
POST /api/auth/logout

Response (200):
{
  "success": true
}
```

---

### 2. Admin Functions (requires provider role with username "admin")

#### 2.1 Create User
```
POST /api/admin/users
Content-Type: application/json

Request Body:
{
  "email": "newuser@example.com",
  "password": "password123",
  "role": "provider"  | "hr verifier" | 
}

Response (200):
{
  "success": true,
  "user": {
    "userId": "user_001",
    "email": "newuser@example.com",
    "role": "provider",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 3. Provider Functions (Subject Management)

#### 3.1 List All Subjects
```
GET /api/provider/subjects

Response (200):
{
  "success": true,
  "subjects": [
    {
      "subjectId": "subject_001",
      "code": "SUB101",
      "title": "Introduction to Computer Science",
      "description": "Basic computer science concepts",
      "publicKey": "subject_public_key_001"
    }
  ]
}
```

#### 3.2 Create Subject
```
POST /api/provider/subjects
Content-Type: application/json

Request Body:
{
  "code": "SUB101",
  "title": "Introduction to Computer Science",
  "description": "Basic computer science concepts",
  "publicKey": "subject_public_key_001"
}

Response (200):
{
  "success": true,
  "subject": {
    "subjectId": "subject_001",
    "code": "SUB101",
    "title": "Introduction to Computer Science",
    "description": "Basic computer science concepts",
    "publicKey": "subject_public_key_001"
  }
}
```

#### 3.3 Get Subject
```
GET /api/provider/subjects/:subjectId

Response (200):
{
  "success": true,
  "subject": {
    "subjectId": "subject_001",
    "code": "SUB101",
    "title": "Introduction to Computer Science",
    "description": "Basic computer science concepts",
    "publicKey": "subject_public_key_001"
  }
}
```

---

### 4. Provider Functions (Subject Class Management)

#### 4.1 List Subject Classes
```
GET /api/provider/subjects/:subjectId/classes

Response (200):
{
  "success": true,
  "subjectClasses": [
    {
      "subjectClassId": "subjectClass_001",
      "subjectId": "subject_001",
      "code": "SUB101-01",
      "title": "Python Programming Basics",
      "description": "Introduction to Python programming"
    }
  ]
}
```

#### 4.2 Create Subject Class
```
POST /api/provider/subjects/:subjectId/classes
Content-Type: application/json

Request Body:
{
  "code": "SUB101-01",
  "title": "Python Programming Basics",
  "description": "Introduction to Python programming"
}

Response (200):
{
  "success": true,
  "subjectClass": {
    "subjectClassId": "subjectClass_001",
    "subjectId": "subject_001",
    "code": "SUB101-01",
    "title": "Python Programming Basics",
    "description": "Introduction to Python programming"
  }
}
```

---

### 5. Provider Functions (Exam Management)

#### 5.1 List All Exams
```
GET /api/provider/exams
or
GET /api/provider/subjects/:subjectId/classes/:classId/exams

Response (200):
{
  "success": true,
  "exams": [
    {
      "examId": "exam_001",
      "subjectClassId": "subjectClass_001",
      "code": "SUB101-01-EXAM",
      "title": "Python Programming Exam",
      "description": "Comprehensive Python programming skills exam",
      "publicKey": "exam_public_key_001",
      "score": 100,
      "totalQuestions": 3,
      "timeLimit": 1800,
      "difficulty": "intermediate",
      "questions": [
        {
          "questionId": "q1",
          "text": "What will be the output...",
          "options": ["14", "20", "11"],
          "correctAnswer": "14"
        }
      ],
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### 5.2 Get Exam Details
```
GET /api/provider/exams/:examId

Response (200):
{
  "success": true,
  "exam": {
    "examId": "exam_001",
    "subjectClassId": "subjectClass_001",
    "code": "SUB101-01-EXAM",
    "title": "Python Programming Exam",
    "description": "Comprehensive Python programming skills exam",
    "publicKey": "exam_public_key_001",
    "score": 100,
    "questions": [...],
    "timeLimit": 1800,
    "difficulty": "intermediate"
  }
}
```

#### 5.3 Create Exam
```
POST /api/provider/subjects/:subjectId/classes/:classId/exams
Content-Type: application/json

Request Body:
{
  "code": "SUB101-01-EXAM",
  "title": "Python Programming Exam",
  "description": "Comprehensive Python programming skills exam",
  "publicKey": "exam_public_key_001",
  "score": 100,
  "questions": [
    {
      "questionId": "q1",
      "text": "What will be the output...",
      "options": ["14", "20", "11"],
      "correctAnswer": "14",
      "explanation": "Optional explanation"
    }
  ],
  "timeLimit": 1800,
  "difficulty": "intermediate",
  "skills": ["Python Basics"]
}

Response (200):
{
  "success": true,
  "exam": {
    "examId": "exam_001",
    ...
  }
}
```

#### 5.4 Get Available Exams (for students)
```
GET /api/exams/available

Response (200):
{
  "success": true,
  "exams": [...]
}
```

#### 5.5 Evaluate Exam
```
POST /api/exams/:examId/evaluate
Content-Type: application/json

Request Body:
{
  "answers": ["14", "list", "dict = {key: value}"]
}

Response (200):
{
  "success": true,
  "result": {
    "score": 100,
    "maxScore": 100,
    "correctAnswers": 3,
    "totalQuestions": 3,
    "passed": true
  }
}
```

---

### 6. Provider Functions (Credential Management)

#### 6.1 Issue Credential
```
POST /api/provider/credentials
Content-Type: application/json

Request Body:
{
  "studentId": "student_001",
  "studentName": "John Doe",
  "examId": "exam_001",
  "score": 85
}

Response (200):
{
  "success": true,
  "credential": {
    "credentialId": "cred_001",
    "studentId": "student_001",
    "studentName": "John Doe",
    "examId": "exam_001",
    "score": 85,
    "txId": "0x123abc456def",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### 6.2 List All Credentials
```
GET /api/provider/credentials

Response (200):
{
  "success": true,
  "credentials": [
    {
      "credentialId": "cred_001",
      "studentId": "student_001",
      "studentName": "John Doe",
      "examId": "exam_001",
      "score": 85,
      "txId": "0x123abc456def",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### 6.3 Get Credential
```
GET /api/provider/credentials/:credentialId

Response (200):
{
  "success": true,
  "credential": {
    "credentialId": "cred_001",
    ...
  }
}
```

---

### 7. Provider Functions (Blockchain Transaction Records)

#### 7.1 List All Blockchain Transactions
```
GET /api/provider/blockchain/transactions

Response (200):
{
  "success": true,
  "transactions": [
    {
      "txId": "0x123abc456def",
      "credentialId": "cred_001",
      "studentName": "John Doe",
      "score": 85,
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### 7.2 Get Transaction Details
```
GET /api/provider/blockchain/transactions/:txId

Response (200):
{
  "success": true,
  "transaction": {
    "txId": "0x123abc456def",
    "credentialId": "cred_001",
    "blockNumber": 12345,
    "timestamp": "2024-01-15T10:30:00Z",
    "hash": "block_hash_here"
  }
}
```

---

### 8. Verifier Functions (Credential Verification)

#### 8.1 Verify by Transaction ID
```
POST /api/verify/transaction
Content-Type: application/json

Request Body:
{
  "txId": "0x123abc456def"
}

Response (200):
{
  "success": true,
  "valid": true,
  "credential": {
    "credentialId": "cred_001",
    "studentId": "student_001",
    "studentName": "John Doe",
    "examId": "exam_001",
    "score": 85,
    "txId": "0x123abc456def",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}

Response (404):
{
  "success": false,
  "valid": false,
  "error": "Transaction not found or invalid"
}
```

#### 8.2 Verify by Credential ID
```
POST /api/verify/credential
Content-Type: application/json

Request Body:
{
  "credentialId": "cred_001"
}

Response (200):
{
  "success": true,
  "valid": true,
  "credential": {
    "credentialId": "cred_001",
    ...
  }
}
```

#### 8.3 Verify by Token (Universal, can be txId or credentialId)
```
POST /api/verify/token
Content-Type: application/json

Request Body:
{
  "tokenId": "0x123abc456def" // or "cred_001"
}

Response (200):
{
  "success": true,
  "valid": true,
  "credential": {
    ...
  },
  "tokenId": "0x123abc456def",
  "verificationDate": "2024-01-15T10:30:00Z"
}
```

#### 8.4 Get All Credentials for a Student
```
GET /api/verify/students/:studentId/credentials

Response (200):
{
  "success": true,
  "studentId": "student_001",
  "studentName": "John Doe",
  "totalCredentials": 3,
  "passedCredentials": 2,
  "averageScore": 78,
  "credentials": [
    {
      "credentialId": "cred_001",
      "studentId": "student_001",
      "studentName": "John Doe",
      "examId": "exam_001",
      "score": 85,
      "txId": "0x123abc456def",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## 📝 Data Structure Specifications

### User Object
```javascript
{
  "userId": "string",
  "username": "string",
  "email": "string",
  "name": "string",
  "role": "provider" | "verifier" | "admin" | "student" | "hr" | "instructor"
}
```

### Subject Object
```javascript
{
  "subjectId": "string",
  "code": "string",
  "title": "string",
  "description": "string",
  "publicKey": "string"
}
```

### SubjectClass Object
```javascript
{
  "subjectClassId": "string",
  "subjectId": "string",
  "code": "string",
  "title": "string",
  "description": "string"
}
```

### Exam Object
```javascript
{
  "examId": "string",
  "subjectClassId": "string",
  "code": "string",
  "title": "string",
  "description": "string",
  "publicKey": "string",
  "score": "number",
  "questions": [
    {
      "questionId": "string",
      "text": "string",
      "options": ["string"],
      "correctAnswer": "string",
      "explanation": "string (optional)"
    }
  ],
  "totalQuestions": "number",
  "timeLimit": "number (seconds)",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "skills": ["string"],
  "createdAt": "ISO 8601 string"
}
```

### Credential Object
```javascript
{
  "credentialId": "string",
  "studentId": "string",
  "studentName": "string",
  "examId": "string",
  "score": "number",
  "txId": "string (blockchain transaction ID)",
  "timestamp": "ISO 8601 string"
}
```

---

## Permission Control

### Provider Endpoints
- Requires login with `role === "provider"`
- Can manage subjects, classes, exams, credentials

### Verifier Endpoints
- Requires login with `role === "verifier"`
- Can only verify credentials, cannot modify data

### Admin Endpoints
- Requires login with `role === "provider"` AND `username === "admin"`
- Can create users

---

## ✅ Checklist

### Backend Implementation Tasks

- [ ] Provider login (`/api/auth/provider/login`)
- [ ] Verifier login (`/api/auth/verifier/login`)
- [ ] Get current user (`/api/auth/me`)
- [ ] Logout (`/api/auth/logout`)
- [ ] Create user - Admin only (`/api/admin/users`)
- [ ] List subjects (`/api/provider/subjects`)
- [ ] Create subject (`/api/provider/subjects`)
- [ ] Get subject (`/api/provider/subjects/:id`)
- [ ] List subject classes (`/api/provider/subjects/:id/classes`)
- [ ] Create subject class (`/api/provider/subjects/:id/classes`)
- [ ] List exams (`/api/provider/exams`)
- [ ] Get exam (`/api/provider/exams/:id`)
- [ ] Create exam (`/api/provider/subjects/:id/classes/:id/exams`)
- [ ] Get available exams (`/api/exams/available`)
- [ ] Evaluate exam (`/api/exams/:id/evaluate`)
- [ ] Issue credential (`/api/provider/credentials`)
- [ ] List credentials (`/api/provider/credentials`)
- [ ] Get credential (`/api/provider/credentials/:id`)
- [ ] List blockchain transactions (`/api/provider/blockchain/transactions`)
- [ ] Get transaction (`/api/provider/blockchain/transactions/:id`)
- [ ] Verify transaction (`/api/verify/transaction`)
- [ ] Verify credential (`/api/verify/credential`)
- [ ] Verify token (`/api/verify/token`)
- [ ] Get student credentials (`/api/verify/students/:id/credentials`)

