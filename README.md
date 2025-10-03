# GPA Calculator Web Application

A full-stack web application for calculating and managing Grade Point Average (GPA) with real-time payment integration and advanced features.

## Features

### Core Functionality
- **GPA Calculation**: Calculate GPA using 4.0 and 10.0 scale systems
- **Grade Management**: Add, edit, and track grades for subjects across semesters
- **Semester Organization**: Create and manage multiple academic semesters
- **Real-time Analytics**: Interactive line charts showing GPA trends over time
- **Grade Classification**: Automatic classification (Excellent, Good, Average, etc.)

### User Management
- **Authentication**: Secure login/register with JWT tokens
- **Google OAuth**: Login with Google account
- **Password Reset**: OTP-based password recovery system
- **User Profiles**: Personal information management
- **Premium Features**: Payment integration for enhanced features

### Payment System
- **SePay Integration**: QR code payment via Vietnamese banking system
- **Real-time Notifications**: Socket.io for instant payment confirmation
- **Premium Membership**: Extended account validity and features

## Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.io** for real-time communication
- **Passport.js** for Google OAuth
- **SePay API** for payment processing
- **Bcrypt** for password hashing

### Frontend
- **React 19** with modern hooks
- **Ant Design** for UI components
- **React Router v7** for navigation
- **Axios** for API communication
- **Socket.io Client** for real-time updates
- **Framer Motion** for animations
- **SASS/SCSS** for styling
- **React Bootstrap** for responsive design

## Project Structure

```
cal-be-fe/
├── gpa-cal-be/                 # Backend API
│   ├── src/
│   │   ├── controllers/        # Business logic
│   │   ├── models/            # Database schemas
│   │   ├── routes/            # API endpoints
│   │   ├── services/          # External services
│   │   ├── middlewares/       # Authentication & validation
│   │   └── socket.js          # Real-time communication
│   └── package.json
│
├── gpa-cal-fe/                # Frontend React App
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── routes/           # Routing configuration
│   │   ├── func/             # Custom hooks & utilities
│   │   ├── constants/        # App constants
│   │   └── style/            # SASS stylesheets
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cal-be-fe/gpa-cal-be
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../gpa-cal-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
## Key Features Explained

### GPA Calculation System
- Supports both 4.0 and 10.0 grading scales
- Automatic conversion between scales
- Letter grade mapping (A+, A, B+, B, etc.)
- Weighted GPA calculation by credit hours

### Real-time Features
- Live payment notifications via Socket.io
- Instant GPA updates across sessions
- Real-time grade analytics

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- CSRF protection
- Secure cookie handling
- Input validation and sanitization

## Development

### Available Scripts

**Backend:**
- `npm start` - Start development server with nodemon
- `npm test` - Run tests (placeholder)

**Frontend:**
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App

### Database Models

- **User**: Authentication and profile information
- **Subject**: Course information with credit hours
- **Grade**: Individual grades linked to subjects and semesters
- **Semester**: Academic term organization

## Deployment

### Production Build
1. Build the frontend: `npm run build`
2. Set production environment variables
3. Start the backend server
4. Serve the built frontend files

### Environment Variables for Production
Ensure all required environment variables are set with production values, including:
- Database connection strings
- JWT secrets
- Payment API keys
- CORS origins

## Features Overview

- **Dashboard**: Overview of GPA, total credits, completed subjects
- **Grade Management**: Add/edit grades with semester organization
- **Analytics**: Visual GPA trends with interactive charts
- **Payment Integration**: SePay QR code payments
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live notifications and data sync

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Contact

- Email: adpagegpa123@gmail.com
- Location: Ho Chi Minh, Vietnam

---

**Built with ❤️ for students to track their academic progress efficiently.**
