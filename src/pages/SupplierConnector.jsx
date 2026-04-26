import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';
import { formatCurrency } from '../utils/formatCurrency';
import { ArrowLeft, MapPin, Tag, Phone, FileText } from 'lucide-react';

const CATEGORIES = ['Textile', 'Tea', 'Grocery', 'Mobile', 'Electronics', 'Hardware'];
const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Surat', 'Chennai', 'Pune', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Assam', 'Darjeeling'];

// Sample suppliers data - will be in Firebase
const SAMPLE_SUPPLIERS = [
  {
    id: 1,
    name: 'Surat Textile Hub',
    city: 'Surat',
    category: 'Textile',
    priceRange: '₹80-220/m',
    contact: 'textile-hub@surat.com',
    description: 'Wholesale textile materials and fabrics for all industries',
    verified: true,
    tags: ['Quality', 'Fast Delivery'],
  },
  {
    id: 2,
    name: 'Ring Road Market',
    city: 'Surat',
    category: 'Textile',
    priceRange: '₹60-150/m',
    contact: 'ringroad@surat.com',
    description: 'Premium textile varieties at competitive prices',
    verified: true,
    tags: ['Budget Friendly', 'Bulk Orders'],
  },
  {
    id: 3,
    name: 'Assam Tea Direct',
    city: 'Assam',
    category: 'Tea',
    priceRange: '₹180-320/kg',
    contact: 'tea-direct@assam.com',
    description: 'Direct from Assam tea gardens, premium quality leaf tea',
    verified: true,
    tags: ['Organic', 'Direct Source'],
  },
  {
    id: 4,
    name: 'Darjeeling Gardens Coop',
    city: 'Darjeeling',
    category: 'Tea',
    priceRange: '₹350-600/kg',
    contact: 'gardens@darjeeling.com',
    description: 'First-flush and premium Darjeeling tea directly',
    verified: true,
    tags: ['Premium', 'Cooperative'],
  },
  {
    id: 5,
    name: 'APMC Vashi',
    city: 'Mumbai',
    category: 'Grocery',
    priceRange: 'Market Rate',
    contact: 'apmc-vashi@mumbai.com',
    description: 'Agricultural Produce Market Committee - wholesale vegetables, fruits',
    verified: true,
    tags: ['Fresh Produce', 'Market Price'],
  },
  {
    id: 6,
    name: 'Crawford Market',
    city: 'Mumbai',
    category: 'Grocery',
    priceRange: 'Market Rate',
    contact: 'crawford@mumbai.com',
    description: 'Historic spice market with premium quality spices and dry goods',
    verified: true,
    tags: ['Spices', 'Heritage'],
  },
  {
    id: 7,
    name: 'Gaffar Market',
    city: 'Delhi',
    category: 'Mobile',
    priceRange: 'Wholesale',
    contact: 'gaffar@delhi.com',
    description: 'Mobile phone accessories and electronics wholesale hub',
    verified: false,
    tags: ['Accessories', 'Bulk Orders'],
  },
  {
    id: 8,
    name: 'Nehru Place',
    city: 'Delhi',
    category: 'Electronics',
    priceRange: 'Competitive',
    contact: 'nehru-place@delhi.com',
    description: 'Electronics wholesale market for IT and consumer electronics',
    verified: true,
    tags: ['Tech', 'Warranty'],
  },
  {
    id: 9,
    name: 'Pune Hardware Bazaar',
    city: 'Pune',
    category: 'Hardware',
    priceRange: '₹5-500',
    contact: 'hardware@pune.com',
    description: 'Complete hardware supplies for construction and industrial use',
    verified: true,
    tags: ['Quality', 'Installation Support'],
  },
  {
    id: 10,
    name: 'Bhiwandi Textile Zone',
    city: 'Mumbai',
    category: 'Textile',
    priceRange: '₹55-180/m',
    contact: 'bhiwandi@mumbai.com',
    description: 'Largest textile hub in Asia, loom fabrics and materials',
    verified: true,
    tags: ['Bulk Orders', 'Custom Fabrics'],
  },
];

export default function SupplierConnector({ user }) {
  const [suppliers, setSuppliers] = useState(SAMPLE_SUPPLIERS);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(false);
  const { getSuppliers } = useFirestore();

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        // In production, this would query Firestore
        // const results = await getSuppliers(selectedCategory, selectedCity);
        // For now, we filter sample data
        let filtered = SAMPLE_SUPPLIERS;

        if (selectedCategory) {
          filtered = filtered.filter((s) => s.category === selectedCategory);
        }
        if (selectedCity) {
          filtered = filtered.filter((s) => s.city === selectedCity);
        }

        setSuppliers(filtered);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [selectedCategory, selectedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-600 hover:text-primary transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          <h1 className="font-poppins text-2xl font-bold text-gray-900">Supplier Connector</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-6">Find Suppliers</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 font-inter">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-inter"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 font-inter">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-inter"
              >
                <option value="">All Cities</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(selectedCategory || selectedCity) && (
            <button
              onClick={() => {
                setSelectedCategory('');
                setSelectedCity('');
              }}
              className="mt-6 text-primary hover:underline font-inter font-medium text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600 font-inter">
            Found <span className="font-bold text-gray-900">{suppliers.length}</span> supplier{suppliers.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Suppliers Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : suppliers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-poppins font-bold text-gray-900 text-lg leading-tight">{supplier.name}</h3>
                  {supplier.verified && (
                    <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">✓ Verified</div>
                  )}
                </div>

                {/* Category Tag */}
                <div className="mb-4">
                  <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                    {supplier.category}
                  </span>
                </div>

                {/* City */}
                <div className="flex items-center text-gray-600 mb-3 font-inter">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  <span>{supplier.city}</span>
                </div>

                {/* Price Range */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-600 font-inter mb-1">Price Range</p>
                  <p className="font-poppins font-bold text-gray-900">{supplier.priceRange}</p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm font-inter mb-4 line-clamp-2">{supplier.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {supplier.tags.map((tag) => (
                    <span key={tag} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-inter">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Contact & Button */}
                <div className="border-t pt-4 flex items-center justify-between">
                  <a
                    href={`mailto:${supplier.contact}`}
                    className="flex items-center text-primary hover:underline text-sm font-inter font-medium"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </a>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition text-sm font-inter font-medium flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <p className="text-gray-600 font-inter mb-4">No suppliers found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('');
                setSelectedCity('');
              }}
              className="text-primary hover:underline font-inter font-medium"
            >
              Clear Filters and Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
