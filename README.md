# MUI File Uploader

A simple and customizable file uploader component built with React, TypeScript, and Material-UI, designed to integrate seamlessly into your projects.

## Features

- Drag-and-drop file upload support.
- Customizable styles using Material-UI.
- File validation (size, type, etc.).
- Multiple file upload support.
- Lightweight and easy to use.

## Installation

Install the package using npm or yarn:

```bash
npm install mui-file-uploader
# or
yarn add mui-file-uploader
```

## Usage

Here’s a basic example of how to use the MUI File Uploader:

```tsx
import React from "react";
import { FileUploader } from "mui-file-uploader";

const App = () => {
  const handleFilesChange = (files: File[]) => {
    console.log("Uploaded files:", files);
  };

  return (
    <div>
      <h1>Upload your files</h1>
      <FileUploader onFilesChange={handleFilesChange} />
    </div>
  );
};

export default App;
```

## Props

| Prop            | Type                      | Default     | Description                                 |
| --------------- | ------------------------- | ----------- | ------------------------------------------- |
| `onFilesChange` | `(files: File[]) => void` | `undefined` | Callback triggered when files are uploaded. |
| `maxFileSize`   | `number`                  | `Infinity`  | Maximum file size allowed (in bytes).       |
| `acceptedTypes` | `string[]`                | `[]`        | Array of accepted file MIME types.          |
| `multiple`      | `boolean`                 | `true`      | Allow multiple file uploads.                |

## Development

To contribute or modify the package, clone the repository and install dependencies:

```bash
git clone https://github.com/your-repo/mui-file-uploader.git
cd mui-file-uploader
npm install
```

Run the development server:

```bash
npm start
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

This project is built using:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://mui.com/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)

Feel free to contribute or report issues on the [GitHub repository](https://github.com/your-repo/mui-file-uploader).
