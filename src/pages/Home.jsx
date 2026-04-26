import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, BarChart3, Users } from 'lucide-react';

export default function Home({ user }) {
  const modules = [
    {
      id: 1,
      title: 'Reality Checker',
      description: 'Validate your business idea with market data and feasibility analysis',
      icon: TrendingUp,
      link: '/checker',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 2,
      title: 'Cost Analyzer',
      description: 'Break down your costs and identify improvement opportunities',
      icon: BarChart3,
      link: '/analyzer',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 3,
      title: 'Supplier Connector',
      description: 'Discover verified wholesale suppliers and local markets',
      icon: Users,
      link: '/suppliers',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold font-poppins">B</span>
            </div>
            <h1 className="font-poppins text-xl font-bold text-gray-900">BizConnect India</h1>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-600 text-sm">{user.email}</span>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-inter"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-inter"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              SDG 8: Decent Work & Economic Growth
            </span>
            <h2 className="font-poppins text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Empower Your Business with Data-Driven Insights
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              BizConnect India helps small business owners and entrepreneurs validate ideas, optimize costs, 
              and connect with trusted suppliers. Make informed decisions backed by real market data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <>
                  <Link
                    to="/checker"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-inter font-medium"
                  >
                    Start Analyzing <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link
                    to="/suppliers"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/5 transition font-inter font-medium"
                  >
                    Find Suppliers
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-inter font-medium"
                  >
                    Get Started <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <a
                    href="#features"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/5 transition font-inter font-medium"
                  >
                    Learn More
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-12 flex items-center justify-center h-96">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-gray-600 font-inter">Making business dreams real with data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-poppins text-4xl font-bold text-gray-900 mb-4">Three Powerful Tools</h3>
            <p className="text-xl text-gray-600">Everything you need to succeed in business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.id}
                  to={user ? module.link : '/auth'}
                  className="group bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-primary hover:shadow-lg transition duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-poppins text-2xl font-bold text-gray-900 mb-3">{module.title}</h4>
                  <p className="text-gray-600 mb-6 font-inter">{module.description}</p>
                  <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl font-poppins font-bold mb-2">500+</div>
              <p className="text-primary/90 font-inter">Suppliers Connected</p>
            </div>
            <div>
              <div className="text-4xl font-poppins font-bold mb-2">10K+</div>
              <p className="text-primary/90 font-inter">Entrepreneurs Helped</p>
            </div>
            <div>
              <div className="text-4xl font-poppins font-bold mb-2">25+</div>
              <p className="text-primary/90 font-inter">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-center text-white">
          <h3 className="font-poppins text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
          <p className="text-gray-300 mb-8 font-inter max-w-2xl mx-auto">
            Join thousands of entrepreneurs who are making data-driven decisions with BizConnect India.
          </p>
          {!user && (
            <Link
              to="/auth"
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-inter font-medium"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 BizConnect India. Supporting SDG 8 - Decent Work & Economic Growth.</p>
        </div>
      </footer>
    </div>
  );
}
