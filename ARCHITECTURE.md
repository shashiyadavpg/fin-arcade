# Fin Arcade - Complete Architecture Blueprint

## 🏗️ Project Structure

```
fin-arcade/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with navigation
│   │   ├── page.tsx                  # Dashboard/Home
│   │   ├── dashboard/                # User dashboard
│   │   ├── modules/                  # Learning modules
│   │   │   ├── financial-statements/ # Module 1
│   │   │   ├── corporate-finance/   # Module 2
│   │   │   └── markets/              # Module 3
│   │   ├── quiz/                     # Quiz pages
│   │   ├── leaderboard/              # Leaderboard
│   │   └── profile/                  # User profile
│   ├── components/                   # Reusable components
│   │   ├── ui/                       # Base UI components
│   │   ├── gamification/            # XP, badges, progress
│   │   ├── interactive/              # Interactive visualizations
│   │   └── learning/                 # Learning-specific components
│   ├── lib/                          # Utilities & logic
│   │   ├── gamification.ts           # XP, levels, badges logic
│   │   ├── storage.ts                # LocalStorage wrapper
│   │   └── quiz-engine.ts            # Quiz logic & mistake tracking
│   ├── data/                         # Content & quiz data
│   │   ├── modules.ts                # Module definitions
│   │   ├── quizzes.ts                # Quiz questions database
│   │   └── badges.ts                 # Badge definitions
│   └── types/                        # TypeScript types
│       ├── user.ts                   # User progress types
│       ├── gamification.ts           # XP, badges types
│       └── quiz.ts                   # Quiz types
├── public/                           # Static assets
└── package.json
```

## 🎮 Gamification System

### Level System
- **Beginner**: 0-999 XP
- **Intermediate**: 1000-2999 XP
- **Advanced**: 3000-6999 XP
- **Expert**: 7000+ XP

### XP Sources
- Lesson completion: 50 XP
- Quiz correct answer: 25 XP
- Perfect quiz score: 100 bonus XP
- Daily streak: 10 XP per day
- Challenge completion: 200 XP
- Interactive activity: 75 XP

### Badges
- "Ratio Master" - Complete all ratio analysis lessons
- "DCF Wizard" - Master DCF valuation
- "Derivatives Ninja" - Ace derivatives module
- "Streak Champion" - 30-day streak
- "Perfect Score" - 100% on advanced quiz
- "Speed Demon" - Complete time-bound challenge

## 📚 Module Structure

Each module follows this pattern:
1. **Overview** - Introduction & learning objectives
2. **Lessons** - Step-by-step content with examples
3. **Interactive Activity** - Hands-on practice
4. **Quiz** - Assessment with instant feedback
5. **Mistake Replay** - Targeted review of weak areas

## 🎨 Design System

### Color Palette
- Primary: Emerald/Cyan gradients (learning, growth)
- Secondary: Sky blue (interactive elements)
- Accent: Fuchsia (achievements, badges)
- Background: Dark slate (950-900)
- Text: Slate 50-400

### Typography
- Headings: Geist Sans (bold, semibold)
- Body: Geist Sans (regular)
- Code/Formulas: Geist Mono

### Animations
- Page transitions: Fade + slide
- Card hover: Scale + glow
- Progress bars: Smooth fill animation
- Badge unlock: Bounce + sparkle

## 🔧 Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **State**: React hooks + LocalStorage
- **Future**: Backend API ready for user accounts

## 📊 Data Models

### User Progress
```typescript
{
  userId: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  xp: number
  streak: number
  badges: string[]
  completedModules: string[]
  quizScores: Record<string, number>
  weakAreas: string[]
  lastActive: Date
}
```

### Quiz Structure
```typescript
{
  id: string
  moduleId: string
  questions: Question[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  timeLimit?: number
}

Question {
  id: string
  type: 'multiple-choice' | 'calculation' | 'interactive'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  topic: string
}
```

## 🚀 MVP Roadmap

### Phase 1: Core Structure ✅
- [x] Project setup
- [x] Basic routing
- [x] Dashboard layout

### Phase 2: Gamification Engine
- [ ] XP system
- [ ] Level progression
- [ ] Badge system
- [ ] Progress tracking

### Phase 3: First Module (Financial Statements)
- [ ] Content structure
- [ ] Interactive ratio builder
- [ ] Quiz system
- [ ] Mistake replay mode

### Phase 4: Interactive Components
- [ ] DCF calculator
- [ ] Option payoff chart
- [ ] Bond price-yield curve
- [ ] Portfolio simulator

### Phase 5: Remaining Modules
- [ ] Corporate Finance module
- [ ] Markets & Instruments module

### Phase 6: Polish
- [ ] Animations
- [ ] Responsive design
- [ ] Performance optimization
- [ ] Accessibility

