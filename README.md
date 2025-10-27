# Ask-The-Teacher
A full stack 2-role application that allows users to login with Microsoft or Google as either a student or a teacher. Students can submit questions to their teacher, and teachers can view, edit, and delete student submissions. The app will be built with React, C#, and Supabase.

# Ask-The-Teacher

A full stack 2-role application that allows users to login with Microsoft or Google as either a student or a teacher. Students can submit questions to their teacher, and teachers can view, edit, and delete student submissions. The app is built with React, C#, and Supabase.

## Features

- **OAuth Authentication**: Login with Microsoft Azure or Google
- **Role-Based Access**: Users select their role (Student or Teacher) on first login
- **Student Features**: Submit questions with title and detailed text
- **Teacher Features**: View all questions in a table, edit question details, delete questions

## Tech Stack

**Frontend:**
- React with Vite
- React Router for navigation
- Supabase Auth for authentication

**Backend:**
- ASP.NET Core Web API (C#)
- Supabase Client Library

**Database:**
- Supabase (PostgreSQL)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [.NET SDK](https://dotnet.microsoft.com/download) (v6.0 or higher)
- [Git](https://git-scm.com/)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Ask-The-Teacher.git
cd Ask-The-Teacher
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd AskTheTeacher
```

Install dependencies (if needed):
```bash
dotnet restore
```

Run the backend server:
```bash
dotnet run
```

The API will start on `http://localhost:5211`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd ask-the-teacher-ui
```

Install dependencies:
```bash
npm install
```

Run the frontend development server:
```bash
npm run dev
```

The app will start on `http://localhost:5173`

## Running the Application

1. Start the backend server (from the AskTheTeacher directory):
```bash
   dotnet run
```

2. Start the frontend server (from the ask-the-teacher-ui directory):
```bash
   npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

4. Login with Microsoft or Google

5. Select your role (Student or Teacher)

6. Start using the application!

## Usage

### As a Student:
- Submit questions by filling out the title and question text fields
- Click "Submit Question" to send your question to teachers

### As a Teacher:
- View all submitted questions in a table
- Click on a question title to view, edit, or delete it
- Use the "Delete" button to remove questions