import { useNavigate } from 'react-router-dom'

const dealers = [
  {
    id: 1,
    name: "Bentley London",
    location: "London, United Kingdom",
    address: "Unit 3, Riverside Business Park, Lyon Road, London SW19 2RL",
    phone: "+44 20 8971 2222",
    email: "london@bentleymotors.com",
    manager: "James Harrington",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
    services: ["Sales", "Service", "Parts", "Customization"]
  },
  {
    id: 2,
    name: "Bentley Beverly Hills",
    location: "Beverly Hills, California, USA",
    address: "8421 Wilshire Blvd, Beverly Hills, CA 90211",
    phone: "+1 310 285 1000",
    email: "beverlyhills@bentleymotors.com",
    manager: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
    services: ["Sales", "Service", "Parts", "Luxury Transport"]
  },
  {
    id: 3,
    name: "Bentley Dubai",
    location: "Dubai, United Arab Emirates",
    address: "Al Quoz Industrial Area, Dubai, UAE",
    phone: "+971 4 331 0000",
    email: "dubai@bentleymotors.com",
    manager: "Ahmed Al-Rashid",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
    services: ["Sales", "Service", "Parts", "Desert Adventures"]
  },
  {
    id: 4,
    name: "Bentley Munich",
    location: "Munich, Germany",
    address: "Olymps Park, 2. OG, 80809 Munich",
    phone: "+49 89 358 999 0",
    email: "munich@bentleymotors.com",
    manager: "Franz Weber",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
    services: ["Sales", "Service", "Parts", "European Delivery"]
  },
  {
    id: 5,
    name: "Bentley Shanghai",
    location: "Shanghai, China",
    address: "No. 1 Century Avenue, Pudong New Area, Shanghai 200120",
    phone: "+86 21 6888 8888",
    email: "shanghai@bentleymotors.com",
    manager: "Li Wei",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    services: ["Sales", "Service", "Parts", "Asian Market"]
  },
  {
    id: 6,
    name: "Bentley Sydney",
    location: "Sydney, Australia",
    address: "1-5 Cowper Wharf Road, Woolloomooloo, NSW 2011",
    phone: "+61 2 8356 0000",
    email: "sydney@bentleymotors.com",
    manager: "Michael Thompson",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    services: ["Sales", "Service", "Parts", "Outback Experiences"]
  }
]

export default function Dealers() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Authorized Dealers</h1>
              <p className="text-gray-600">Find Your Nearest Bentley Experience</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Bentley Authorized Dealers</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Experience Bentley excellence at our worldwide network of authorized dealers.
              Each location offers personalized service, expert knowledge, and the full Bentley experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Worldwide Excellence</h3>
              <p className="text-gray-700 mb-4">
                Our authorized dealers are carefully selected to maintain the highest standards of
                service and expertise. Each dealer undergoes rigorous training and follows Bentley
                protocols to ensure every customer receives exceptional care.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">150+</div>
                  <div className="text-sm text-gray-600">Dealers Worldwide</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                alt="Bentley Dealership"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* Dealers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {dealers.map(dealer => (
            <div key={dealer.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={dealer.image}
                alt={dealer.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{dealer.name}</h3>
                <p className="text-indigo-600 font-semibold mb-3">{dealer.location}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <span className="text-gray-500 mr-2">📍</span>
                    <span className="text-sm text-gray-700">{dealer.address}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">📞</span>
                    <span className="text-sm text-gray-700">{dealer.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">✉️</span>
                    <span className="text-sm text-gray-700">{dealer.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">👤</span>
                    <span className="text-sm text-gray-700">Manager: {dealer.manager}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {dealer.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
                  Contact Dealer
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Dealer Services</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-indigo-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">🚗</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">New Vehicle Sales</h4>
              <p className="text-gray-700 text-sm">
                Discover your perfect Bentley with expert guidance and personalized recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">🔧</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Service & Maintenance</h4>
              <p className="text-gray-700 text-sm">
                Factory-trained technicians provide exceptional care for your Bentley.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">🛠️</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Genuine Parts</h4>
              <p className="text-gray-700 text-sm">
                Only authentic Bentley parts ensure your vehicle maintains its exceptional standards.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">🎨</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Customization</h4>
              <p className="text-gray-700 text-sm">
                Personalize your Bentley with bespoke options and Mulliner craftsmanship.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow p-8 text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Find Your Dealer</h3>
            <p className="text-xl mb-6 max-w-3xl mx-auto">
              Can't find a dealer near you? Contact our global headquarters to be connected
              with the nearest authorized Bentley dealer or to arrange a personal consultation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-bold mb-2">Global Headquarters</h4>
                <p className="text-sm">Crewe, England</p>
                <p className="text-sm">+44 1270 500 500</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-bold mb-2">North America</h4>
                <p className="text-sm">Wood Dale, IL, USA</p>
                <p className="text-sm">+1 630 350 8500</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-bold mb-2">Asia Pacific</h4>
                <p className="text-sm">Singapore</p>
                <p className="text-sm">+65 6887 9888</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Explore Our Models
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}