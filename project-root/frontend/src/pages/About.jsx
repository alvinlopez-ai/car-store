import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">About Bentley</h1>
              <p className="text-gray-600">The Legacy of British Luxury</p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The History of Bentley</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings in a London mews to becoming the epitome of British luxury automobiles,
              Bentley has been crafting exceptional vehicles for over a century.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop"
                alt="Classic Bentley"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Founded in 1919</h3>
              <p className="text-gray-700 mb-4">
                Bentley Motors was founded by W.O. Bentley in 1919. Walter Owen Bentley, an English engineer
                and automobile designer, established the company with the vision of creating "the fastest car
                on the road."
              </p>
              <p className="text-gray-700">
                The company's first model, the Bentley 3 Litre, was introduced in 1921 and quickly gained
                a reputation for speed, reliability, and luxury.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Bentley's Timeline</h3>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">1919</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Company Founded</h4>
                <p className="text-gray-700">
                  W.O. Bentley establishes Bentley Motors Limited in London, with the mission to build
                  the world's fastest and most luxurious cars.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">1921</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">First Model: Bentley 3 Litre</h4>
                <p className="text-gray-700">
                  The iconic Bentley 3 Litre is introduced, featuring a 3-liter four-cylinder engine.
                  It becomes known for its speed and reliability.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">1924</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Le Mans Victories</h4>
                <p className="text-gray-700">
                  Bentley achieves racing success with multiple victories at the 24 Hours of Le Mans,
                  establishing the brand's performance heritage.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">1931</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Rolls-Royce Acquisition</h4>
                <p className="text-gray-700">
                  Due to financial difficulties during the Great Depression, Bentley is acquired by
                  Rolls-Royce, beginning a long partnership.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">1952</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">R-Type Continental</h4>
                <p className="text-gray-700">
                  The legendary R-Type Continental is introduced, featuring coachwork by H.J. Mulliner
                  and becoming one of the most desirable Bentleys ever made.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">1998</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Volkswagen Group Era</h4>
                <p className="text-gray-700">
                  Volkswagen AG acquires Rolls-Royce and Bentley, investing heavily in the brand's
                  revival and modernization.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">2003</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Bentley Continental GT</h4>
                <p className="text-gray-700">
                  The modern era begins with the introduction of the Continental GT, featuring
                  a W12 engine and bringing Bentley into the 21st century.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">2016</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Bentayga SUV</h4>
                <p className="text-gray-700">
                  Bentley enters the luxury SUV market with the Bentayga, combining off-road capability
                  with unparalleled luxury and performance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legacy Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">A Legacy of Excellence</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              For over 100 years, Bentley has represented the pinnacle of British automotive engineering.
              From racing victories to royal patronage, Bentley continues to craft vehicles that combine
              breathtaking performance with uncompromising luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-600 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">🏆</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Racing Heritage</h4>
              <p className="text-gray-700">
                Multiple Le Mans victories and a legacy of motorsport excellence that continues to this day.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-600 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">👑</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Royal Warrant</h4>
              <p className="text-gray-700">
                Official supplier to the British Royal Family, a testament to Bentley's craftsmanship.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-600 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">⚙️</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Engineering Excellence</h4>
              <p className="text-gray-700">
                Handcrafted in Crewe, England, each Bentley represents over 100 years of automotive mastery.
              </p>
            </div>
          </div>
        </div>

        {/* Modern Era */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow p-8 text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">The Future of Bentley</h3>
            <p className="text-xl mb-6 max-w-3xl mx-auto">
              Today, Bentley continues to innovate while honoring its rich heritage. From the powerful
              Continental GT to the versatile Bentayga, each vehicle embodies the spirit of "the world's
              most desirable car company."
            </p>
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