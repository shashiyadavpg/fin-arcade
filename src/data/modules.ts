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
        id: 'financial-statements-intro',
        title: 'The Financial Story',
        content: 'Financial statements are the scorecard of business. Learn how the Income Statement, Balance Sheet, and Cash Flow Statement connect.',
        examples: [],
        estimatedTime: 15,
        interactive: true,
      },
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
        interactive: true,
      },
      {
        id: 'vertical-analysis',
        title: 'Vertical Analysis',
        content: 'Vertical analysis looks at each line item as a percentage of a base figure (usually Revenue or Total Assets). It reveals cost structure efficiency.',
        examples: [],
        estimatedTime: 20,
        interactive: true,
      },
      {
        id: 'horizontal-analysis',
        title: 'Horizontal Analysis',
        content: 'Horizontal analysis compares financial data over time to identify trends and growth patterns. It highlights year-over-year changes.',
        examples: [],
        estimatedTime: 20,
        interactive: true,
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
      {
        id: 'dupont-analysis',
        title: 'DuPont Analysis',
        content: 'DuPont Analysis breaks down Return on Equity (ROE) into three drivers: Profit Margin, Asset Turnover, and Financial Leverage.',
        examples: [],
        estimatedTime: 25,
        interactive: true,
      },
      {
        id: 'eps-analysis',
        title: 'Earnings Per Share (EPS)',
        content: 'Understand the difference between Basic and Diluted EPS. See how stock options and convertible bonds dilute shareholder value.',
        examples: [],
        estimatedTime: 20,
        interactive: true,
      },
      {
        id: 'cash-flow-analysis',
        title: 'Cash Flow Analysis',
        content: 'Profit is opinion, cash is fact. Analyze the three pipelines of cash: Operating, Investing, and Financing activities.',
        examples: [],
        estimatedTime: 25,
        interactive: true,
      },
    ],
    quizzes: ['fs-quiz-1', 'fs-quiz-2'],
  },
  {
    id: 'corporate-finance',
    title: 'Corporate Finance',
    description: 'Master the art of valuation and strategic financial decisions. Learn Capital Budgeting, Capital Structure, and DCF Valuation.',
    icon: '💼',
    color: 'cyan',
    difficulty: 'intermediate',
    estimatedTime: 240,
    lessons: [
      {
        id: 'time-value-money',
        title: 'Time Value of Money',
        content: 'The core principle of finance: A dollar today is worth more than a dollar tomorrow.',
        examples: [
          {
            title: 'Future Value',
            description: 'Invest $100 today at 10% interest for 1 year.',
            calculation: 'FV = PV * (1 + r)^n',
            result: '$110',
          },
        ],
        estimatedTime: 20,
      },
      {
        id: 'capital-budgeting',
        title: 'Capital Budgeting (NPV & IRR)',
        content: 'How companies decide which projects to invest in using Net Present Value (NPV) and Internal Rate of Return (IRR).',
        examples: [
          {
            title: 'NPV Decision Rule',
            description: 'Accept if NPV > 0. Reject if NPV < 0.',
            calculation: 'NPV = Σ (Cash Flow / (1+r)^t) - Initial Investment',
          },
        ],
        estimatedTime: 40,
        interactive: true,
      },
      {
        id: 'capital-structure',
        title: 'Capital Structure & WACC',
        content: 'Balancing Debt and Equity. The Weighted Average Cost of Capital (WACC) is the hurdle rate for investments.',
        examples: [
          {
            title: 'WACC Formula',
            description: 'WACC = (E/V * Re) + (D/V * Rd * (1-T))',
            calculation: 'Cost of Equity + After-tax Cost of Debt',
          },
        ],
        estimatedTime: 35,
      },
      {
        id: 'dcf-valuation',
        title: 'DCF Valuation',
        content: 'The gold standard of valuation. Estimate the intrinsic value of a company by forecasting and discounting its future cash flows.',
        examples: [
          {
            title: 'Terminal Value',
            description: 'The value of the company beyond the forecast period.',
            calculation: 'TV = (Final CF * (1+g)) / (WACC - g)',
          },
        ],
        estimatedTime: 60,
        interactive: true,
      },
      {
        id: 'relative-valuation',
        title: 'Relative Valuation',
        content: 'Valuing a company by comparing it to similar companies using multiples like P/E and EV/EBITDA.',
        examples: [
          {
            title: 'P/E Ratio',
            description: 'Price per Earnings. High P/E suggests high growth expectations.',
            calculation: 'Price / EPS',
          },
        ],
        estimatedTime: 30,
      },
    ],
    quizzes: ['cf-quiz-1', 'cf-quiz-2'],
    prerequisites: ['financial-statements'],
  },
  {
    id: 'markets',
    title: 'Markets & Instruments',
    description: 'Explore the world of fixed income, derivatives, and investment vehicles. Master Bonds, Options, and ETFs.',
    icon: '📈',
    color: 'sky',
    difficulty: 'advanced',
    estimatedTime: 300,
    lessons: [
      {
        id: 'bonds',
        title: 'Bond Markets & Valuation',
        content: 'Bonds are debt securities. Understand the relationship between Price and Yield, and concepts like Duration and Convexity.',
        examples: [
          {
            title: 'Price-Yield Relationship',
            description: 'Bond prices and yields move inversely. When yields go up, prices go down.',
            calculation: 'Price = Σ (Coupon / (1+r)^t) + (Face Value / (1+r)^n)',
          },
        ],
        estimatedTime: 45,
        interactive: true,
      },
      {
        id: 'derivatives',
        title: 'Derivatives (Options & Futures)',
        content: 'Financial contracts whose value is derived from an underlying asset. Learn about Calls, Puts, and Hedging.',
        examples: [
          {
            title: 'Call Option',
            description: 'The right to BUY an asset at a specific price.',
            calculation: 'Profit = Max(0, Spot - Strike) - Premium',
          },
        ],
        estimatedTime: 60,
        interactive: true,
      },
      {
        id: 'etfs-vs-funds',
        title: 'Mutual Funds vs ETFs',
        content: 'Compare active vs passive investing. Understand expense ratios, liquidity, and tax efficiency.',
        examples: [
          {
            title: 'Expense Ratio Impact',
            description: 'A 1% difference in fees can cost you thousands over decades.',
            calculation: 'Future Value = P * (1 + r - fees)^t',
          },
        ],
        estimatedTime: 30,
        interactive: true,
      },
    ],
    quizzes: ['mk-quiz-1', 'mk-quiz-2'],
    prerequisites: ['corporate-finance'],
  },
];

export function getModule(id: string): Module | undefined {
  return modules.find(m => m.id === id);
}
