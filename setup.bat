@echo off
REM Quick setup script for new developers on Windows

echo Campus Core - Environment Setup
echo ====================================
echo.

REM Check if .env.local exists
if exist ".env.local" (
    echo ✅ .env.local already exists
) else (
    echo 📋 Creating .env.local from .env.example...
    copy ".env.example" ".env.local"
    echo ✅ .env.local created
    echo.
    echo ⚠️  Please edit .env.local and add your credentials:
    echo    - Firebase configuration ^(get from Firebase Console^)
    echo    - Gemini API key ^(get from Google Cloud Console^)
    echo.
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
)

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo   1. Edit .env.local with your credentials
echo   2. Run: npm run dev
echo.
pause
