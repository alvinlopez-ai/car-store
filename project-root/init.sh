#!/bin/bash
# Project initialization script
# Run this after cloning to set up the project

echo "🚀 EWYL Project Setup Script"
echo "============================"
echo ""

# Check Docker
echo "✓ Checking Docker..."
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Desktop."
    exit 1
fi
echo "✓ Docker Compose found"

# Create env files if they don't exist
echo ""
echo "✓ Setting up environment files..."
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "  ✓ Created backend/.env"
fi

if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    echo "  ✓ Created frontend/.env"
fi

# Start Docker services
echo ""
echo "🐳 Starting Docker services..."
docker-compose up --build -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 5

# Check if services are running
if [ "$(docker-compose ps -q backend)" ] && [ "$(docker-compose ps -q database)" ]; then
    echo "✓ Services are running"
    
    # Seed database
    echo ""
    echo "🌱 Seeding database..."
    docker-compose exec -T backend npm run seed
    
    echo ""
    echo "✅ Setup Complete!"
    echo ""
    echo "🎯 Access your application:"
    echo "   Frontend: http://localhost:5173"
    echo "   Backend:  http://localhost:5000/api"
    echo ""
    echo "🔑 Login with:"
    echo "   Email: john@example.com"
    echo "   Password: password123"
    echo ""
    echo "📚 Read the documentation:"
    echo "   - QUICK_START.md (fast setup)"
    echo "   - README.md (complete docs)"
    echo "   - ARCHITECTURE.md (system design)"
    echo ""
    echo "🛑 To stop everything:"
    echo "   docker-compose down"
else
    echo "❌ Services failed to start. Check logs:"
    echo "   docker-compose logs"
    exit 1
fi
