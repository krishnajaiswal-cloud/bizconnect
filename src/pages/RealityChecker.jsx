import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';
import { calculateFeasibilityScore } from '../utils/feasibilityScore';
import { formatCurrency } from '../utils/formatCurrency';
import { ArrowLeft, Check, TrendingUp } from 'lucide-react';

const BUSINESS_TYPES = ['Retail', 'Manufacturing', 'Services', 'Food & Beverage', 'Technology', 'Agriculture'];
const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Surat', 'Chennai', 'Pune', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Jaipur'];

export default function RealityChecker({ user }) {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { saveAnalysis } = useFirestore();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const analysis = calculateFeasibilityScore({
        investment: data.investment,
        revenue: data.revenue,
        customers: data.customers,
      });

      setResult({
        ...data,
        analysis,
      });

      // Save to Firestore
      await saveAnalysis(user.uid, {
        type: 'Reality Checker',
        inputs: data,
        result: analysis,
        feasibility: analysis.feasibility,
      });

      setStep(2);
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-600 hover:text-primary transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          <h1 className="font-poppins text-2xl font-bold text-gray-900">Reality Checker</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === 1 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-2">Validate Your Business Idea</h2>
            <p className="text-gray-600 mb-8 font-inter">Let's analyze the feasibility of your business concept</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Business Type */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 font-inter">Business Type</label>
                <select
                  {...register('businessType', { required: 'Business type is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-inter"
                >
                  <option value="">Select a business type</option>
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.businessType && <p className="text-red-500 text-sm mt-1 font-inter">{errors.businessType.message}</p>}
              </div>

              {/* City */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 font-inter">City</label>
                <select
                  {...register('city', { required: 'City is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-inter"
                >
                  <option value="">Select a city</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="text-red-500 text-sm mt-1 font-inter">{errors.city.message}</p>}
              </div>

              {/* Monthly Investment */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 font-inter">Monthly Investment (₹)</label>
                <input
                  type="number"
                  {...register('investment', {
                    required: 'Monthly investment is required',
                    min: { value: 0, message: 'Must be a positive number' },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-inter"
                  placeholder="10000"
                />
                {errors.investment && <p className="text-red-500 text-sm mt-1 font-inter">{errors.investment.message}</p>}
              </div>

              {/* Expected Revenue */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 font-inter">Expected Monthly Revenue (₹)</label>
                <input
                  type="number"
                  {...register('revenue', {
                    required: 'Expected revenue is required',
                    min: { value: 0, message: 'Must be a positive number' },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-inter"
                  placeholder="50000"
                />
                {errors.revenue && <p className="text-red-500 text-sm mt-1 font-inter">{errors.revenue.message}</p>}
              </div>

              {/* Customers */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 font-inter">Expected Customers/Month</label>
                <input
                  type="number"
                  {...register('customers', {
                    required: 'Customer count is required',
                    min: { value: 0, message: 'Must be a positive number' },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-inter"
                  placeholder="100"
                />
                {errors.customers && <p className="text-red-500 text-sm mt-1 font-inter">{errors.customers.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 font-inter font-medium flex items-center justify-center"
              >
                {loading ? 'Analyzing...' : 'Analyze Business'}
                {!loading && <TrendingUp className="ml-2 w-5 h-5" />}
              </button>
            </form>
          </div>
        ) : (
          // Results View
          <div className="space-y-8">
            {/* Score Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-poppins text-3xl font-bold text-gray-900">Analysis Results</h2>
                <button
                  onClick={() => {
                    setStep(1);
                    setResult(null);
                  }}
                  className="text-primary hover:underline font-inter font-medium"
                >
                  Run Another Analysis
                </button>
              </div>

              {/* Business Type & City */}
              <div className="grid md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-600 text-sm font-inter">Business Type</p>
                  <p className="font-poppins font-bold text-gray-900">{result.businessType}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-inter">City</p>
                  <p className="font-poppins font-bold text-gray-900">{result.city}</p>
                </div>
              </div>

              {/* Score Badge */}
              <div className="flex items-center space-x-4 mb-8">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center flex-col ${
                    result.analysis.score === 'High'
                      ? 'bg-green-100'
                      : result.analysis.score === 'Medium'
                      ? 'bg-amber-100'
                      : 'bg-red-100'
                  }`}
                >
                  <span
                    className={`font-poppins text-3xl font-bold ${
                      result.analysis.score === 'High'
                        ? 'text-green-600'
                        : result.analysis.score === 'Medium'
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }`}
                  >
                    {result.analysis.score === 'High' ? '✓' : result.analysis.score === 'Medium' ? '~' : '✗'}
                  </span>
                  <span
                    className={`font-inter text-xs font-bold mt-1 ${
                      result.analysis.score === 'High'
                        ? 'text-green-600'
                        : result.analysis.score === 'Medium'
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }`}
                  >
                    {result.analysis.score}
                  </span>
                </div>
                <div>
                  <p className="font-poppins text-2xl font-bold text-gray-900">Feasibility Score: {result.analysis.score}</p>
                  <p className="text-gray-600 font-inter mt-2">{result.analysis.tip}</p>
                </div>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-primary">
                <p className="text-gray-600 text-sm font-inter mb-2">Profit Margin</p>
                <p className="font-poppins text-3xl font-bold text-gray-900">
                  {result.analysis.margin.toFixed(2)}%
                </p>
                <p className="text-gray-500 text-xs mt-2 font-inter">Target: ≥30% for High score</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm font-inter mb-2">Monthly Profit</p>
                <p className="font-poppins text-3xl font-bold text-gray-900">
                  {formatCurrency(result.analysis.profit)}
                </p>
                <p className="text-gray-500 text-xs mt-2 font-inter">Revenue - Investment</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                <p className="text-gray-600 text-sm font-inter mb-2">Breakeven Days</p>
                <p className="font-poppins text-3xl font-bold text-gray-900">
                  {result.analysis.breakeven.toFixed(0)} days
                </p>
                <p className="text-gray-500 text-xs mt-2 font-inter">Time to recover investment</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                <p className="text-gray-600 text-sm font-inter mb-2">Initial Investment</p>
                <p className="font-poppins text-3xl font-bold text-gray-900">
                  {formatCurrency(result.investment)}
                </p>
                <p className="text-gray-500 text-xs mt-2 font-inter">Monthly capital required</p>
              </div>
            </div>

            {/* Feasibility Checklist */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-6">Feasibility Checklist</h3>
              <div className="space-y-4">
                {Object.entries(result.analysis.feasibility).map(([key, value]) => (
                  <div key={key} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 ${
                        value ? 'bg-green-200' : 'bg-red-200'
                      }`}
                    >
                      {value ? <Check className="w-4 h-4 text-green-600" /> : <span className="text-red-600">✕</span>}
                    </div>
                    <span className="font-inter text-gray-700 font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="font-poppins text-xl font-bold text-gray-900 mb-4">Next Steps</h3>
              <ul className="space-y-2 font-inter text-gray-700">
                <li>✓ Use the Cost Analyzer to break down your expenses</li>
                <li>✓ Find suppliers on the Supplier Connector</li>
                <li>✓ Save this analysis to your dashboard</li>
                <li>✓ Share results with stakeholders</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
