// Simple script to run the development server
const { spawn } = require('child_process');
const path = require('path');

// Get the path to the next.js executable
const nextPath = path.join(__dirname, 'node_modules', '.bin', 'next');

// Spawn the next.js process
const nextProcess = spawn(nextPath, ['dev'], {
  stdio: 'inherit',
  shell: true
});

// Handle process events
nextProcess.on('error', (err) => {
  console.error('Failed to start Next.js:', err);
});

nextProcess.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
}); 