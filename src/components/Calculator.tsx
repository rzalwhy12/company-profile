'use client';

import { useState } from 'react';
import { Calculator as PiggyBank, CreditCard } from 'lucide-react';

const Calculator = () => {
  const [activeTab, setActiveTab] = useState<'loan' | 'deposit'>('loan');
  
  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(100000000);
  const [loanTerm, setLoanTerm] = useState<number>(12);
  const [loanRate, setLoanRate] = useState<number>(12);
  
  // Deposit Calculator State
  const [depositAmount, setDepositAmount] = useState<number>(10000000);
  const [depositTerm, setDepositTerm] = useState<number>(12);
  const [depositRate, setDepositRate] = useState<number>(6);

  const calculateLoan = () => {
    const monthlyRate = loanRate / 100 / 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                          (Math.pow(1 + monthlyRate, loanTerm) - 1);
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;
    
    return {
      monthlyPayment,
      totalPayment,
      totalInterest
    };
  };

  const calculateDeposit = () => {
    const monthlyRate = depositRate / 100 / 12;
    const futureValue = depositAmount * Math.pow(1 + monthlyRate, depositTerm);
    const totalInterest = futureValue - depositAmount;
    
    return {
      futureValue,
      totalInterest,
      monthlyInterest: totalInterest / depositTerm
    };
  };

  const loanResult = calculateLoan();
  const depositResult = calculateDeposit();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section id="calculators" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Calculator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your loan needs and potential deposit returns easily
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => setActiveTab('loan')}
              className={`flex items-center justify-center space-x-2 flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'loan'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <CreditCard className="h-5 w-5" />
              <span>Loan Calculator</span>
            </button>
            <button
              onClick={() => setActiveTab('deposit')}
              className={`flex items-center justify-center space-x-2 flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'deposit'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <PiggyBank className="h-5 w-5" />
              <span>Deposit Calculator</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Loan Calculator */}
            {activeTab === 'loan' && (
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Loan Data
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loan Amount
                      </label>
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="100000000"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {formatCurrency(loanAmount)}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Period (Months)
                      </label>
                      <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interest Rate (% per annum)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={loanRate}
                        onChange={(e) => setLoanRate(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="12"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Calculation Results
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-blue-200">
                        <span className="text-gray-600">Installment per Month</span>
                        <span className="font-semibold text-blue-600">
                          {formatCurrency(loanResult.monthlyPayment)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-blue-200">
                        <span className="text-gray-600">Total payment</span>
                        <span className="font-semibold text-blue-600">
                          {formatCurrency(loanResult.totalPayment)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Total Interest</span>
                        <span className="font-semibold text-red-600">
                          {formatCurrency(loanResult.totalInterest)}
                        </span>
                      </div>
                    </div>

                    <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300">
                      Apply for a Loan
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Deposit Calculator */}
            {activeTab === 'deposit' && (
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Deposit Data
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deposit Amount
                      </label>
                      <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="10000000"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {formatCurrency(depositAmount)}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Period (Months)
                      </label>
                      <input
                        type="number"
                        value={depositTerm}
                        onChange={(e) => setDepositTerm(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interest Rate (% per annum)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={depositRate}
                        onChange={(e) => setDepositRate(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="6"
                      />
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Calculation Results
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-green-200">
                        <span className="text-gray-600">Initial Funds</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(depositAmount)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-green-200">
                        <span className="text-gray-600">Final score</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(depositResult.futureValue)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-green-200">
                        <span className="text-gray-600">Total Interest</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(depositResult.totalInterest)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Interest per Month</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(depositResult.monthlyInterest)}
                        </span>
                      </div>
                    </div>

                    <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-300">
                      Open Deposit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;