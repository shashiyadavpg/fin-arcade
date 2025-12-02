export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
  lessons: Lesson[];
  quizzes: string[]; // Quiz IDs
  prerequisites?: string[]; // Module IDs
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  examples: Example[];
  interactive?: boolean;
  estimatedTime: number;
}

export interface Example {
  title: string;
  description: string;
  calculation?: string;
  result?: string;
}

export const modules: Module[] = [
  {
    id: 'financial-statements',
    title: 'Financial Statement Analysis',
    description: 'Master trend, vertical, horizontal, and ratio analysis. Learn DuPont analysis, EPS calculations, and cash flow interpretation.',
    icon: '📊',
    color: 'emerald',
    difficulty: 'beginner',
    estimatedTime: 180,
    lessons: [
      {
        id: 'trend-analysis',
        title: 'Trend Analysis',
        content: 'Trend analysis examines financial data over multiple periods to identify patterns, growth rates, and potential issues.',
        examples: [
          {
            title: 'Revenue Growth',
            description: 'A company\'s revenue grew from $1M to $1.5M over 3 years.',
            calculation: 'Growth Rate = ((Final - Initial) / Initial) × 100',
            result: 'Growth Rate = ((1.5M - 1M) / 1M) × 100 = 50% over 3 years',
          },
        ],
        estimatedTime: 20,
      },
      {
        id: 'ratio-analysis',
        title: 'Ratio Analysis',
        content: 'Financial ratios help compare companies and assess performance. Key ratios include liquidity, profitability, and efficiency ratios.',
        examples: [
          {
            title: 'Current Ratio',
            description: 'Measures short-term liquidity',
            calculation: 'Current Ratio = Current Assets / Current Liabilities',
            result: 'A ratio above 1 indicates good short-term liquidity',
          },
        ],
        estimatedTime: 30,
        interactive: true,
      },
    ],
    quizzes: ['fs-quiz-1', 'fs-quiz-2'],
  },
  {
    id: 'corporate-finance',
    title: 'Corporate Finance',
    description: 'Capital budgeting (NPV, IRR), capital structure (WACC), DCF valuation, and relative valuation methods.',
    icon: '💼',
    color: 'cyan',
    difficulty: 'intermediate',
    estimatedTime: 240,
    lessons: [
      {
        id: 'npv-irr',
        title: 'NPV & IRR',
        content: 'Net Present Value (NPV) and Internal Rate of Return (IRR) are key capital budgeting techniques.',
        examples: [
          {
            title: 'NPV Calculation',
            description: 'A project requires $1000 investment and generates $300/year for 5 years at 10% discount rate.',
            calculation: 'NPV = -1000 + Σ(300/(1.1)^t) for t=1 to 5',
            result: 'NPV ≈ $137.24 (positive = accept project)',
          },
        ],
        estimatedTime: 25,
        interactive: true,
      },
      {
        id: 'dcf-valuation',
        title: 'DCF Valuation',
        content: 'Discounted Cash Flow valuation estimates company value by discounting future cash flows.',
        examples: [
          {
            title: 'FCFF Model',
            description: 'Free Cash Flow to Firm (FCFF) = EBIT(1-Tax) + Depreciation - CapEx - Change in NWC',
          },
        ],
        estimatedTime: 35,
        interactive: true,
      },
    ],
    quizzes: ['cf-quiz-1'],
    prerequisites: ['financial-statements'],
  },
  {
    id: 'markets',
    title: 'Markets & Instruments',
    description: 'Bond markets, derivatives (futures, options, swaps), and mutual funds vs ETFs.',
    icon: '📈',
    color: 'sky',
    difficulty: 'advanced',
    estimatedTime: 300,
    lessons: [
      {
        id: 'bonds',
        title: 'Bond Markets',
        content: 'Understand YTM, duration, convexity, and the price-yield relationship.',
        examples: [
          {
            title: 'YTM Calculation',
            description: 'Yield to Maturity is the total return expected if bond is held to maturity.',
            calculation: 'YTM considers coupon payments, face value, current price, and time to maturity',
          },
        ],
        estimatedTime: 30,
        interactive: true,
      },
      {
        id: 'derivatives',
        title: 'Derivatives',
        content: 'Futures, options, forwards, and swaps. Learn payoff charts and hedging strategies.',
        examples: [
          {
            title: 'Call Option Payoff',
            description: 'Call option profit = Max(0, Stock Price - Strike Price) - Premium',
          },
        ],
        estimatedTime: 40,
        interactive: true,
      },
    ],
    quizzes: ['mk-quiz-1'],
    prerequisites: ['corporate-finance'],
  },
];

export function getModule(id: string): Module | undefined {
  return modules.find(m => m.id === id);
}

