# TrackSter - Complete Architecture & Design Document

## 🎯 Vision
A social hiking tracker where users record adventures, share experiences, discover trails, and connect with fellow hikers.

---

## 📱 Screen Structure & Navigation

### Bottom Tab Navigation (Main App)
```
┌─────────────────────────────────────┐
│                                     │
│           [Screen Content]          │
│                                     │
│                                     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  🗺️ Map  |  🔍 Discover  |  ➕  |  👥 Social  |  👤 Profile  │
└─────────────────────────────────────┘
```

### Navigation Hierarchy
```
Auth Stack
├── Login
└── Signup

Main Stack (Authenticated)
├── Tabs (Bottom Navigation)
│   ├── Map Tab
│   │   ├── MapScreen (Live Tracking)
│   │   └── TrackDetailScreen
│   ├── Discover Tab
│   │   ├── DiscoverScreen (Browse Tracks)
│   │   ├── TrackListScreen (Search Results)
│   │   └── TrackDetailScreen
│   ├── Create Tab (Modal)
│   │   └── CreateTrackScreen
│   ├── Social Tab
│   │   ├── FeedScreen (Friends Activity)
│   │   ├── FriendsScreen (Friends List)
│   │   └── ChatListScreen (Later)
│   └── Profile Tab
│       ├── ProfileScreen (Own Profile)
│       ├── EditProfileScreen
│       └── SettingsScreen
└── Modal Screens
    ├── UserProfileScreen (View Others)
    ├── PhotoViewerScreen
    ├── ShareTrackScreen
    └── ChatScreen (Later)
```

---

## 🎨 Screen Designs

### 1. **MapScreen (Enhanced)**
```
┌─────────────────────────────────────┐
│ ┌─ Status Bar ────────────────┐ 👤 │
│ │ 📍 Tracking Active           │    │
│ │ ⚡ Moderate Mode             │    │
│ │ 🏔️ Altitude: 850m            │    │
│ │ 📏 Distance: 3.2 km          │    │
│ │ ⏱️ Duration: 45m             │    │
│ └──────────────────────────────────┘│
│                                     │
│          [Live Map View]            │
│        with drawn path              │
│                                     │
│ ┌─────────────────────────────────┐│
│ │  📸  💾 Save   🗑️  Discard      ││
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │      🔴 Stop  |  ⏸️ Pause        ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

**Features:**
- Real-time stats overlay
- Camera button (take photos during hike)
- Save/Discard quick actions
- Photo markers on map

---

### 2. **DiscoverScreen (New)**
```
┌─────────────────────────────────────┐
│  🔍 Search trails...           🔧   │
├─────────────────────────────────────┤
│  📍 Nearby  | 🔥 Popular | ⭐ Rated │
├─────────────────────────────────────┤
│                                     │
│  ┌────────────────────────────┐    │
│  │ [Trail Photo]              │    │
│  │ 🏔️ Mountain Peak Trail     │    │
│  │ 📏 5.2 km · ⏱️ 2h 30m       │    │
│  │ ⭐ 4.8 (120) · 👥 Public    │    │
│  └────────────────────────────┘    │
│                                     │
│  ┌────────────────────────────┐    │
│  │ [Trail Photo]              │    │
│  │ 🌲 Forest Loop Trail       │    │
│  │ 📏 3.8 km · ⏱️ 1h 45m       │    │
│  │ ⭐ 4.6 (85) · 👥 Public     │    │
│  └────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

**Features:**
- Search with filters (distance, difficulty, duration)
- Category tabs (Nearby, Popular, Top Rated)
- Preview cards with key stats
- Privacy indicator

---

### 3. **TrackDetailScreen (New)**
```
┌─────────────────────────────────────┐
│ ←  Mountain Peak Trail        ⋮     │
├─────────────────────────────────────┤
│  [Cover Photo - Full Width]         │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📸 📸 📸 📸 📸 📸 +12 →      │   │
│  └─────────────────────────────┘   │
│                                     │
│  👤 John Doe  · 📅 2 days ago      │
│                                     │
│  ⭐⭐⭐⭐⭐ 4.8 · 120 reviews       │
│                                     │
│  📏 5.2 km · ⏱️ 2h 30m · 🏔️ 850m  │
│                                     │
│  Description:                       │
│  Beautiful mountain trail with...   │
│                                     │
│  [Map Preview]                      │
│                                     │
│  💬 Comments (45)                   │
│  ├─ "Amazing trail!" - @user1       │
│  └─ "Best hike ever!" - @user2      │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🚶 Start This Trail          │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 📤 Share                      │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Features:**
- Photo gallery (swipeable)
- Creator info
- Stats and ratings
- Interactive map
- Comments section
- Start navigation button
- Share functionality

---

### 4. **Save Track Screen (New)**
```
┌─────────────────────────────────────┐
│ ←  Save Your Track                  │
├─────────────────────────────────────┤
│                                     │
│  [Track Preview Map]                │
│                                     │
│  Track Details                      │
│  ┌─────────────────────────────┐   │
│  │ Title: Morning Hike         │   │
│  └─────────────────────────────┘   │
│                                     │
│  📸 Add Photos (0/10)               │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐          │
│  │ + │ │   │ │   │ │   │          │
│  └───┘ └───┘ └───┘ └───┘          │
│                                     │
│  Description                        │
│  ┌─────────────────────────────┐   │
│  │ Share your experience...    │   │
│  └─────────────────────────────┘   │
│                                     │
│  Privacy                            │
│  ┌─────────────────────────────┐   │
│  │ 🌍 Public              ✓    │   │
│  │ 👥 Friends Only              │   │
│  │ 🔒 Private                   │   │
│  └─────────────────────────────┘   │
│                                     │
│  Tags                               │
│  #mountain #hiking #nature          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 💾 Save Track                │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Features:**
- Title and description
- Photo upload (max 10)
- Privacy selector
- Auto-tags based on location
- Preview stats

