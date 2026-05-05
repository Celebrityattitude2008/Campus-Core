#!/bin/bash
# Quick setup script for new developers

echo "Campus Core - Environment Setup"
echo "===================================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local already exists"
else
    echo "📋 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ .env.local created"
    echo ""
    echo "⚠️  Please edit .env.local and add your credentials:"
    echo "   - Firebase configuration (get from Firebase Console)"
    echo "   - Gemini API key (get from Google Cloud Console)"
    echo ""
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit .env.local with your credentials"
echo "  2. Run: npm run dev"
echo ""
