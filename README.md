# 🔐 Password Generator

A beautiful, professional password generator built with **Next.js (App Router)** and **TypeScript**. Features a clean, modern UI with real-time password strength indicators and secure password generation.

---

## ✨ Features

- **Secure Password Generation** - Uses `crypto.getRandomValues` for cryptographically secure random generation
- **Customizable Length** - Adjust password length from 6 to 32 characters with an intuitive slider
- **Character Type Options** - Toggle between:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Symbols (!@#$%^&\*...)
- **Real-time Strength Indicator** - Visual password strength meter with color-coded feedback (Weak/Medium/Strong)
- **One-Click Copy** - Copy passwords to clipboard with visual feedback
- **Clean Architecture** - Separated logic and UI layers for maintainability
- **Type-Safe** - Full TypeScript implementation with proper type definitions
- **Modern UI** - Beautiful dark theme with gradient accents and smooth animations

---

## 🧠 Tech Stack

- **Next.js 16** (App Router)
- **TypeScript** - Full type safety
- **React 19** - Latest React features with hooks
- **Tailwind CSS 4** - Modern utility-first styling
- **Inter Font** - Clean, professional typography
- **JetBrains Mono** - Monospace font for password display

---

## 📁 Project Structure

```
password-generator/
├── app/
│   ├── layout.tsx          # Root layout with font configuration
│   ├── page.tsx            # Main UI component
│   └── globals.css         # Global styles and Tailwind config
├── lib/
│   └── password-generator.ts  # Password generation logic & utilities
└── public/                 # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd password-generator
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## 🎨 Usage

1. **Adjust Password Length** - Use the slider to set your desired password length (6-32 characters)
2. **Select Character Types** - Toggle the checkboxes to include/exclude uppercase, lowercase, numbers, and symbols
3. **Generate Password** - Click the "Generate New Password" button to create a new password
4. **Copy Password** - Click the "Copy" button to copy the password to your clipboard
5. **Check Strength** - View the real-time password strength indicator below the password field

---

## 🔒 Security

- Uses `crypto.getRandomValues()` for cryptographically secure random number generation
- No password data is stored or transmitted
- All generation happens client-side
- Validates that at least one character type is selected

---

## 👨‍💻 Author

**Benyamin Naderi**

---

## 📝 License

This project is open source and available for personal and commercial use.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
