export interface FinancialLineItem {
    id: string;
    label: string;
    value: number;
    type: 'revenue' | 'expense' | 'asset' | 'liability' | 'equity' | 'cash-flow';
    isDriver?: boolean; // If true, this value drives others (e.g., Revenue)
    format?: 'currency' | 'percentage' | 'number';
}

export interface IncomeStatement {
    revenue: number;
    cogs: number;
    grossProfit: number;
    operatingExpenses: number;
    operatingIncome: number;
    interestExpense: number;
    taxes: number;
    netIncome: number;
}

export interface BalanceSheet {
    cash: number;
    accountsReceivable: number;
    inventory: number;
    currentAssets: number;
    ppAndE: number; // Property, Plant, and Equipment
    totalAssets: number;

    accountsPayable: number;
    shortTermDebt: number;
    currentLiabilities: number;
    longTermDebt: number;
    totalLiabilities: number;

    commonStock: number;
    retainedEarnings: number;
    totalEquity: number;
}

export interface CashFlowStatement {
    netIncome: number;
    depreciation: number;
    changesInWorkingCapital: number;
    cashFromOperations: number;

    capex: number;
    cashFromInvesting: number;

    debtIssued: number;
    debtRepaid: number;
    dividendsPaid: number;
    cashFromFinancing: number;

    netChangeInCash: number;
}

export interface FinancialYear {
    year: number;
    incomeStatement: IncomeStatement;
    balanceSheet: BalanceSheet;
    cashFlow: CashFlowStatement;
}

// Initial Sandbox Data
export const INITIAL_FINANCIAL_DATA: FinancialYear = {
    year: 2024,
    incomeStatement: {
        revenue: 1000000,
        cogs: 600000,
        grossProfit: 400000,
        operatingExpenses: 200000,
        operatingIncome: 200000,
        interestExpense: 20000,
        taxes: 45000,
        netIncome: 135000,
    },
    balanceSheet: {
        cash: 150000,
        accountsReceivable: 100000,
        inventory: 150000,
        currentAssets: 400000,
        ppAndE: 600000,
        totalAssets: 1000000,

        accountsPayable: 80000,
        shortTermDebt: 50000,
        currentLiabilities: 130000,
        longTermDebt: 300000,
        totalLiabilities: 430000,

        commonStock: 200000,
        retainedEarnings: 370000,
        totalEquity: 570000,
    },
    cashFlow: {
        netIncome: 135000,
        depreciation: 50000,
        changesInWorkingCapital: -20000,
        cashFromOperations: 165000,

        capex: -100000,
        cashFromInvesting: -100000,

        debtIssued: 0,
        debtRepaid: -20000,
        dividendsPaid: -30000,
        cashFromFinancing: -50000,

        netChangeInCash: 15000,
    },
};
