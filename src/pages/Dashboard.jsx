import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useFirestore } from '../hooks/useFirestore';
import { formatCurrency } from '../utils/formatCurrency';
import { ArrowLeft, LogOut, Trash2 } from 'lucide-react';

export default function Dashboard({ user }) {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getAnalyses } = useFirestore();

  useEffect(() => {
    const fetchAnalyses = async () => {
      if (!user) return;
      try {
        const data = await getAnalyses(user.uid);
        setAnalyses(data);
      } catch (error) {
        console.error('Error fetching analyses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, [user, getAnalyses]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getScoreBadgeColor = (score) => {
    if (score === 'High') return 'bg-green-100 text-green-700';
    if (score === 'Medium') return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-600 hover:text-primary transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Home
          </Link>
          <h1 className="font-poppins text-2xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 transition rounded-lg font-inter font-medium"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-inter mb-2">Logged in as</p>
              <h2 className="font-poppins text-3xl font-bold text-gray-900">{user?.email}</h2>
            </div>
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-poppins text-xl font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/checker"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border-l-4 border-blue-500"
          >
            <h3 className="font-poppins font-bold text-gray-900 mb-2">Reality Checker</h3>
            <p className="text-gray-600 text-sm font-inter">Validate your business idea</p>
          </Link>

          <Link
            to="/analyzer"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border-l-4 border-purple-500"
          >
            <h3 className="font-poppins font-bold text-gray-900 mb-2">Cost Analyzer</h3>
            <p className="text-gray-600 text-sm font-inter">Analyze your expenses</p>
          </Link>

          <Link
            to="/suppliers"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border-l-4 border-green-500"
          >
            <h3 className="font-poppins font-bold text-gray-900 mb-2">Find Suppliers</h3>
            <p className="text-gray-600 text-sm font-inter">Connect with vendors</p>
          </Link>
        </div>

        {/* Analysis History */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-6">Analysis History</h3>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : analyses.length > 0 ? (
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-poppins font-bold text-gray-900">{analysis.type}</p>
                        <p className="text-gray-600 text-sm font-inter">
                          {analysis.createdAt?.toDate?.()?.toLocaleDateString() ||
                            new Date(analysis.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {analysis.result?.score && (
                        <div>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold font-inter ${getScoreBadgeColor(analysis.result.score)}`}>
                            {analysis.result.score}
                          </span>
                        </div>
                      )}

                      {analysis.result?.netProfit !== undefined && (
                        <div className="text-right">
                          <p className="font-poppins font-bold text-gray-900">
                            {formatCurrency(analysis.result.netProfit)}
                          </p>
                          <p className="text-gray-600 text-xs font-inter">Net Profit</p>
                        </div>
                      )}

                      {analysis.result?.margin !== undefined && (
                        <div className="text-right">
                          <p className="font-poppins font-bold text-gray-900">{analysis.result.margin.toFixed(1)}%</p>
                          <p className="text-gray-600 text-xs font-inter">Margin</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="ml-4 text-gray-400 hover:text-red-600 transition">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 font-inter mb-6">No analyses yet. Start exploring our tools!</p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/checker"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-inter font-medium"
                >
                  Try Reality Checker
                </Link>
                <Link
                  to="/analyzer"
                  className="px-6 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition font-inter font-medium"
                >
                  Try Cost Analyzer
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
            <p className="text-blue-100 text-sm font-inter mb-2">Total Analyses</p>
            <p className="font-poppins text-4xl font-bold">{analyses.length}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
            <p className="text-purple-100 text-sm font-inter mb-2">High Score Analyses</p>
            <p className="font-poppins text-4xl font-bold">
              {analyses.filter((a) => a.result?.score === 'High').length}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
            <p className="text-green-100 text-sm font-inter mb-2">Total Profit Calculated</p>
            <p className="font-poppins text-2xl font-bold">
              {formatCurrency(
                analyses.reduce((sum, a) => sum + (a.result?.netProfit || 0), 0)
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
