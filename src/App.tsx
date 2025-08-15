import React, { useState } from 'react';
import { Calculator, Users, DollarSign, TrendingUp, ArrowDown } from 'lucide-react';

export default function PrysmSalesCalculator() {
  const [data, setData] = useState({
    affiliates: 0, participationRate: 0, monthlyScans: 0, conversionRate: 0, monthlyPurchase: 0
  });

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: parseFloat(value.replace(/[$,%]/g, '')) || 0 }));
  };

  const format = (field, value) => {
    if (!value) return '';
    if (field.includes('Rate')) return value + '%';
    if (field === 'monthlyPurchase') return '$' + value;
    return value.toLocaleString();
  };

  const prysmOwners = data.affiliates * (data.participationRate / 100);
  const prysmDeviceRevenue = prysmOwners * 300;
  const totalScanned = prysmOwners * data.monthlyScans;
  const buyers = totalScanned * (data.conversionRate / 100);
  const monthlySales = buyers * data.monthlyPurchase;
  const g15BreakawayBonus = (monthlySales * 0.776) * 0.05;
  const annualSales = monthlySales * 12;

  const currency = val => '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2 });
  const number = val => val.toLocaleString('en-US', { maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Calculator className="h-7 w-7 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Basic Prysm Product Sales Calculator</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-slate-600" />
              <h2 className="text-lg font-semibold text-gray-800">Inputs</h2>
            </div>
            <div className="space-y-1">
              <div>
                <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-slate-400">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Affiliate or Sales Leader Count</label>
                  <input
                    type="text"
                    value={format('affiliates', data.affiliates)}
                    onChange={(e) => handleChange('affiliates', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="100,000 affiliates or 3,000 sales leaders"
                  />
                </div>
                <div className="flex justify-center my-1"><ArrowDown className="h-5 w-5 text-slate-500" /></div>
              </div>

              <div>
                <div className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-400">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Participation Rate (%)</label>
                  <div className="text-xs text-gray-600 mb-1 italic">
                    This is the percent of the people above you believe will purchase (or receive some other way) a Prysm device. For context, the US had 50% BR+ participation for the 2021 Collagen preview. For the full launch there was a 25% participation rate.
                  </div>
                  <input
                    type="text"
                    value={format('participationRate', data.participationRate)}
                    onChange={(e) => handleChange('participationRate', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="25%-50%"
                  />
                </div>
                <div className="flex justify-center my-1"><ArrowDown className="h-5 w-5 text-indigo-500" /></div>
              </div>

              <div>
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly People Scanned Per Prysm Owner</label>
                  <div className="text-xs text-gray-600 mb-1 italic">
                    The number of people each Prysm owner will scan on a monthly basis. For context, based on discussions with current scanner operators, this will likely be between 10-20 scans per month.
                  </div>
                  <input
                    type="text"
                    value={format('monthlyScans', data.monthlyScans)}
                    onChange={(e) => handleChange('monthlyScans', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10-20"
                  />
                </div>
                <div className="flex justify-center my-1"><ArrowDown className="h-5 w-5 text-blue-500" /></div>
              </div>

              <div>
                <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Conversion Rate (%)</label>
                  <div className="text-xs text-gray-600 mb-1 italic">
                    The percent of people who are scanned that you believe will purchase product (ideally as a subscription). For context, current scanner operators believe this to be about 10%.
                  </div>
                  <input
                    type="text"
                    value={format('conversionRate', data.conversionRate)}
                    onChange={(e) => handleChange('conversionRate', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="10%"
                  />
                </div>
                <div className="flex justify-center my-1"><ArrowDown className="h-5 w-5 text-purple-500" /></div>
              </div>

              <div>
                <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Projected Subscriber Purchase Amount (USD)</label>
                  <div className="text-xs text-gray-600 mb-1 italic">
                    The amount you believe each new subscriber will purchase in a given month.
                  </div>
                  <input
                    type="text"
                    value={format('monthlyPurchase', data.monthlyPurchase)}
                    onChange={(e) => handleChange('monthlyPurchase', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="$50"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                <div className="text-xs text-blue-700">
                  <div className="font-medium mb-1">Average product prices (US):</div>
                  <div className="grid grid-cols-2 gap-x-4 text-xs">
                    <div>ageLOC Youth: $115</div>
                    <div>LifePak: $84</div>
                    <div>G3 Bottle (2-pack): $84</div>
                    <div>Collagen: $85</div>
                    <div>Mind Full 30 day: $57</div>
                    <div>Eye Formula: $40</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-800">Results</h2>
            </div>
            <div className="space-y-1">
              {/* Empty space to align with first input */}
              <div className="h-16"></div>
              <div className="flex justify-center my-1"><ArrowDown className="h-5 w-5 text-slate-500" /></div>

              <div>
                <div className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-400">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-700">Prysm Owners</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1 invisible">
                    Spacing to match left column height
                  </div>
                  <div className="text-lg font-semibold text-indigo-600 mb-1">
                    {number(prysmOwners)}
                  </div>
                  <div className="text-xs text-gray-500 bg-white p-2 rounded mb-2">
                    Formula: {number(data.affiliates)} × {data.participationRate}%
                  </div>
                  <div className="text-xs text-indigo-700 bg-indigo-100 p-2 rounded">
                    Device Revenue: {number(prysmOwners)} × $300 = ${number(prysmDeviceRevenue)}
                  </div>
                </div>
                <div className="flex justify-center my-1"><ArrowDown className="h-5 w-5 text-indigo-500" /></div>
              </div>

              <div>
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-700">Total People Scanned</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1 invisible">
                    Spacing to match left column height
                  </div>
                  <div className="text-lg font-semibold text-blue-600 mb-1">
                    {number(totalScanned)}
                  </div>
                  <div className="text-xs text-gray-500 bg-white p-2 rounded">
                    Formula: {number(prysmOwners)} × {data.monthlyScans}
                  </div>
                </div>
                <div className="flex justify-center my-1"><ArrowDown className="h-5 w-5 text-blue-500" /></div>
              </div>

              <div>
                <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-700">Converted Buyers</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1 invisible">
                    Spacing to match left column height
                  </div>
                  <div className="text-lg font-semibold text-purple-600 mb-1">
                    {number(buyers)}
                  </div>
                  <div className="text-xs text-gray-500 bg-white p-2 rounded">
                    Formula: {number(totalScanned)} × {data.conversionRate}%
                  </div>
                </div>
                <div className="flex justify-center my-1"><ArrowDown className="h-5 w-5 text-purple-500" /></div>
              </div>

              <div>
                <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-700">Projected Monthly Product Sales</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1 invisible">
                    Spacing to match left column height
                  </div>
                  <div className="text-lg font-semibold text-green-600 mb-1">
                    {currency(monthlySales)}
                  </div>
                  <div className="text-xs text-gray-500 bg-white p-2 rounded">
                    Formula: {number(buyers)} × ${data.monthlyPurchase}
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 my-2">
                <div className="text-xs text-emerald-800">
                  <strong>G1-6 Breakaway Bonus (5%):</strong> {currency(g15BreakawayBonus)}
                </div>
                <div className="text-xs text-emerald-700 mt-1 italic">
                  Sales Converted to CV and calculated with a 5% Breakaway Bonus
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 my-2">
                <div className="text-xs text-amber-800">
                  <strong>Note:</strong> These sales numbers do not take into account cannibalization and should only be used for rough estimations.
                </div>
              </div>

              <div className="flex justify-center my-1"><ArrowDown className="h-5 w-5 text-green-500" /></div>

              <div>
                <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-700">Projected Annualized Product Sales</span>
                  </div>
                  <div className="text-xl font-bold text-yellow-600 mb-1">
                    {currency(annualSales)}
                  </div>
                  <div className="text-xs text-gray-500 bg-white p-2 rounded">
                    Formula: {currency(monthlySales)} × 12
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
