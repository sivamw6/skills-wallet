# 🎓 Digital Skills Wallet - PoC Frontend

A React + Vite-based Proof of Concept frontend application for Digital Skills Wallet, designed for educational institutions and HR departments to issue, manage, and verify digital credentials.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation & Setup](#-installation--setup)
- [System Architecture](#-system-architecture)
- [User Roles](#-user-roles)
- [User Guide](#-user-guide)
- [API Specification](#-api-specification)
- [UI Component Library](#-ui-component-library)
- [Development Guide](#-development-guide)

## ✨ Features

### 🎯 Core Features
- **Digital Credential Issuance** - Educational institutions can issue blockchain-verified digital credentials
- **Real-time Verification** - HR departments can instantly verify candidate skill credentials
- **Blockchain Records** - All credentials are recorded on a simulated blockchain ensuring immutability
- **Role-based Access Control** - Separate permissions for Education Providers and Verifiers

### 🎨 Design Features
- **Dark Blue-Black Theme** - Modern dark theme design
- **Responsive Layout** - Adapts to various screen sizes
- **Glassmorphism Effects** - Beautiful visual effects
- **Unified UI Components** - Consistent user experience

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - Modern UI framework
- **Vite** - Fast build tool
- **React Router** - Client-side routing

### Styling System
- **SCSS Modules** - Modular styling management
- **CSS Variables** - Global design tokens
- **Mixins** - Reusable style patterns

### Development Tools
- **ESLint** - Code quality checking
- **PWA Ready** - Progressive Web App support

## 🚀 Installation & Setup

### Requirements
- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation Steps

```bash
# Clone the project
git clone <repository-url>
cd skills-wallet

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
Runs by default on `http://localhost:5173`, will automatically find available ports if occupied.

## 🏗️ System Architecture

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI component library
│   └── verifier/       # Verifier-specific components
├── pages/              # Page components
│   ├── provider/       # Education provider pages
│   └── verifier/       # Verifier pages
├── service/            # API service layer
├── styles/             # Global styles
└── App.jsx            # Main application
```

## 👥 User Roles

### 🎓 Education Provider
- **Permissions**: Issue credentials, manage exams, view records
- **Features**:
  - Create and manage exams
  - Issue digital credentials
  - View all issued credentials
  - Manage student information

### 🔍 Verifier (HR)
- **Permissions**: Verify credentials, view credential details
- **Features**:
  - Verify credentials using Transaction ID or Credential ID
  - View complete candidate credential information
  - Confirm credential authenticity

## 📖 User Guide

### 🚪 Login System

#### Demo Accounts
| Role | Account | Password | Description |
|------|---------|----------|-------------|
| Education Provider | Demo as Provider | provider123 | Education provider account |
| Verifier (HR) | Demo as HR | verifier123 | Human resources verifier account |

#### Login Steps
1. Navigate to login page
2. Select corresponding demo account
3. Click login button
4. System automatically redirects to appropriate dashboard

### 🎓 Education Provider Workflow

#### 1. Issue Credential Flow
```
Login → Provider Dashboard → Issue Credential → Fill Student Info → Issue Credential
```

#### 2. Manage Student Information
```
Provider Dashboard → Click Student Name → Student Detail → View Complete Records
```

#### 3. View Blockchain Records
```
Provider Dashboard → View Records → Blockchain Records → View All Transactions
```

#### Detailed Operation Steps

**Issuing Credentials:**
1. Login and access Provider Dashboard
2. Click "Issue Credential" card
3. Fill in student information:
   - Student ID (required)
   - Student Name (required)
   - Exam ID (dropdown selection)
   - Score (manual input or auto-filled from exam results)
4. Click "Issue Credential" button
5. System generates Transaction ID (Token)
6. Credential successfully issued, view detailed information

**Viewing Student Details:**
1. In Provider Dashboard's "Recently Issued Credentials" section
2. Click any student's name (blue underlined text)
3. Enter student detail page, view:
   - Student statistics (total credentials, average score, passed exams)
   - All issued credentials
   - Complete blockchain transaction records

### 🔍 Verifier (HR) Workflow

#### Credential Verification Flow
```
Login → Verifier Dashboard → Input Token → Verify → View Candidate Info
```

#### Detailed Operation Steps

**Verifying Candidate Credentials:**
1. Login and access Verifier Dashboard
2. Choose verification method:
   - **Transaction ID**: Use blockchain transaction ID
   - **Credential ID**: Use credential ID
3. Enter corresponding ID in input field
4. Click "Verify Candidate Credential" button
5. System displays verification result:
   - ✅ **Verification Success**: Shows complete candidate credential information
   - ❌ **Verification Failed**: Shows error message

**Verification Results Include:**
- Candidate name and ID
- Exam information and score
- Credential issue date
- Blockchain transaction ID
- Credential validity confirmation

### 📝 Taking Exams

#### Exam Flow
```
Provider Dashboard → Take Exam → Answer Python Questions → Get Score → Issue Credential
```

#### Python Exam Content
Exam includes 3 Python programming fundamental questions:

1. **Operator Precedence**
   - Question: Output result of `print(2 + 3 * 4)`
   - Answer: 14 (multiplication takes precedence over addition)

2. **Data Types**
   - Question: Which Python data type is mutable?
   - Answer: list (lists are mutable, strings and tuples are immutable)

3. **Dictionary Syntax**
   - Question: Correct syntax for creating dictionary in Python
   - Answer: `dict = {key: value}`

## 🔌 API Specification

### Endpoint Structure

#### Authentication Endpoints
```javascript
POST /auth/login
{
  "email": "admin@university.edu",
  "password": "admin123",
  "role": "provider" // "provider", "verifier"
}
```

#### Education Provider Endpoints
```javascript
// Issue credential
POST /providers/credentials
{
  "studentId": "student_001",
  "studentName": "John Doe",
  "examId": "exam_001",
  "score": 85
}

// Create exam
POST /providers/exams
{
  "title": "Python Programming Exam",
  "questions": [...]
}
```

#### Verifier Endpoints
```javascript
// Verify using Transaction ID
POST /verifiers/verify/transaction
{
  "txId": "0x123abc456def"
}

// Verify using Credential ID
POST /verifiers/verify/credential
{
  "credentialId": "cred_003"
}
```

#### Blockchain Endpoints
```javascript
// Get transaction details
GET /blockchain/transactions/{txId}

// List all transactions
GET /blockchain/transactions
```

### Data Models

#### Credential
```javascript
{
  "credentialId": "cred_003",
  "studentId": "student_001",
  "studentName": "John Doe",
  "examId": "exam_001",
  "score": 85,
  "txId": "0x123abc456def",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Exam
```javascript
{
  "examId": "exam_001",
  "title": "Python Programming Exam",
  "questions": [
    {
      "questionId": "q1",
      "text": "What will be the output...",
      "options": ["14", "20", "11"],
      "correctAnswer": "14"
    }
  ]
}
```

## 🎨 UI Component Library

### Core Components

#### Container
```jsx
<Container variant="default" size="lg" fullHeight>
  {/* content */}
</Container>
```

#### Card
```jsx
<Card variant="glass" size="lg" spacing="lg">
  <Typography variant="h2" color="white">Title</Typography>
</Card>
```

#### Button
```jsx
<Button 
  variant="primary" 
  size="lg" 
  fullWidth
  as={Link} 
  to="/path"
>
  Button Text
</Button>
```

#### Typography
```jsx
<Typography variant="h1" gradient primary>
  Main Title
</Typography>
<Typography variant="body" color="white">
  Body text
</Typography>
```

#### Input
```jsx
<Input
  variant="dark"
  size="lg"
  type="text"
  placeholder="Enter text"
  required
/>
```

#### Badge
```jsx
<Badge variant="success" size="lg">
  85%
</Badge>
```

### Component Variants

#### Button Variants
- **variant**: `primary`, `secondary`, `success`, `danger`
- **size**: `sm`, `md`, `lg`
- **states**: `loading`, `disabled`, `fullWidth`

#### Card Variants
- **variant**: `glass`, `dark`
- **size**: `sm`, `md`, `lg`
- **spacing**: `none`, `sm`, `md`, `lg`

#### Typography Variants
- **variant**: `h1`, `h2`, `h3`, `h4`, `h5`, `body`, `caption`
- **color**: `primary`, `secondary`, `white`, `gray`, `success`, `warning`, `error`
- **gradient**: `primary` (gradient effect)

## 🛠️ Development Guide

### Project Structure

```
src/
├── components/
│   ├── ui/                    # UI component library
│   │   ├── Button.jsx         # Button component
│   │   ├── Card.jsx           # Card component
│   │   ├── Container.jsx      # Container component
│   │   ├── Typography.jsx     # Typography component
│   │   ├── Input.jsx          # Input component
│   │   ├── Badge.jsx          # Badge component
│   │   ├── Grid.jsx           # Grid component
│   │   ├── Select.jsx         # Select component
│   │   ├── FormGroup.jsx      # Form group component
│   │   ├── Divider.jsx        # Divider component
│   │   ├── ErrorMessage.jsx   # Error message component
│   │   ├── Header.jsx         # Header component
│   │   └── index.js           # Component exports
│   └── verifier/              # Verifier-specific components
│       ├── VerificationForm.jsx    # Verification form
│       ├── VerificationResult.jsx  # Verification result
│       ├── HelpSection.jsx         # Help section
│       └── index.js                # Component exports
├── pages/
│   ├── Login.jsx              # Login page
│   ├── provider/              # Education provider pages
│   │   ├── ProviderDashboard.jsx   # Provider dashboard
│   │   ├── IssueCredential.jsx     # Issue credential page
│   │   ├── BlockchainRecords.jsx   # Blockchain records page
│   │   ├── StudentDetail.jsx       # Student detail page
│   │   ├── SubjectManagement.jsx   # Subject management page
│   │   └── Exam.jsx                # Exam page
│   └── verifier/              # Verifier pages
│       └── VerifierDashboard.jsx   # Verifier dashboard
├── service/
│   ├── mockAPI.js             # Mock API
│   ├── apiClient.js           # API client
│   └── apiSpec.js             # API specification
├── styles/
│   ├── variables.scss         # SCSS variables
│   ├── mixins.scss            # SCSS mixins
│   ├── global.scss            # Global styles
│   └── design-system/         # Design system styles
└── App.jsx                    # Main application
```

### Styling System

#### SCSS Variables
```scss
// Color system
$primary: #4ecdc4;
$secondary: #2e86ab;
$success: #10b981;
$warning: #f59e0b;
$error: #ef4444;

// Spacing system
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;
```

#### SCSS Mixins
```scss
// Glassmorphism effect
@mixin glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

// Flex center
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Development Best Practices

#### 1. Component Development
- Use functional components and React Hooks
- Maintain single responsibility principle
- Use PropTypes or TypeScript for type checking

#### 2. Styling Management
- Prioritize UI component library usage
- Avoid inline styles, use SCSS Modules
- Maintain styling consistency

#### 3. State Management
- Use React Context for global state management
- Use useState and useEffect for local state
- Maintain state immutability

#### 4. Routing Management
- Use React Router for client-side routing
- Implement protected routes
- Maintain clear routing structure

### Code Quality

#### ESLint Rules
Project uses ESLint for code quality checking with main rules including:
- React best practices
- Modern JavaScript syntax
- Code style consistency

#### File Naming Conventions
- Component files use PascalCase: `Button.jsx`
- Style files use kebab-case: `button.module.scss`
- Utility files use camelCase: `mockAPI.js`

## 🚀 Development Build

### Build for Testing
```bash
npm run build
```

Built files will be generated in the `dist/` directory for testing purposes.

### PWA Configuration
Project is configured with PWA support including:
- Service Worker
- Web App Manifest
- Offline support

## 📞 Support & Contact

### Common Issues
1. **Node.js Version Warning**
   - Solution: Upgrade to Node.js 20.19+ or 22.12+

2. **Port Already in Use**
   - Solution: Vite will automatically find available ports, or manually specify port

3. **Styles Not Applied**
   - Check if SCSS files are properly imported
   - Confirm components use correct CSS classes

### Technical Support
- This is a Proof of Concept (PoC) project
- Currently using mock APIs for demonstration
- Backend integration coming soon

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Last Updated**: September 2025
**Version**: 1.0.0 (PoC)
**Maintainer**: Skillex - Digital Skills Wallet Team
**Status**: Proof of Concept - Mock API Implementation 