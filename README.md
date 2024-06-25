# Text to PDF Converter

### Overview
This React application allows users to convert their text input into a PDF document. To use the application, simply enter your text input and press the ‘Convert to PDF’ button. The converted PDF will appear below in the converting history section. To view a previously converted PDF, click on it in the history section.

### Technologies
JavaScript, TypeScript, React, HTML, Tailwind CSS.

### Third-Party Libraries
React-PDF: Used for rendering PDF documents in the application.

### Component Hierarchy
The React components in this application are organized hierarchically, with each component representing a specific part of the user interface. The following diagram illustrates the component structure:

```bash
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── HistoryBlock
│   │   │   └── HistoryBlock.tsx
│   │   ├── HistoryItem
│   │   │   └── HistoryItem.tsx
│   │   ├── PDFViewer
│   │   │   ├── PDFViewer.scss
│   │   │   └── PDFViewer.tsx
│   │   └── UserInputBlock
│   │       └── UserInputBlock.tsx
│   ├── constants
│   │   └── constants.ts
│   ├── index.scss
│   ├── main.tsx
│   ├── types
│   │   └── types.ts
│   ├── utils
│   │   ├── convertTextToPdf.test.ts
│   │   └── helpers.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Component Descriptions
- **UserInputBlock:** Displays and submits the form with the user’s text input.
- **HistoryBlock:** Represents the list of previously converted documents and allows opening each PDF.
- **HistoryItem:** Displays an individual item from the conversion history.
- **PDFViewer:** Shows the opened PDF document.

### Additional Directories
- **constants:** Contains constant values used across the application.
- **types:** Contains TypeScript interfaces.
- **utils:** Contains helper functions and tests for the main helper function (**convertTextToPdf** function).

### API Integration
The convertTextToPdf function makes a GET request to the backend API and returns a Promise that resolves with the response data from the API. This function also saves the PDF file to localStorage.