---

### 5. **Social Feed Screen (New)**
```
┌─────────────────────────────────────┐
│  Friends Activity           🔔 (3)  │
├─────────────────────────────────────┤
│                                     │
│  ┌────────────────────────────┐    │
│  │ 👤 Sarah completed a track  │    │
│  │ [Photo] [Photo] [Photo]     │    │
│  │ 🏔️ Sunset Peak Trail        │    │
│  │ 📏 8.5 km · ⏱️ 3h 15m        │    │
│  │ "What a view! 😍"           │    │
│  │ ❤️ 24  💬 5  📤 Share       │    │
│  │ 2 hours ago                 │    │
│  └────────────────────────────┘    │
│                                     │
│  ┌────────────────────────────┐    │
│  │ 👤 Mike uploaded photos     │    │
│  │ [Photo Grid - 3 photos]     │    │
│  │ "Morning hike with the crew"│    │
│  │ ❤️ 12  💬 3  📤 Share       │    │
│  │ 5 hours ago                 │    │
│  └────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

**Features:**
- Activity feed from friends
- Like and comment
- Share to your feed
- Photo previews

---

### 6. **Friends Screen (New)**
```
┌─────────────────────────────────────┐
│  👥 Friends (42)           + Add    │
├─────────────────────────────────────┤
│  🔍 Search friends...               │
├─────────────────────────────────────┤
│                                     │
│  ┌────────────────────────────┐    │
│  │ 👤 Sarah Johnson           │    │
│  │ 🏔️ 25 trails · 📍 Online   │    │
│  │                      [Chat] │    │
│  └────────────────────────────┘    │
│                                     │
│  ┌────────────────────────────┐    │
│  │ 👤 Mike Chen               │    │
│  │ 🏔️ 18 trails · 📍 2h ago   │    │
│  │                      [Chat] │    │
│  └────────────────────────────┘    │
│                                     │
│  Friend Requests (2)                │
│  ┌────────────────────────────┐    │
│  │ 👤 John Doe                │    │
│  │ 🏔️ 12 trails               │    │
│  │         [Accept] [Decline] │    │
│  └────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

**Features:**
- Friends list with status
- Search friends
- Friend requests
- Quick chat access
- View friend profiles

---

### 7. **Enhanced Profile Screen**
```
┌─────────────────────────────────────┐
│ ←              ⚙️  📤              │
├─────────────────────────────────────┤
│         ┌─────────┐                 │
│         │ [Photo] │                 │
│         └─────────┘                 │
│       Sarah Johnson                 │
│     @sarahhikes · 👥 42 friends     │
│                                     │
│  ┌───────┬───────┬───────┐         │
│  │  25   │  2.3k │  156  │         │
│  │Tracks │  km   │ Photos│         │
│  └───────┴───────┴───────┘         │
│                                     │
│  Bio: Adventure seeker 🏔️          │
│  Living life one trail at a time    │
│                                     │
│  [+ Add Friend] [💬 Message]       │
│                                     │
│  🏆 Achievements                    │
│  🥇 100km Club  🏔️ Peak Master     │
│                                     │
│  📸 Photos (156)                    │
│  ┌──┐┌──┐┌──┐┌──┐┌──┐             │
│  │  ││  ││  ││  ││  │             │
│  └──┘└──┘└──┘└──┘└──┘             │
│                                     │
│  🏔️ Recent Tracks                  │
│  [Track Card 1]                     │
│  [Track Card 2]                     │
│                                     │
└─────────────────────────────────────┘
```

**Features:**
- Profile photo
- Stats overview
- Achievements/badges
- Photo gallery
- Recent tracks
- Friend/Message buttons

---

