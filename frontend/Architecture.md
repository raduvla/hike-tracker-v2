# TrackSter Mobile App Architecture

## 🏗️ Clean Architecture Principles

This app follows Clean Architecture and best practices for maintainable, scalable React Native applications.

## 📁 Project Structure

```
apps/mobile/src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── InfoCard.tsx
│   ├── ScreenContainer.tsx
│   └── index.ts        # Barrel exports
├── context/            # React Context providers
│   └── AuthContext.tsx
├── screens/            # Screen components
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   ├── MapScreen.tsx
│   └── ProfileScreen.tsx
├── native/             # Native module interfaces
│   └── LocationModule.ts
├── types/              # TypeScript type definitions
│   └── navigation.ts
└── utils/              # Platform-specific utilities
    └── storageAdapter.ts
```

## 🎯 Design Patterns

### 1. **Separation of Concerns**
- **Presentation Layer**: React components (screens, UI components)
- **Business Logic**: Zustand stores (in packages/stores)
- **Data Layer**: API client and services (in packages/api-client, packages/auth)
- **Types**: Centralized in packages/shared-types

### 2. **Dependency Inversion**
- Components depend on abstractions (stores, services)
- Services implement interfaces (StorageAdapter)
- Easy to mock and test

### 3. **Single Responsibility**
Each component/module has ONE reason to change:
- `Button.tsx` - Button presentation
- `AuthContext.tsx` - Authentication state management
- `AuthService.ts` - Authentication business logic
- `ApiClient.ts` - API communication

### 4. **DRY (Don't Repeat Yourself)**
- Reusable components (Button, InfoCard, ScreenContainer)
- Shared business logic in packages
- Type-safe navigation

### 5. **Type Safety**
- Strict TypeScript throughout
- Navigation types for type-safe routing
- Component prop interfaces

## 🔄 Data Flow

```
User Action
    ↓
Component (Presentation)
    ↓
Context/Store (State Management)
    ↓
Service (Business Logic)
    ↓
API Client (Data Layer)
    ↓
Backend
```

## 📱 Component Hierarchy

### Reusable Components

#### `Button`
**Purpose**: Consistent button styling and behavior
**Props**:
- `title`: Button text
- `onPress`: Click handler
- `variant`: Style variant (primary, secondary, danger, outline)
- `loading`: Loading state
- `disabled`: Disabled state
- `icon`: Optional emoji icon

**Usage**:
```typescript
<Button
  title="Logout"
  variant="danger"
  icon="🚪"
  onPress={handleLogout}
  loading={loading}
/>
```

#### `InfoCard`
**Purpose**: Display key-value information consistently
**Props**:
- `icon`: Emoji icon
- `label`: Field label
- `value`: Field value

**Usage**:
```typescript
<InfoCard
  icon="👤"
  label="Username"
  value={user.username}
/>
```

#### `ScreenContainer`
**Purpose**: Consistent screen layout
**Props**:
- `children`: Screen content
- `scrollable`: Enable scrolling
- `style`: Additional styles

## 🧭 Navigation Structure

### Auth Stack (Unauthenticated)
```
Login → Signup
```

### Main Stack (Authenticated)
```
Map ⇄ Profile
```

**Type-Safe Navigation**:
```typescript
// In MapScreen
navigation.navigate('Profile');

// In ProfileScreen
navigation.goBack();
```

## 🔐 Authentication Flow

1. User enters credentials
2. `LoginScreen` calls `useAuth().login()`
3. `AuthContext` calls `AuthService.login()`
4. `AuthService` calls `ApiClient.login()`
5. Success: Store user + tokens
6. `useAuthStore` updates
7. App.tsx detects user, switches to MainNavigator
8. User sees MapScreen

## 💾 State Management

### Global State (Zustand)
- `useAuthStore`: User, tokens, auth state
- `useTrackingStore`: Tracking state, buffer, mode

### Local State (useState)
- Component-specific UI state
- Form inputs
- Modal visibility

### Context (React Context)
- `AuthContext`: Authentication actions (login, logout, etc.)

## 🎨 Styling Guidelines

### Consistent Design System
- Primary: `#4CAF50` (green)
- Secondary: `#2196F3` (blue)
- Danger: `#F44336` (red)
- Background: `#f5f5f5`
- Text: `#333`

### Layout
- Padding: 12px, 16px, 20px
- Border radius: 8px, 12px
- Elevation: 2, 3, 4

### Typography
- Title: 24px, bold
- Heading: 18-20px, bold
- Body: 16px
- Caption: 12-14px

## 🧪 Testing Strategy

### Unit Tests
- Test business logic in services
- Test state management in stores
- Test utility functions

### Integration Tests
- Test screen flows
- Test navigation
- Test API integration

### E2E Tests
- Test complete user flows
- Test authentication
- Test tracking functionality

## 🚀 Best Practices Followed

1. **Component Composition**: Small, focused components
2. **Props Drilling Avoidance**: Use context/stores for deep data
3. **Type Safety**: TypeScript everywhere
4. **Error Handling**: Try-catch, user feedback
5. **Loading States**: Show feedback during async operations
6. **Accessibility**: Semantic components, clear labels
7. **Performance**: Memoization, lazy loading where needed
8. **Code Reusability**: Shared packages for cross-platform code
9. **Separation of Concerns**: Clear boundaries between layers
10. **SOLID Principles**: Throughout the codebase

## 📦 Package Organization

### Monorepo Structure
```
packages/
├── shared-types    # Type definitions
├── config          # Configuration
├── utils           # Utility functions
├── api-client      # API communication
├── stores          # State management
└── auth            # Authentication logic
```

### Benefits
- Share code between mobile and web
- Single source of truth for types
- Consistent business logic
- Easy to test in isolation

## 🔄 Future Improvements

1. **Redux DevTools**: For better debugging
2. **Error Boundaries**: Catch and display errors gracefully
3. **Offline Support**: Cache data locally
4. **Analytics**: Track user behavior
5. **Performance Monitoring**: Track app performance
6. **Automated Testing**: Comprehensive test suite
7. **CI/CD**: Automated builds and deployments

## 📚 Key Takeaways

- **Clean Architecture**: Easy to understand, maintain, and extend
- **Type Safety**: Catch errors at compile time
- **Reusability**: Components and logic shared across app
- **Testability**: Easy to unit test and mock
- **Scalability**: Add features without breaking existing code