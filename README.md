<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ChronoSnap

ChronoSnap is a web application that takes a user's photo and uses AI to reimagine them in various historical eras. From the Victorian Era to the Grunge Nineties, users can see themselves transformed into different historical contexts. The application supports multiple languages and allows users to download the generated images.

## Features

- **AI-Powered Image Generation:** Uses Google's Gemini API to generate historical portraits.
- **Multiple Historical Eras:** Explore a wide range of historical periods across different continents.
- **Multi-language Support:** The user interface is available in multiple languages.
- **Image Upload and Preview:** Easily upload a photo and see a preview before generating images.
- **Gallery View:** View all generated images in a fullscreen gallery.
- **Downloadable Images:** Download your favorite historical portraits.
- **Responsive Design:** The application is designed to work on both desktop and mobile devices.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **AI:** Google Gemini API
- **Build Tool:** Vite

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dwojtaszek/chronosnap.git
    cd chronosnap
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up your environment variables:**
    Create a `.env` file in the root of the project and add your Gemini API key. You can use the `.env.example` file as a template.
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Project Structure

```
/
├── public/
├── src/
│   ├── components/      # React components
│   ├── context/         # Language context provider
│   ├── locales/         # Translation files
│   ├── services/        # Gemini API service
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript types
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── ...
├── .env.example       # Example environment variables
├── .gitignore
├── index.html
├── package.json
├── README.md
└── ...
```

## Available Eras

The application can generate images for the following historical eras:
- **North America:** Victorian Era (1890s), Roaring Twenties, Great Depression (1930s), The Forties (WWII Era), The Swinging Sixties, Disco Seventies, The Neon Eighties, Grunge Nineties.
- **Europe:** Renaissance (1500s), Baroque (1650s), Belle Époque (1900s), Post-War Avant-Garde (1950s), Swinging London (1960s), Punk Rock (1970s).
- **Asia:** Edo Period Japan (1700s), Qing Dynasty China (1850s), Mughal Empire India (1600s), Joseon Dynasty Korea (1880s), Shanghai Jazz Age (1930s), Hong Kong Cinema (1980s).

## Screenshots

*(placeholder for screenshots)*