## 🗄️ Database Schema

### Users Table
```sql
users
- id (uuid, primary key)
- username (string, unique)
- email (string, unique)
- password_hash (string)
- profile_photo_url (string, nullable)
- bio (text, nullable)
- created_at (timestamp)
- updated_at (timestamp)
- is_public (boolean, default true)
- total_distance (float, default 0)
- total_tracks (int, default 0)
```

### Tracks Table
```sql
tracks
- id (uuid, primary key)
- user_id (uuid, foreign key → users)
- title (string)
- description (text, nullable)
- privacy (enum: 'public', 'friends', 'private')
- distance (float) -- in meters
- duration (int) -- in seconds
- elevation_gain (float) -- in meters
- start_location (point/geometry)
- cover_photo_url (string, nullable)
- created_at (timestamp)
- updated_at (timestamp)
- avg_rating (float, default 0)
- total_ratings (int, default 0)
- is_predefined (boolean, default false)
```

### Track Points Table
```sql
track_points
- id (uuid, primary key)
- track_id (uuid, foreign key → tracks)
- latitude (float)
- longitude (float)
- altitude (float, nullable)
- timestamp (timestamp)
- sequence_order (int)
```

### Photos Table
```sql
photos
- id (uuid, primary key)
- track_id (uuid, foreign key → tracks, nullable)
- user_id (uuid, foreign key → users)
- url (string)
- thumbnail_url (string)
- caption (text, nullable)
- location_lat (float, nullable)
- location_lon (float, nullable)
- created_at (timestamp)
```

### Friendships Table
```sql
friendships
- id (uuid, primary key)
- user_id (uuid, foreign key → users)
- friend_id (uuid, foreign key → users)
- status (enum: 'pending', 'accepted', 'blocked')
- created_at (timestamp)
- updated_at (timestamp)
- UNIQUE(user_id, friend_id)
```

### Track Ratings Table
```sql
track_ratings
- id (uuid, primary key)
- track_id (uuid, foreign key → tracks)
- user_id (uuid, foreign key → users)
- rating (int, 1-5)
- comment (text, nullable)
- created_at (timestamp)
- UNIQUE(track_id, user_id)
```

### Comments Table
```sql
comments
- id (uuid, primary key)
- track_id (uuid, foreign key → tracks)
- user_id (uuid, foreign key → users)
- content (text)
- created_at (timestamp)
```

### Likes Table
```sql
likes
- id (uuid, primary key)
- track_id (uuid, foreign key → tracks, nullable)
- photo_id (uuid, foreign key → photos, nullable)
- user_id (uuid, foreign key → users)
- created_at (timestamp)
- UNIQUE(user_id, track_id, photo_id)
```

### Activity Feed Table
```sql
activities
- id (uuid, primary key)
- user_id (uuid, foreign key → users)
- activity_type (enum: 'completed_track', 'uploaded_photos', 'added_friend')
- track_id (uuid, nullable)
- photo_ids (json, nullable)
- content (text, nullable)
- created_at (timestamp)
```

### Tags Table
```sql
tags
- id (uuid, primary key)
- name (string, unique)

track_tags
- track_id (uuid, foreign key → tracks)
- tag_id (uuid, foreign key → tags)
- PRIMARY KEY (track_id, tag_id)
```

### Achievements Table (Gamification)
```sql
achievements
- id (uuid, primary key)
- name (string)
- description (text)
- icon (string)
- requirement (json) -- e.g., {"total_distance": 100000}

user_achievements
- user_id (uuid, foreign key → users)
- achievement_id (uuid, foreign key → achievements)
- earned_at (timestamp)
- PRIMARY KEY (user_id, achievement_id)
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
```

### Users
```
GET    /api/users/me
PATCH  /api/users/me
GET    /api/users/:id
POST   /api/users/me/photo          -- Upload profile photo
GET    /api/users/:id/tracks
GET    /api/users/:id/photos
GET    /api/users/:id/stats
```

### Tracks
```
GET    /api/tracks                  -- List/search tracks
POST   /api/tracks                  -- Create track
GET    /api/tracks/:id              -- Get track details
PATCH  /api/tracks/:id              -- Update track
DELETE /api/tracks/:id              -- Delete track
GET    /api/tracks/nearby           -- Get nearby tracks
GET    /api/tracks/popular          -- Get popular tracks
POST   /api/tracks/:id/photos       -- Upload track photos
GET    /api/tracks/:id/photos       -- Get track photos
POST   /api/tracks/:id/rate         -- Rate track
GET    /api/tracks/:id/ratings      -- Get ratings
```

### Photos
```
POST   /api/photos                  -- Upload photo
GET    /api/photos/:id              -- Get photo
DELETE /api/photos/:id              -- Delete photo
POST   /api/photos/:id/like         -- Like photo
DELETE /api/photos/:id/like         -- Unlike photo
```

