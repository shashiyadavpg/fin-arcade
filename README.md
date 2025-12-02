# Fin Arcade 🎮📊

A fully gamified, interactive finance learning platform that teaches financial concepts from basic to advanced through storytelling, visuals, gamification, and adaptive learning.

## 🎯 Features

### Learning Modules
- **Financial Statement Analysis**: Trend, vertical, horizontal, and ratio analysis, DuPont analysis, EPS calculations, cash flow interpretation
- **Corporate Finance**: Capital budgeting (NPV, IRR, PI, payback), capital structure (WACC), DCF valuation, relative valuation
- **Markets & Instruments**: Bond markets (YTM, duration, convexity), derivatives (futures, options, forwards, swaps), mutual funds vs ETFs

### Gamification System
- **Levels & XP**: Progress from Beginner → Intermediate → Advanced → Expert
- **XP Rewards**: Earn XP for lessons, quizzes, challenges, and daily streaks
- **Badges**: Unlock achievements like "Ratio Master", "DCF Wizard", "Derivatives Ninja"
- **Streaks**: Daily login streaks with bonus XP
- **Progress Tracking**: Dashboard showing completed modules, accuracy, weak areas

### Interactive Components
- **DCF Calculator**: Interactive discounted cash flow valuation with sliders
- **Option Payoff Chart**: Visualize call/put option payoffs with adjustable parameters
- **Bond Calculator**: Calculate bond prices, YTM, duration, and understand price-yield relationships
- **Ratio Builder**: Build and analyze financial ratios with real-time calculations

### Quiz System
- **Instant Feedback**: Get immediate explanations for correct/incorrect answers
- **Mistake Replay Mode**: Automatically identifies weak areas and suggests review
- **Adaptive Difficulty**: Questions adjust based on user level
- **Progress Tracking**: Track quiz scores and improvement over time

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fin-arcade.git
cd fin-arcade
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
fin-arcade/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Dashboard/Home
│   │   ├── modules/           # Learning modules
│   │   ├── quiz/              # Quiz pages
│   │   ├── leaderboard/       # Leaderboard
│   │   └── profile/           # User profile
│   ├── components/            # React components
│   │   ├── ui/                # Base UI components
│   │   ├── gamification/      # XP, badges, progress
│   │   ├── interactive/       # Interactive calculators
│   │   └── layout/            # Navigation, layout
│   ├── lib/                   # Utilities & logic
│   │   ├── gamification.ts    # XP, levels, badges
│   │   ├── storage.ts         # LocalStorage wrapper
│   │   └── quiz-engine.ts     # Quiz logic
│   ├── data/                  # Content & quiz data
│   │   ├── modules.ts         # Module definitions
│   │   └── quizzes.ts         # Quiz questions
│   └── types/                 # TypeScript types
├── public/                    # Static assets
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: Emerald/Cyan gradients (learning, growth)
- **Secondary**: Sky blue (interactive elements)
- **Accent**: Fuchsia (achievements, badges)
- **Background**: Dark slate (950-900)
- **Text**: Slate 50-400

### Typography
- **Headings**: Geist Sans (bold, semibold)
- **Body**: Geist Sans (regular)
- **Code/Formulas**: Geist Mono

## 🧠 Learning Approach

Each module follows this structure:
1. **Overview**: Introduction & learning objectives
2. **Lessons**: Step-by-step content with examples
3. **Interactive Activity**: Hands-on practice with calculators
4. **Quiz**: Assessment with instant feedback
5. **Mistake Replay**: Targeted review of weak areas

## 📊 Gamification Details

### XP Rewards
- Lesson completion: 50 XP
- Quiz correct answer: 25 XP
- Perfect quiz score: 100 bonus XP
- Daily streak: 10 XP per day
- Challenge completion: 200 XP
- Interactive activity: 75 XP

### Level Thresholds
- **Beginner**: 0-999 XP
- **Intermediate**: 1000-2999 XP
- **Advanced**: 3000-6999 XP
- **Expert**: 7000+ XP

### Badges
- Ratio Master - Complete all ratio analysis lessons
- DCF Wizard - Master DCF valuation
- Derivatives Ninja - Ace derivatives module
- Streak Champion - 30-day streak
- Perfect Score - 100% on advanced quiz

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion (planned)
- **Charts**: Recharts (for future visualizations)
- **Icons**: Lucide React
- **State**: React hooks + LocalStorage
- **Language**: TypeScript

## 📝 Content Coverage

### Financial Statement Analysis
- Trend analysis
- Vertical analysis
- Horizontal analysis
- Ratio analysis (liquidity, profitability, efficiency)
- DuPont analysis
- Basic vs diluted EPS
- Cash flow interpretation

### Corporate Finance
- Capital Budgeting: NPV, IRR, PI, payback period
- Capital Structure: WACC, optimal leverage, debt vs equity
- DCF Valuation: FCFF, FCFE, terminal value, discounting
- Relative Valuation: P/E, EV/EBITDA, P/B multiples

### Markets & Instruments
- Bond markets: YTM, duration, convexity, price-yield relationship
- Derivatives: Futures, options, forwards, swaps with payoff charts
- Mutual Funds vs ETFs: Structure, costs, liquidity, tracking error, taxation

## 🚧 Roadmap

### Phase 1: MVP ✅
- [x] Core structure & routing
- [x] Gamification engine
- [x] Dashboard & progress tracking
- [x] First module (Financial Statements)
- [x] Quiz system
- [x] Interactive components

### Phase 2: Enhancement
- [ ] Add more quiz questions
- [ ] Expand module content
- [ ] Add animations (Framer Motion)
- [ ] Improve responsive design
- [ ] Add more interactive visualizations

### Phase 3: Advanced Features
- [ ] Backend API for user accounts
- [ ] Social features (leaderboard, sharing)
- [ ] AI tutor integration
- [ ] Mobile app
- [ ] Advanced analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with ❤️ for finance education. Designed to make complex financial concepts accessible and engaging through gamification and interactivity.

---

**Start your finance learning journey today!** 🚀
