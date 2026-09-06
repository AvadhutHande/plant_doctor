import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Wallet, TrendingDown, TrendingUp, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { toast } from 'sonner';
import { Field } from '../types';

interface ExpenseTrackerProps {
  onBack: () => void;
  selectedField: Field;
}

interface ExpenseCategory {
  category: string;
  amount: number;
  color: string;
}

interface Transaction {
  id: string;
  date: string;
  type: 'expense' | 'income';
  category: string;
  amount: number;
  description: string;
}

// Mock data for different crops
const MOCK_DATA: Record<string, { expenses: ExpenseCategory[], transactions: Transaction[], totalIncome: number }> = {
  'Cotton': {
    expenses: [
      { category: 'Seeds', amount: 8000, color: '#3b82f6' },
      { category: 'Fertilizers', amount: 12000, color: '#10b981' },
      { category: 'Pesticides', amount: 6000, color: '#f59e0b' },
      { category: 'Irrigation', amount: 4500, color: '#06b6d4' },
      { category: 'Labor', amount: 15000, color: '#8b5cf6' },
      { category: 'Others', amount: 2500, color: '#ef4444' }
    ],
    transactions: [
      { id: 't1', date: 'Feb 5', type: 'expense', category: 'Labor', amount: 3000, description: 'Harvesting labor' },
      { id: 't2', date: 'Feb 3', type: 'expense', category: 'Pesticides', amount: 1500, description: 'Insecticide spray' },
      { id: 't3', date: 'Feb 1', type: 'income', category: 'Sale', amount: 25000, description: 'Cotton sale - 4 quintals' },
      { id: 't4', date: 'Jan 28', type: 'expense', category: 'Fertilizers', amount: 4000, description: 'Urea - 2 bags' },
      { id: 't5', date: 'Jan 25', type: 'expense', category: 'Irrigation', amount: 1500, description: 'Electricity bill' }
    ],
    totalIncome: 65000
  },
  'Wheat': {
    expenses: [
      { category: 'Seeds', amount: 5000, color: '#3b82f6' },
      { category: 'Fertilizers', amount: 8000, color: '#10b981' },
      { category: 'Pesticides', amount: 3000, color: '#f59e0b' },
      { category: 'Irrigation', amount: 6000, color: '#06b6d4' },
      { category: 'Labor', amount: 10000, color: '#8b5cf6' },
      { category: 'Others', amount: 2000, color: '#ef4444' }
    ],
    transactions: [
      { id: 'w1', date: 'Feb 8', type: 'expense', category: 'Irrigation', amount: 1200, description: 'Water pump fuel' },
      { id: 'w2', date: 'Feb 4', type: 'expense', category: 'Fertilizers', amount: 2500, description: 'Top dressing urea' },
      { id: 'w3', date: 'Jan 15', type: 'expense', category: 'Seeds', amount: 5000, description: 'Wheat seeds purchase' }
    ],
    totalIncome: 0 // Not harvested yet
  },
  'Soybean': {
    expenses: [
      { category: 'Seeds', amount: 6000, color: '#3b82f6' },
      { category: 'Fertilizers', amount: 9000, color: '#10b981' },
      { category: 'Pesticides', amount: 4000, color: '#f59e0b' },
      { category: 'Irrigation', amount: 3000, color: '#06b6d4' },
      { category: 'Labor', amount: 8000, color: '#8b5cf6' },
      { category: 'Others', amount: 1500, color: '#ef4444' }
    ],
    transactions: [
      { id: 's1', date: 'Feb 6', type: 'expense', category: 'Pesticides', amount: 2000, description: 'Pest control spray' },
      { id: 's2', date: 'Jan 30', type: 'expense', category: 'Labor', amount: 1500, description: 'Weeding labor' }
    ],
    totalIncome: 0
  }
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6', '#ef4444'];

export default function ExpenseTracker({ onBack, selectedField }: ExpenseTrackerProps) {
  const [expenses, setExpenses] = useState<ExpenseCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
    type: 'expense'
  });

  // Load data when field changes
  useEffect(() => {
    const data = MOCK_DATA[selectedField.crop] || MOCK_DATA['Cotton'];
    setExpenses(data.expenses);
    setTransactions(data.transactions);
    setTotalIncome(data.totalIncome);
  }, [selectedField.crop]);

  const handleAddTransaction = () => {
    if (!newExpense.category || !newExpense.amount || !newExpense.description) {
      toast.error('Please fill all fields');
      return;
    }

    const amount = parseFloat(newExpense.amount);
    const type = newExpense.type as 'expense' | 'income';
    
    // Create new transaction
    const transaction: Transaction = {
      id: Date.now().toString(),
      date: 'Today',
      type,
      category: newExpense.category,
      amount,
      description: newExpense.description
    };

    setTransactions([transaction, ...transactions]);

    // Update totals
    if (type === 'income') {
      setTotalIncome(prev => prev + amount);
    } else {
      // Update expense category
      const existingCategoryIndex = expenses.findIndex(e => e.category === newExpense.category);
      if (existingCategoryIndex >= 0) {
        const updatedExpenses = [...expenses];
        updatedExpenses[existingCategoryIndex].amount += amount;
        setExpenses(updatedExpenses);
      } else {
        // Add new category if it doesn't exist (or was 'Others')
        const color = COLORS[expenses.length % COLORS.length];
        setExpenses([...expenses, { category: newExpense.category, amount, color }]);
      }
    }

    setShowAddExpense(false);
    setNewExpense({ category: '', amount: '', description: '', type: 'expense' });
    toast.success(`${type === 'income' ? 'Income' : 'Expense'} added successfully!`);
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const profit = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-purple-700 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl">Expense & Profit Tracker</h1>
            <p className="text-sm text-purple-100">{selectedField.crop} - {selectedField.name}</p>
          </div>
          <button 
            onClick={() => setShowAddExpense(true)}
            className="p-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-red-50 border-red-200 shadow-md">
            <CardContent className="p-3 text-center">
              <TrendingDown className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600">Expenses</p>
              <p className="text-lg text-red-700">₹{totalExpense.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200 shadow-md">
            <CardContent className="p-3 text-center">
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600">Income</p>
              <p className="text-lg text-green-700">₹{totalIncome.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200 shadow-md">
            <CardContent className="p-3 text-center">
              <Wallet className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600">Profit</p>
              <p className={`text-lg ${profit >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
                {profit >= 0 ? '' : '-'}₹{Math.abs(profit).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Expense Breakdown Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {expenses.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={expenses}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label={(entry) => `${entry.category}`}
                  >
                    {expenses.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-gray-500">
                No expenses recorded yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category-wise Expenses */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Category-wise Expenses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {expenses.map((exp, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: exp.color }}
                  />
                  <p className="text-sm text-gray-800">{exp.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-base text-gray-900">₹{exp.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">
                    {totalExpense > 0 ? ((exp.amount / totalExpense) * 100).toFixed(0) : 0}%
                  </p>
                </div>
              </div>
            ))}
            {expenses.length === 0 && (
               <p className="text-center text-gray-500 py-4">No categories data</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {transactions.map((txn, index) => (
              <div 
                key={txn.id || index} 
                className={`p-3 rounded-lg ${
                  txn.type === 'income' ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{txn.category}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{txn.description}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-base ${
                      txn.type === 'income' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {txn.type === 'income' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">{txn.date}</p>
                  </div>
                </div>
              </div>
            ))}
             {transactions.length === 0 && (
               <p className="text-center text-gray-500 py-4">No transactions yet</p>
            )}
          </CardContent>
        </Card>

        {/* Profit Summary */}
        <Card className="border-blue-300 bg-blue-50 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Season Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-700">Total Investment</span>
              <span className="text-base text-red-700">₹{totalExpense.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-700">Total Income</span>
              <span className="text-base text-green-700">₹{totalIncome.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-200 rounded-lg">
              <span className="text-sm text-blue-900">Net Profit</span>
              <span className={`text-xl font-semibold ${profit >= 0 ? 'text-blue-900' : 'text-red-800'}`}>
                {profit >= 0 ? '' : '-'}₹{Math.abs(profit).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-in fade-in slide-in-from-bottom-10">
          <div className="bg-white rounded-t-2xl w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Add Transaction</h3>
              <button 
                onClick={() => setShowAddExpense(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setNewExpense({ ...newExpense, type: 'expense' })}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                    newExpense.type === 'expense' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Expense
                </button>
                <button
                  onClick={() => setNewExpense({ ...newExpense, type: 'income' })}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                    newExpense.type === 'income' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Income
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select 
                  className="w-full h-12 px-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  {newExpense.type === 'expense' ? (
                    <>
                      <option value="Seeds">Seeds</option>
                      <option value="Fertilizers">Fertilizers</option>
                      <option value="Pesticides">Pesticides</option>
                      <option value="Irrigation">Irrigation</option>
                      <option value="Labor">Labor</option>
                      <option value="Others">Others</option>
                    </>
                  ) : (
                     <>
                      <option value="Sale">Crop Sale</option>
                      <option value="Subsidy">Government Subsidy</option>
                      <option value="Insurance">Insurance Claim</option>
                      <option value="Other">Other Income</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="h-12 text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Input
                  type="text"
                  placeholder={newExpense.type === 'expense' ? "e.g., Urea - 2 bags" : "e.g., Sold 5 quintals"}
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline"
                  className="flex-1 h-12"
                  onClick={() => setShowAddExpense(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className={`flex-1 h-12 ${
                    newExpense.type === 'expense' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                  onClick={handleAddTransaction}
                >
                  Add {newExpense.type === 'expense' ? 'Expense' : 'Income'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}