### Friends
```
GET    /api/friends                 -- Get friends list
POST   /api/friends/request         -- Send friend request
POST   /api/friends/accept/:id      -- Accept request
POST   /api/friends/reject/:id      -- Reject request
DELETE /api/friends/:id             -- Remove friend
GET    /api/friends/requests        -- Get pending requests
```

### Social Feed
```
GET    /api/feed                    -- Get activity feed
POST   /api/feed                    -- Post to feed
```

### Comments
```
GET    /api/tracks/:id/comments     -- Get comments
POST   /api/tracks/:id/comments     -- Add comment
DELETE /api/comments/:id            -- Delete comment
```

### Likes
```
POST   /api/tracks/:id/like
DELETE /api/tracks/:id/like
```

### Search
```
GET    /api/search/tracks?q=...&filters=...
GET    /api/search/users?q=...
```

---

## 📦 Package Structure Updates

### New Packages to Add

```
packages/
├── media/                    # NEW
│   ├── src/
│   │   ├── ImageUploader.ts
│   │   ├── ImageCompressor.ts
│   │   └── MediaService.ts
│   └── package.json
│
├── social/                   # NEW
│   ├── src/
│   │   ├── FriendService.ts
│   │   ├── FeedService.ts
│   │   └── types.ts
│   └── package.json
│
└── search/                   # NEW
    ├── src/
    │   ├── SearchService.ts
    │   ├── FilterBuilder.ts
    │   └── types.ts
    └── package.json
```

---

## 🎨 Component Architecture

### New Components Needed

```
src/components/
├── cards/
│   ├── TrackCard.tsx          -- Track preview card
│   ├── FeedCard.tsx           -- Feed item card
│   └── FriendCard.tsx         -- Friend list item
├── media/
│   ├── PhotoGrid.tsx          -- Photo gallery grid
│   ├── PhotoUploader.tsx      -- Upload interface
│   └── PhotoViewer.tsx        -- Full screen photo view
├── track/
│   ├── TrackStats.tsx         -- Stats display
│   ├── TrackMap.tsx           -- Map preview
│   └── PrivacySelector.tsx    -- Privacy options
├── social/
│   ├── CommentList.tsx        -- Comments section
│   ├── LikeButton.tsx         -- Like interaction
│   └── ShareButton.tsx        -- Share functionality
└── search/
    ├── SearchBar.tsx          -- Search input
    ├── FilterChips.tsx        -- Filter tags
    └── SearchResults.tsx      -- Results list
```

---

## 🚀 Implementation Phases

### Phase 1: Track Management (Week 1-2)
- [ ] Save track with metadata
- [ ] Track detail screen
- [ ] Basic photo upload
- [ ] Privacy settings

### Phase 2: Discovery (Week 3-4)
- [ ] Discover screen
- [ ] Search functionality
- [ ] Predefined tracks
- [ ] Track filters

### Phase 3: Social Features (Week 5-6)
- [ ] Friends system
- [ ] Activity feed
- [ ] Comments & likes
- [ ] Share functionality

### Phase 4: Media Enhancement (Week 7-8)
- [ ] Photo galleries
- [ ] Profile pictures
- [ ] Photo markers on map
- [ ] Image optimization

### Phase 5: Chat (Week 9-10)
- [ ] One-on-one chat
- [ ] Real-time messaging
- [ ] Push notifications

---

## 🎨 Design System

### Colors
```
Primary:   #4CAF50  (Green)
Secondary: #2196F3  (Blue)
Accent:    #FF9800  (Orange)
Danger:    #F44336  (Red)
Success:   #8BC34A  (Light Green)
Warning:   #FFC107  (Amber)

Neutrals:
- #FFFFFF  (White)
- #F5F5F5  (Background)
- #E0E0E0  (Border)
- #9E9E9E  (Text Secondary)
- #616161  (Text Primary)
- #212121  (Text Dark)
```

### Typography
```
Display:  32px, Bold
Heading:  24px, Bold
Title:    20px, SemiBold
Body:     16px, Regular
Caption:  14px, Regular
Label:    12px, SemiBold
```

---

## 🔒 Privacy & Security

### Track Privacy Levels
1. **Public**: Everyone can see
2. **Friends**: Only friends can see
3. **Private**: Only you can see

### Photo Privacy
- Inherits track privacy
- Can be shared independently

### Friend Management
- Send/accept friend requests
- Block users
- Privacy controls

---

## 📊 Analytics & Gamification

### User Stats
- Total distance
- Total tracks
- Total photos
- Average rating

### Achievements
- First Track
- 100km Club
- Photo Master (100 photos)
- Peak Master (10 mountain trails)
- Social Butterfly (50 friends)

---

This architecture provides a solid foundation for building a complete social hiking app! 🏔️