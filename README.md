# Vibeboard

A collaborative social platform that lets users share their most interesting and spontaneous plans for the week.

## Features

- **Weekly Activity Sharing**: Users can share what random activity they're excited to try each week
- **Vibe-based Filtering**: Activities can be filtered by vibes, participants, and budget ranges
- **Real-time Updates**: Using Tonk's synchronization capabilities, all updates are instantly reflected across all connected clients
- **Profile Management**: Users can customize their profiles with names, avatars, vibes, and budget preferences
- **Weekly Timer**: Track when the weekly vibe cycle resets
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- React with TypeScript
- Tonk Framework for real-time synchronization
- TailwindCSS for styling
- Service Worker for offline capabilities
- Express.js backend proxy server

## How Tonk is Used

Tonk is utilized in several key ways:

1. **Real-time Data Sync**: The application uses Tonk's sync engine to keep user profiles and entries synchronized across all clients in real-time.

2. **Store Management**: 
   - `entryStore`: Manages shared activity entries
   - `profileStore`: Handles user profile data
   - `vibeColorStore`: Manages vibe color associations
   - `weekTimerStore`: count down timer for the remaining days in a week

3. **Module System**: Uses Tonk's modular architecture for separating concerns and handling external services.

4. **Development Tools**: Includes built-in debugging panels (StorageDebugPanel, SyncMonitor, SyncVerifier) for monitoring sync status.

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm run dev
```

3. For production build:
```bash
pnpm run build
```

## Server Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install server dependencies:
```bash
pnpm install
```

3. Build the server:
```bash
pnpm build
```

## Development

The project follows a modular architecture:
- `/src/components`: Reusable UI components
- `/src/views`: Page-level components
- `/src/stores`: State management using Tonk stores
- `/src/modules`: Business logic and external service integrations
- `/src/hooks`: Custom React hooks
- `/src/types`: TypeScript type definitions

## Offline Support

The application includes a service worker for offline capabilities, caching static assets and providing a fallback offline page.
