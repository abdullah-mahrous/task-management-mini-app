# Task Management Mini App

A modern task management application built with **Vue 3**, **TypeScript**, **Pinia**, and **Tailwind CSS**.

---

## ✨ Features

### 📋 Task Management

- Create new tasks
- Edit existing tasks
- Delete tasks with a confirmation modal
- View task details on a dedicated page
- Display task title, description, status, and due date

### 🔍 Search & Filtering

- Search tasks by title
- Filter tasks by status:
  - Pending
  - In Progress
  - Done

### ✅ Validation

- Title is required
- Due date must be in the future
- Client-side validation with descriptive error messages

### 🎨 User Experience

- Fully responsive design
- Loading state while fetching data
- Error state handling
- Empty state when no tasks are available
- 404 Not Found page
- Accessible forms and modal dialogs
- Delete confirmation modal

### 🏗️ Architecture

- Vue 3 Composition API
- Pinia for state management
- Vue Router
- Reusable UI components
- Service layer abstraction
- Utility-based validation
- TypeScript throughout the project

### 🧪 Testing

- Unit tests using Vitest
- Validation tests
- Pinia store tests
- Search & filtering tests

---

## 🛠️ Tech Stack

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Tailwind CSS
- Vitest

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

Clone the repository

```bash
git clone https://github.com/abdullah-mahrous/task-management-mini-app
```

Navigate to the project

```bash
cd task-management-mini-app
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## 🧪 Running Tests

Run all unit tests

```bash
npm run test
```

Run tests once

```bash
npm run test:run
```

Generate coverage

```bash
npm run coverage
```

---

## 📦 Build for Production

```bash
npm run build
```

Preview the production build

```bash
npm run preview
```

---

## 📷 Pages

- Home
- Add Task
- Edit Task
- Task Details
- 404 Not Found

---

## 💡 Notes

This project follows a modular architecture by separating responsibilities into components, services, stores, utilities, and composables. It emphasizes maintainability, scalability, and code readability while providing a clean and responsive user experience.
