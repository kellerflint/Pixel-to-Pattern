#!/bin/bash
set -e

echo "Starting Pixel-to-Pattern deployment..."

# System update
sudo apt update && sudo apt upgrade -y

# Install Git if missing
if ! command -v git &> /dev/null
then
    echo "Installing Git..."
    sudo apt install -y git
fi

# Install Docker
if ! command -v docker &> /dev/null
then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com | sh
fi

# Install Docker Compose plugin
if ! command -v docker compose &> /dev/null
then
    echo "Installing Docker Compose..."
    sudo apt install -y docker-compose-plugin
fi

# Clone repo if not exists
if [ ! -d "pixel-to-pattern" ]; then
  echo "Cloning repository..."
  git clone https://github.com/<your-username>/pixel-to-pattern.git
fi

cd pixel-to-pattern

echo "Pulling latest updates..."
git pull origin main

echo "Building containers..."
docker compose build

echo "Starting services..."
docker compose up -d

echo "Deployment complete!"
echo "App running at: http://<YOUR_VM_IP>:3000"
