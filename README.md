# Test Genie

A modern, responsive quiz application with an AI assistant designed to help users create, manage, and take tests.

## Overview

Test Genie is a full-stack web application that provides an intuitive platform for quiz creation and management. The application features a sleek, modern UI with smooth animations and responsive design.

## Key Features

- **Quiz Creation and Management**: Create, edit, and delete quizzes
- **Interactive Quiz Taking**: Take quizzes with real-time feedback
- **Detailed Results**: View scores and performance analytics
- **AI Assistant**: Get help with a built-in chat interface
- **Modern UI**: Enjoy a responsive, animated interface with Tailwind CSS and Framer Motion
- **Authentication**: Secure user accounts with JWT

## Project Structure

The project is divided into two main parts:

### Client
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API requests

### Server
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- RESTful API design

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/test-genie.git
cd test-genie
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Set up environment variables:
Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/test-genie
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
npm start
```

5. Install client dependencies:
```bash
cd ../client
npm install
```

6. Start the client:
```bash
npm run dev
```

7. Access the application at `http://localhost:5174`

## Design System

Test Genie uses a consistent design system including:
- Custom color palette with primary, secondary, accent, and neutral colors
- Typography using Inter and Lexend fonts
- Consistent component styling with Tailwind CSS
- Smooth animations and transitions with Framer Motion

## Screenshots

- Dashboard view with quiz statistics and management
- Interactive quiz taking interface
- Results analysis with visual feedback
- AI Assistant chat interface

## Future Enhancements

- Quiz sharing and collaboration
- Advanced analytics
- More question types and formats
- Enhanced AI capabilities 