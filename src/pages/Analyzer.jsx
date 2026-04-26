import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFirestore } from '../hooks/useFirestore';
import { formatCurrency } from '../utils/formatCurrency';
import { ArrowLeft, TrendingUp } from 'lucide-react';

export default function Analyzer({ user }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      revenue: '',
      rent: '',
      materials: '',
      labour: '',
      misc: '',
      emi: '',
    },
  });
  const { saveAnalysis } = useFirestore();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const revenue = parseFloat(data.revenue) || 0;
      const rent = parseFloat(data.rent) || 0;
      const materials = parseFloat(data.materials) || 0;
      const labour = parseFloat(data.labour) || 0;
      const misc = parseFloat(data.misc) || 0;
      const emi = parseFloat(data.emi) || 0;

      const totalCosts = rent + materials + labour + misc + emi;
      const netProfit = revenue - totalCosts;
      const marginPercent = revenue > 0 ? (netProfit / revenue) * 100 : 0;
      const annualProfit = netProfit * 12;

      // Determine highest cost ratio
      const costs = {
        Rent: rent,
        Materials: materials,
        Labour: labour,
        Miscellaneous: misc,
        EMI: emi,
      };
      const highestCost = Object.keys(costs).reduce((a, b) => (costs[a] > costs[b] ? a : b));
      const highestPercent = ((costs[highestCost] / revenue) * 100).toFixed(1);

      const tip = `Your highest cost is ${highestCost} at ${highestPercent}% of revenue. Consider optimizing this area for better margins.`;

      const analysis = {
        netProfit,
        marginPercent,
        annualProfit,
        totalCosts,
        tip,
      };

      setResult({
        ...data,
        analysis,
        chartData: [
          { name: 'Rent', value: rent },
          { name: 'Materials', value: materials },
          { name: 'Labour', value: labour },
          { name: 'Miscellaneous', value: misc },
          { name: 'EMI', value: emi },
        ],
      });

      // Save to Firestore
      await saveAnalysis(user.uid, {
        type: 'Cost Analyzer',
        inputs: data,
        result: analysis,
        feasibility: {
          profitMargin: marginPercent > 20,
          netProfit: netProfit > 0,
          controlledCosts: totalCosts < revenue * 0.7,
          annualGrowth: annualProfit > 0,
        },
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-600 hover:text-primary transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          <h1 className="font-poppins text-2xl font-bold text-gray-900">Cost Analyzer</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!result ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-2">Break Down Your Costs</h2>
            <p className="text-gray-600 mb-8 font-inter">Enter your monthly expenses to analyze profitability</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Revenue */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2 font-inter">Monthly Revenue (₹)</label>
                  <input
                    type="number"
                    {...register('revenue', {
                      required: 'Revenue is required',
                      min: { value: 0, message: 'Must be positive' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-inter"
                    placeholder="100000"
                  />
                  {errors.revenue && <p className="text-red-500 text-sm mt-1 font-inter">{errors.revenue.message}</p>}
                </div>

                {/* Rent */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2 font-inter">Monthly Rent/Lease (₹)</label>
                  <input
                    type="number"
                    {...register('rent', {
                      required: true,
                      min: { value: 0, message: 'Must be positive' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-inter"
                    placeholder="5000"
                  />
                </div>

                {/* Materials */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2 font-inter">Materials Cost (₹)</label>
                  <input
                    type="number"
                    {...register('materials', {
                      required: true,
                      min: { value: 0, message: 'Must be positive' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-inter"
                    placeholder="30000"
                  />
                </div>

                {/* Labour */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2 font-inter">Labour Cost (₹)</label>
                  <input
                    type="number"
                    {...register('labour', {
                      required: true,
                      min: { value: 0, message: 'Must be positive' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-inter"
                    placeholder="15000"
                  />
                </div>

                {/* Miscellaneous */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2 font-inter">Misc Expenses (₹)</label>
                  <input
                    type="number"
                    {...register('misc', {
                      required: true,
                      min: { value: 0, message: 'Must be positive' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-inter"
                    placeholder="5000"
                  />
                </div>

                {/* EMI */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2 font-inter">Monthly EMI (₹)</label>
                  <input
                    type="number"
                    {...register('emi', {
                      required: true,
                      min: { value: 0, message: 'Must be positive' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-inter"
                    placeholder="10000"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 font-inter font-medium flex items-center justify-center"
              >
                {loading ? 'Analyzing...' : 'Analyze Costs'}
                {!loading && <TrendingUp className="ml-2 w-5 h-5" />}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header with button */}
            <div className="flex items-center justify-between">
              <h2 className="font-poppins text-3xl font-bold text-gray-900">Analysis Results</h2>
              <button
                onClick={() => {
                  setResult(null);
                  reset();
                }}
                className="text-primary hover:underline font-inter font-medium"
              >
                Analyze Again
              </button>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                <p className="text-gray-600 text-sm font-inter mb-2">Net Profit</p>
                <p className="font-poppins text-3xl font-bold text-gray-900">
                  {formatCurrency(result.analysis.netProfit)}
                </p>
                <p className="text-gray-500 text-xs mt-2 font-inter">Monthly profit after all costs</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm font-inter mb-2">Profit Margin</p>
                <p className="font-poppins text-3xl font-bold text-gray-900">
                  {result.analysis.marginPercent.toFixed(2)}%
                </p>
                <p className="text-gray-500 text-xs mt-2 font-inter">Profit as % of revenue</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                <p className="text-gray-600 text-sm font-inter mb-2">Annual Profit</p>
                <p className="font-poppins text-3xl font-bold text-gray-900">
                  {formatCurrency(result.analysis.annualProfit)}
                </p>
                <p className="text-gray-500 text-xs mt-2 font-inter">Yearly earnings projection</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                <p className="text-gray-600 text-sm font-inter mb-2">Total Monthly Costs</p>
                <p className="font-poppins text-3xl font-bold text-gray-900">
                  {formatCurrency(result.analysis.totalCosts)}
                </p>
                <p className="text-gray-500 text-xs mt-2 font-inter">All expenses combined</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-6">Cost Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={result.chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="value" fill="#1D9E75" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Improvement Tip */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl p-6">
              <h4 className="font-poppins font-bold text-gray-900 mb-2">💡 Improvement Tip</h4>
              <p className="text-gray-700 font-inter">{result.analysis.tip}</p>
            </div>

            {/* Cost Breakdown Table */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-6">Detailed Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full font-inter">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">Expense Category</th>
                      <th className="text-right py-3 px-4 text-gray-600 font-medium">Amount</th>
                      <th className="text-right py-3 px-4 text-gray-600 font-medium">% of Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">Rent/Lease</td>
                      <td className="text-right py-3 px-4 text-gray-900 font-semibold">{formatCurrency(result.rent)}</td>
                      <td className="text-right py-3 px-4 text-gray-600">
                        {((result.rent / result.revenue) * 100).toFixed(1)}%
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">Materials</td>
                      <td className="text-right py-3 px-4 text-gray-900 font-semibold">{formatCurrency(result.materials)}</td>
                      <td className="text-right py-3 px-4 text-gray-600">
                        {((result.materials / result.revenue) * 100).toFixed(1)}%
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">Labour</td>
                      <td className="text-right py-3 px-4 text-gray-900 font-semibold">{formatCurrency(result.labour)}</td>
                      <td className="text-right py-3 px-4 text-gray-600">
                        {((result.labour / result.revenue) * 100).toFixed(1)}%
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">Miscellaneous</td>
                      <td className="text-right py-3 px-4 text-gray-900 font-semibold">{formatCurrency(result.misc)}</td>
                      <td className="text-right py-3 px-4 text-gray-600">
                        {((result.misc / result.revenue) * 100).toFixed(1)}%
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">EMI</td>
                      <td className="text-right py-3 px-4 text-gray-900 font-semibold">{formatCurrency(result.emi)}</td>
                      <td className="text-right py-3 px-4 text-gray-600">
                        {((result.emi / result.revenue) * 100).toFixed(1)}%
                      </td>
                    </tr>
                    <tr className="bg-gray-50 font-semibold">
                      <td className="py-3 px-4 text-gray-900">Total Costs</td>
                      <td className="text-right py-3 px-4 text-gray-900">{formatCurrency(result.analysis.totalCosts)}</td>
                      <td className="text-right py-3 px-4 text-gray-900">
                        {((result.analysis.totalCosts / result.revenue) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
