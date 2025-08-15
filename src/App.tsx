import React, { useState, useEffect } from 'react';
import { Calculator, Users, TrendingUp, ArrowDown } from 'lucide-react';

export default function PrysmSalesCalculator() {
  const [data, setData] = useState({
    affiliates: 0, 
    participationRate: 0, 
    monthlyScans: 0, 
    conversionRate: 0, 
    monthlyPurchase: 0
  });
  
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({
    'USD': 1.0000, 'ARS': 1000.00, 'AUD': 1.4580, 'BRL': 5.20, 'BND': 1.35, 'CAD': 1.2650,
    'CHF': 0.9240, 'CLP': 950.00, 'CNY': 6.4550, 'COP': 4200.00, 'CRC': 520.00, 'CZK': 23.50,
    'DKK': 6.80, 'EUR': 0.8590, 'FJD': 2.25, 'GBP': 0.7745, 'GTQ': 7.80, 'HKD': 7.85,
    'HNL': 25.00, 'HUF': 365.00, 'IDR': 15800.00, 'ILS': 3.60, 'ISK': 135.00, 'JPY': 110.25,
    'KRW': 1200.00, 'MXN': 20.15, 'MYR': 4.20, 'NOK': 9.50, 'NZD': 1.55, 'PEN': 3.90,
    'PHP': 50.00, 'PLN': 4.10, 'RON': 4.25, 'RUB': 75.00, 'SEK': 9.20, 'SGD': 1.35,
    'SVC': 8.75, 'THB': 33.50, 'TRY': 15.00, 'TWD': 28.50, 'UAH': 27.50, 'VES': 45.00,
    'VND': 23000.00, 'ZAR': 16.80
  });
  
  const [ratesLoading, setRatesLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch live exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setRatesLoading(true);
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        
        if (data.rates) {
          setExchangeRates({
            'USD': 1.0000,
            'ARS': data.rates.ARS || 1000.00,
            'AUD': data.rates.AUD || 1.4580,
            'BRL': data.rates.BRL || 5.20,
            'BND': data.rates.BND || 1.35,
            'CAD': data.rates.CAD || 1.2650,
            'CHF': data.rates.CHF || 0.9240,
            'CLP': data.rates.CLP || 950.00,
            'CNY': data.rates.CNY || 6.4550,
            'COP': data.rates.COP || 4200.00,
            'CRC': data.rates.CRC || 520.00,
            'CZK': data.rates.CZK || 23.50,
            'DKK': data.rates.DKK || 6.80,
            'EUR': data.rates.EUR || 0.8590,
            'FJD': data.rates.FJD || 2.25,
            'GBP': data.rates.GBP || 0.7745,
            'GTQ': data.rates.GTQ || 7.80,
            'HKD': data.rates.HKD || 7.85,
            'HNL': data.rates.HNL || 25.00,
            'HUF': data.rates.HUF || 365.00,
            'IDR': data.rates.IDR || 15800.00,
            'ILS': data.rates.ILS || 3.60,
            'ISK': data.rates.ISK || 135.00,
            'JPY': data.rates.JPY || 110.25,
            'KRW': data.rates.KRW || 1200.00,
            'MXN': data.rates.MXN || 20.15,
            'MYR': data.rates.MYR || 4.20,
            'NOK': data.rates.NOK || 9.50,
            'NZD': data.rates.NZD || 1.55,
            'PEN': data.rates.PEN || 3.90,
            'PHP': data.rates.PHP || 50.00,
            'PLN': data.rates.PLN || 4.10,
            'RON': data.rates.RON || 4.25,
            'RUB': data.rates.RUB || 75.00,
            'SEK': data.rates.SEK || 9.20,
            'SGD': data.rates.SGD || 1.35,
            'SVC': data.rates.SVC || 8.75,
            'THB': data.rates.THB || 33.50,
            'TRY': data.rates.TRY || 15.00,
            'TWD': data.rates.TWD || 28.50,
            'UAH': data.rates.UAH || 27.50,
            'VES': data.rates.VES || 45.00,
            'VND': data.rates.VND || 23000.00,
            'ZAR': data.rates.ZAR || 16.80
          });
          setLastUpdated(new Date().toLocaleString());
        }
      } catch (error) {
        console.log('Using fallback exchange rates');
      } finally {
        setRatesLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: parseFloat(value.replace(/[\$,%]/g, '')) || 0 }));
  };

  const format = (field, value) => {
    if (!value) return '';
    if (field.includes('Rate')) return value + '%';
    if (field === 'monthlyPurchase') return value;
    return value.toLocaleString();
  };

  const prysmOwners = data.affiliates * (data.participationRate / 100);
  const prysmDeviceRevenue = prysmOwners * 150;
  const totalScanned = prysmOwners * data.monthlyScans;
  const buyers = totalScanned * (data.conversionRate / 100);
  const monthlySales = buyers * data.monthlyPurchase;
  // The PV to CV calculation based on Jan 2025 - Jul 2025 global average
  const g15BreakawayBonus = Math.round(monthlySales * 0.05);
  const annualSales = monthlySales * 12;

  // Currency conversion calculations
  const usdAmount = g15BreakawayBonus * 0.93506;
  const convertedAmount = usdAmount * exchangeRates[selectedCurrency];
  const exchangeRate = exchangeRates[selectedCurrency];

  const currency = val => '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2 });
  const number = val => val.toLocaleString('en-US', { maximumFractionDigits: 0 });
  
  const formatCurrency = (val, currencyCode) => {
    const symbols = {
      'USD': '$', 'ARS': '$', 'AUD': 'A$', 'BRL': 'R$', 'BND': 'B$', 'CAD': 'C$',
      'CHF': 'CHF', 'CLP': '$', 'CNY': '¥', 'COP': '$', 'CRC': '₡', 'CZK': 'Kč',
      'DKK': 'kr', 'EUR': '€', 'FJD': 'FJ$', 'GBP': '£', 'GTQ': 'Q', 'HKD': 'HK$',
      'HNL': 'L', 'HUF': 'Ft', 'IDR': 'Rp', 'ILS': '₪', 'ISK': 'kr', 'JPY': '¥',
      'KRW': '₩', 'MXN': '$', 'MYR': 'RM', 'NOK': 'kr', 'NZD': 'NZ$', 'PEN': 'S/',
      'PHP': '₱', 'PLN': 'zł', 'RON': 'lei', 'RUB': '₽', 'SEK': 'kr', 'SGD': 'S$',
      'SVC': '$', 'THB': '฿', 'TRY': '₺', 'TWD': 'NT$', 'UAH': '₴', 'VES': 'Bs',
      'VND': '₫', 'ZAR': 'R'
    };
    const symbol = symbols[currencyCode] || currencyCode + ' ';
    return symbol + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Calculator className="h-7 w-7 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Basic Prysm Product Sales Calculator v2</h1>
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
                    placeholder="Ex. 100,000 affiliates or 3,000 sales leaders"
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
                    placeholder="Ex. 25%-50%"
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
                    placeholder="Ex. 10-20"
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
                    placeholder="Ex. 10%"
                  />
                </div>
                <div className="flex justify-center my-1"><ArrowDown className="h-5 w-5 text-purple-500" /></div>
              </div>

              <div>
                <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Projected Subscriber Sales Volume</label>
                  <div className="text-xs text-gray-600 mb-1 italic">
                    The amount you believe each new subscriber will purchase in a given month. On average, a new subscriber who purchases SCS products buys 139 volume points of product
                  </div>
                  <input
                    type="text"
                    value={format('monthlyPurchase', data.monthlyPurchase)}
                    onChange={(e) => handleChange('monthlyPurchase', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ex. 139"
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 my-2">
                <div className="text-xs text-amber-800">
                  <strong>Disclaimer:</strong> This calculator should only be used for planning and goal setting purposes. This is not a guarantee of income. Generating sales compensation as a Brand Affiliate requires considerable time, effort, and dedication. Success will also depend upon your skills, talents, and leadership abilities. There is no guarantee of financial success, and results will vary widely among participants. A complete summary of earnings at each level can be found <a href="https://www.nuskin.com/content/nuskin/en_PH/corporate/reputation/compensation.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">here</a>.
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
                    Device Sales Volume: {number(prysmOwners)} × 150 = {number(prysmDeviceRevenue)}
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

              <div className="mb-2">
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
                    <span className="text-sm font-medium text-gray-700">Projected Monthly Product Sales Volume</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1 invisible">
                    Spacing to match left column height
                  </div>
                  <div className="text-lg font-semibold text-green-600 mb-1">
                    {number(monthlySales)}
                  </div>
                  <div className="text-xs text-gray-500 bg-white p-2 rounded">
                    Formula: {number(buyers)} × {data.monthlyPurchase}
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 my-2">
                <div className="text-xs text-emerald-800">
                  <strong>Potential G1-6 Breakaway Bonus USD (5%):</strong> {formatCurrency(usdAmount, 'USD')}
                </div>
                
                <div className="mt-3 p-2 bg-white rounded border">
                  <div className="text-xs text-gray-700 mb-2">
                    <strong>Currency Conversion:</strong>
                    {ratesLoading && <span className="text-blue-600 ml-2">Updating rates...</span>}
                    {lastUpdated && !ratesLoading && <span className="text-gray-500 ml-2">Updated: {lastUpdated}</span>}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs text-gray-600">Currency:</label>
                    <select 
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-emerald-500 focus:border-transparent w-full max-w-xs"
                    >
                      <option value="ARS">Argentina - Argentine Peso (ARS)</option>
                      <option value="AUD">Australia - Australian Dollar (AUD)</option>
                      <option value="BRL">Brazil - Brazilian Real (BRL)</option>
                      <option value="BND">Brunei - Brunei Dollar (BND)</option>
                      <option value="CAD">Canada - Canadian Dollar (CAD)</option>
                      <option value="CLP">Chile - Chilean Peso (CLP)</option>
                      <option value="CNY">China - Chinese Yuan (CNY)</option>
                      <option value="COP">Colombia - Colombian Peso (COP)</option>
                      <option value="CRC">Costa Rica - Costa Rican Colón (CRC)</option>
                      <option value="CZK">Czech Republic - Czech Koruna (CZK)</option>
                      <option value="DKK">Denmark - Danish Krone (DKK)</option>
                      <option value="SVC">El Salvador - Salvadoran Colón (SVC)</option>
                      <option value="EUR">Finland - Euro (EUR)</option>
                      <option value="FJD">Fiji - Fijian Dollar (FJD)</option>
                      <option value="EUR">France - Euro (EUR)</option>
                      <option value="EUR">Germany - Euro (EUR)</option>
                      <option value="GTQ">Guatemala - Guatemalan Quetzal (GTQ)</option>
                      <option value="HKD">Hong Kong - Hong Kong Dollar (HKD)</option>
                      <option value="HNL">Honduras - Honduran Lempira (HNL)</option>
                      <option value="HUF">Hungary - Hungarian Forint (HUF)</option>
                      <option value="ISK">Iceland - Icelandic Króna (ISK)</option>
                      <option value="IDR">Indonesia - Indonesian Rupiah (IDR)</option>
                      <option value="EUR">Ireland - Euro (EUR)</option>
                      <option value="ILS">Israel - Israeli New Shekel (ILS)</option>
                      <option value="EUR">Italy - Euro (EUR)</option>
                      <option value="JPY">Japan - Japanese Yen (JPY)</option>
                      <option value="KRW">Korea - South Korean Won (KRW)</option>
                      <option value="EUR">Luxembourg - Euro (EUR)</option>
                      <option value="MYR">Malaysia - Malaysian Ringgit (MYR)</option>
                      <option value="MXN">Mexico - Mexican Peso (MXN)</option>
                      <option value="EUR">Netherlands - Euro (EUR)</option>
                      <option value="NZD">New Zealand - New Zealand Dollar (NZD)</option>
                      <option value="NOK">Norway - Norwegian Krone (NOK)</option>
                      <option value="PEN">Peru - Peruvian Sol (PEN)</option>
                      <option value="PHP">Philippines - Philippine Peso (PHP)</option>
                      <option value="PLN">Poland - Polish Złoty (PLN)</option>
                      <option value="EUR">Portugal - Euro (EUR)</option>
                      <option value="RON">Romania - Romanian Leu (RON)</option>
                      <option value="RUB">Russia - Russian Ruble (RUB)</option>
                      <option value="SGD">Singapore - Singapore Dollar (SGD)</option>
                      <option value="EUR">Slovakia - Euro (EUR)</option>
                      <option value="ZAR">South Africa - South African Rand (ZAR)</option>
                      <option value="EUR">Spain - Euro (EUR)</option>
                      <option value="SEK">Sweden - Swedish Krona (SEK)</option>
                      <option value="CHF">Switzerland - Swiss Franc (CHF)</option>
                      <option value="TWD">Taiwan - Taiwan Dollar (TWD)</option>
                      <option value="THB">Thailand - Thai Baht (THB)</option>
                      <option value="TRY">Turkey - Turkish Lira (TRY)</option>
                      <option value="UAH">Ukraine - Ukrainian Hryvnia (UAH)</option>
                      <option value="GBP">United Kingdom - British Pound (GBP)</option>
                      <option value="USD">United States - US Dollar (USD)</option>
                      <option value="VES">Venezuela - Venezuelan Bolívar (VES)</option>
                      <option value="VND">Vietnam - Vietnamese Dong (VND)</option>
                    </select>
                  </div>
                  <div className="text-sm font-semibold text-emerald-700 mb-1">
                    {formatCurrency(convertedAmount, selectedCurrency)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(usdAmount, 'USD')} × {exchangeRate.toFixed(4)}
                  </div>
                </div>
              </div>

              <div className="flex justify-center my-1"><ArrowDown className="h-5 w-5 text-green-500" /></div>

              <div>
                <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-700">Projected Annualized Product Sales Volume</span>
                  </div>
                  <div className="text-xl font-bold text-yellow-600 mb-1">
                    {number(annualSales)}
                  </div>
                  <div className="text-xs text-gray-500 bg-white p-2 rounded">
                    Formula: {number(monthlySales)} × 12
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
