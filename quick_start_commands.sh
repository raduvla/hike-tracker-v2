#!/bin/bash

# Hike Tracker Monorepo Quick Start

echo "🥾 Setting up Hike Tracker Monorepo..."

# Navigate to frontend directory
cd frontend

# Create all package directories
echo "📁 Creating package directories..."
mkdir -p packages/shared-types/src
mkdir -p packages/config/src
mkdir -p packages/utils/src
mkdir -p packages/api-client/src
mkdir -p packages/stores/src
mkdir -p packages/auth/src

# Create mobile app directories
echo "📱 Creating mobile app directories..."
mkdir -p apps/mobile/src/context
mkdir -p apps/mobile/src/screens
mkdir -p apps/mobile/src/utils

# Add tsconfig.json to each package that needs it
echo "⚙️ Creating tsconfig files..."

# shared-types tsconfig
cat > packages/shared-types/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Copy the same tsconfig to other packages
cp packages/shared-types/tsconfig.json packages/config/
cp packages/shared-types/tsconfig.json packages/utils/
cp packages/shared-types/tsconfig.json packages/api-client/
cp packages/shared-types/tsconfig.json packages/stores/
cp packages/shared-types/tsconfig.json packages/auth/

echo "📦 Installing dependencies..."
yarn install

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy all the package files into their respective directories"
echo "2. Copy the updated mobile app files"
echo "3. Run: yarn mobile (for Android) or yarn mobile:ios (for iOS)"
echo ""
echo "See SETUP_INSTRUCTIONS.md for detailed information"
