# VisaHub - Global Visa Application Platform

## Overview

VisaHub is a SaaS platform that simplifies global visa applications, tax filings, and permit processes through AI-powered automation. The platform guides users through complex immigration workflows with intelligent document generation, form auto-filling, and real-time application tracking. Built as a full-stack TypeScript application, it serves students, professionals, digital nomads, businesses, and immigration consultants seeking to navigate cross-border mobility requirements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state and API caching
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system based on Material Design, Linear, and Stripe aesthetics
- **Animations**: Framer Motion for smooth transitions and interactive elements

**Design System**
- Hybrid approach combining Material Design foundations with Linear-inspired aesthetics
- Typography: Inter font family with strict hierarchy (Display through Caption levels)
- Color system: HSL-based with support for light/dark modes via CSS variables
- Spacing: Tailwind's standardized scale (1-24 units) with micro, component, and section categories
- Component library: Extensive set of pre-built UI components in `client/src/components/ui/`

**Application Structure**
- **Pages**: Landing, Auth, Wizard (Visa Advisor), Dashboard, Marketplace, Profile, Demo Hub
- **Core Components**: Navigation, Hero, Features, Testimonials, Pricing, CTA, Footer
- **Interactive Wizards**: Multi-step visa recommendation and document generation flows
- **Specialized Components**: AI Processing states, Form Guides, Timeline visualizations, Travel Agent Marketplace
- **Chat & Search Components**: ActionSearchBar for global search, ChatInput for AI interactions
- **User Profile**: Full-featured profile page for viewing and editing user information

**Key Features**
- User profile management with edit capability
- AI-powered visa recommendation wizard with progressive disclosure
- Real-time form validation with react-hook-form and Zod schemas
- Responsive design with mobile-first approach
- Animated UI elements for enhanced user experience (container scroll, timelines, testimonials)
- Travel Agent Marketplace with search and filtering capabilities

### Backend Architecture

**Technology Stack**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for RESTful API server
- **Database**: PostgreSQL via Neon serverless database
- **ORM**: Drizzle ORM for type-safe database queries
- **Development**: Hot module replacement with Vite middleware in dev mode
- **Production**: Bundled with esbuild for optimal performance

**API Design**
- RESTful endpoints organized by resource type (visas, documents, advisories, travel agents)
- Consistent response patterns with proper HTTP status codes
- Request/response logging middleware for debugging
- Error handling with descriptive messages

**Data Layer**
- **Storage Abstraction**: `IStorage` interface allows for pluggable storage implementations
- **Current Implementation**: In-memory storage (`MemStorage`) for rapid prototyping
- **Database Schema**: Defined in `shared/schema.ts` using Drizzle ORM
  - Users: Authentication and profile data (username, password, email, firstName, lastName, country, phone, profileImage)
  - Visas: Country-specific visa types with requirements, costs, processing times
  - Documents: AI-generated documents (cover letters, sponsorship letters, form guides)
  - Advisory Responses: User visa consultation records
  - Travel Agents: Marketplace of immigration specialists

**AI Integration (Placeholder)**
- Document generation service (`server/ai-service.ts`) with stubs for OpenAI integration
- Visa recommendation engine based on user profile and destination
- Template-based document generation (to be replaced with GPT-powered generation)

### Data Storage Solutions

**Database Schema Design**
- **Users Table**: Simple authentication with username/password (ready for enhancement)
- **Visas Table**: Comprehensive visa information including:
  - Country, visa type, description
  - Requirements array (JSON)
  - Processing times (min/max in days)
  - Cost and approval rate
  - Education requirements (JSON object for student visas)
  - Application URLs
- **Documents Table**: User-generated documents with visa recommendations
- **Advisory Responses Table**: User consultation history with education details
- **Travel Agents Table**: Marketplace profiles with ratings, specialties, countries served

**Data Management**
- Drizzle ORM provides type-safe queries and migrations
- Schema shared between client and server via `shared/schema.ts`
- Migration files in `/migrations` directory
- Database provisioning via Drizzle Kit CLI (`npm run db:push`)

**Current State**
- In-memory storage for development and prototyping
- Schema designed for PostgreSQL with Neon serverless
- Ready for database migration when `DATABASE_URL` is configured

### Authentication & Authorization

**Current Implementation**
- Basic user registration and login structure in place
- User model with username/password and extended profile fields
- Profile edit functionality with real-time validation
- Session-based authentication ready for implementation
- Connect-pg-simple package included for PostgreSQL session storage
- User ID stored in localStorage after login for session management

**Security Considerations**
- Password hashing not yet implemented (needs bcrypt or similar)
- Profile updates validated via updateUserSchema (Zod)
- HTTPS enforcement in production environment
- CORS configuration for API security
- Input validation via Zod schemas for all user inputs

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Unstyled, accessible component primitives (20+ components)
- **Shadcn/ui**: Pre-styled component system built on Radix
- **Framer Motion**: Animation library for transitions and interactive elements
- **Lucide React**: Icon library for consistent iconography

### Recently Added Components (Nov 25, 2025)
- **Travel Agent Marketplace**: Full-featured search and filtering by country, specialties, ratings
- **ActionSearchBar**: Global search component with command palette functionality
- **ChatInput**: Reusable AI chat component with textarea auto-resize and send functionality
- **useTextareaResize Hook**: Auto-resizing textarea for chat and message inputs
- **Profile Page**: User profile management page with view/edit functionality, avatar display, and profile information updates
- **User Profile API**: Endpoints for getting and updating user profile information via `/api/user/:id`

### Database & Backend Services
- **Neon Database**: Serverless PostgreSQL provider
- **Drizzle ORM**: Type-safe database toolkit
- **Express**: Web server framework
- **Connect-pg-simple**: PostgreSQL session store for Express

### Development Tools
- **Vite**: Frontend build tool and dev server
- **TypeScript**: Static typing for entire codebase
- **esbuild**: Fast JavaScript bundler for production builds
- **TanStack Query**: Server state management and caching

### Planned Integrations
- **OpenAI API**: For AI-powered document generation and visa recommendations (stubs in place)
- **Payment Processing**: Stripe or similar for subscription management (implied by pricing page)
- **Email Service**: For notifications and reminders (referenced in features)
- **File Upload Service**: For document scanning and storage (referenced in features)

### Design Assets
- **Custom Images**: Stored in `attached_assets/` directory
- **Google Fonts**: Inter font family via CDN
- **Unsplash**: Stock photography for testimonials and marketing content

### Build & Deployment
- **Replit**: Development environment with custom plugins for error handling and dev tools
- **Environment Variables**: `DATABASE_URL` required for production database connection
- **Build Scripts**: Separate development and production build configurations