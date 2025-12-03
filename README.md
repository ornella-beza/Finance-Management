# Finance Management App

A personal finance tracker application built with Vanilla JavaScript, HTML, CSS, and Firebase.

## Features

*   **Authentication:** Sign up and Login with Email/Password.
*   **Dashboard:** Overview of total balance, income, and expenses.
*   **Analytics:** Visual charts for Income vs. Expense and Spending by Category.
*   **Transactions:** Add, view, and delete income and expense transactions.
*   **Responsive Design:** Works on desktop and mobile devices.

## Prerequisites

*   A modern web browser (Chrome, Firefox, Safari, Edge).
*   An internet connection (for Firebase and Chart.js).

## How to Run

Since this project uses ES Modules (`import`/`export`) and Firebase, you cannot simply open `index.html` directly in the browser. You must serve it through a local web server.

### Option 1: Using Python (Recommended for Linux/macOS)

If you have Python installed (most Linux/macOS systems do):

1.  Open your terminal in the project directory.
2.  Run the following command:

    ```bash
    python3 -m http.server 8000
    ```

3.  Open your browser and go to: `http://localhost:8000`

### Option 2: Using Node.js (npx)

If you have Node.js installed:

1.  Open your terminal.
2.  Run:

    ```bash
    npx http-server .
    ```

3.  Visit the URL shown in the terminal (usually `http://127.0.0.1:8080`).

### Option 3: VS Code Live Server

If you are using Visual Studio Code:

1.  Install the "Live Server" extension.
2.  Right-click on `index.html`.
3.  Select "Open with Live Server".

## Configuration

The Firebase configuration is located in `js/firebase-config.js`. It has already been set up with the provided credentials.
