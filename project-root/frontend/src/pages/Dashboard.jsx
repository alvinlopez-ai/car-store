import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService, authService } from '../services/api'

const bentleyModels = [
  {
    id: 1,
    name: 'Continental GT',
    price: '$230,000',
    image: 'https://images.unsplash.com/photo-1625231724375-0ff591f87246?w=400&h=300&fit=crop',
    engine: '4.0L Twin-Turbo V8',
    horsepower: '542 HP',
    torque: '568 lb-ft',
    topSpeed: '207 mph',
    acceleration: '0-60 in 3.7s',
    transmission: '8-Speed Dual-Clutch',
    type: 'Coupe'
  },
  {
    id: 2,
    name: 'Bentayga',
    price: '$200,000',
    image: 'https://images.unsplash.com/photo-1606664515524-2ddc6298996f?w=400&h=300&fit=crop',
    engine: '4.0L Twin-Turbo V8',
    horsepower: '542 HP',
    torque: '568 lb-ft',
    topSpeed: '190 mph',
    acceleration: '0-60 in 4.5s',
    transmission: '8-Speed Automatic',
    type: 'SUV'
  },
  {
    id: 3,
    name: 'Flying Spur',
    price: '$220,000',
    image: 'https://images.unsplash.com/photo-1570129477492-45f003313e78?w=400&h=300&fit=crop',
    engine: '4.0L Twin-Turbo V8',
    horsepower: '542 HP',
    torque: '568 lb-ft',
    topSpeed: '200 mph',
    acceleration: '0-60 in 4.0s',
    transmission: '8-Speed Automatic',
    type: 'Sedan'
  },
  {
    id: 4,
    name: 'Bentley Mulsanne',
    price: '$300,000',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop',
    engine: '6.75L Twin-Turbo V8',
    horsepower: '537 HP',
    torque: '645 lb-ft',
    topSpeed: '186 mph',
    acceleration: '0-60 in 4.8s',
    transmission: '8-Speed Automatic',
    type: 'Luxury Sedan'
  },
  {
    id: 5,
    name: 'Continental GTC',
    price: '$240,000',
    image: 'https://images.unsplash.com/photo-1609090773995-b75f415cff3a?w=400&h=300&fit=crop',
    engine: '4.0L Twin-Turbo V8',
    horsepower: '542 HP',
    torque: '568 lb-ft',
    topSpeed: '208 mph',
    acceleration: '0-60 in 3.8s',
    transmission: '8-Speed Dual-Clutch',
    type: 'Convertible'
  },
  {
    id: 6,
    name: 'Bentayga EWB',
    price: '$250,000',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19f27081?w=400&h=300&fit=crop',
    engine: '4.0L Twin-Turbo V8',
    horsepower: '542 HP',
    torque: '568 lb-ft',
    topSpeed: '190 mph',
    acceleration: '0-60 in 4.6s',
    transmission: '8-Speed Automatic',
    type: 'Extended SUV'
  }
]

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState(null)
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' })
  const [selectedCars, setSelectedCars] = useState([])
  const [showComparison, setShowComparison] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const profileResponse = await userService.getProfile()
      setProfile(profileResponse.data)

      const usersResponse = await userService.getAllUsers()
      setUsers(usersResponse.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    authService.logout()
    onLogout()
    navigate('/login')
  }

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id)
        setUsers(users.filter(user => user._id !== id))
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user')
      }
    }
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError('All fields are required')
      return
    }

    try {
      await userService.createUser(newUser)
      setShowAddUser(false)
      setNewUser({ name: '', email: '', password: '' })
      fetchData()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user')
    }
  }

  const handleToggleCar = (carId) => {
    if (selectedCars.includes(carId)) {
      setSelectedCars(selectedCars.filter(id => id !== carId))
    } else {
      setSelectedCars([...selectedCars, carId])
    }
  }

  const getSelectedModels = () => {
    return bentleyModels.filter(model => selectedCars.includes(model.id))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              {profile && <p className="text-gray-600">Welcome, {profile.name}!</p>}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/about')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                About Bentley
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Profile Card */}
        {profile && (
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Name</p>
                <p className="text-xl font-semibold text-gray-900">{profile.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="text-xl font-semibold text-gray-900">{profile.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Users Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Users</h2>
            <button
              onClick={() => setShowAddUser(!showAddUser)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              {showAddUser ? 'Cancel' : 'Add User'}
            </button>
          </div>

          {showAddUser && (
            <form onSubmit={handleAddUser} className="bg-gray-50 p-4 rounded mb-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                Save User
              </button>
            </form>
          )}

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-900 font-bold">Name</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-bold">Email</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-3 text-center text-gray-600">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3">{user.name}</td>
                      <td className="px-6 py-3">{user.email}</td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bentley Cars Section */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Bentley Car Models</h2>
            <button
              onClick={() => setShowComparison(!showComparison)}
              disabled={selectedCars.length === 0}
              className={`font-bold py-2 px-4 rounded-lg transition duration-200 ${
                selectedCars.length === 0
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              Compare ({selectedCars.length})
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bentleyModels.map(model => (
              <div
                key={model.id}
                className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${
                  selectedCars.includes(model.id) ? 'bg-indigo-50 border-2 border-indigo-600' : 'bg-gray-50'
                }`}
              >
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      checked={selectedCars.includes(model.id)}
                      onChange={() => handleToggleCar(model.id)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 mb-0 ml-2">{model.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{model.type}</p>
                  <p className="text-xl font-bold text-indigo-600">{model.price}</p>
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <p className="text-sm text-gray-700"><span className="font-semibold">Engine:</span> {model.engine}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Power:</span> {model.horsepower}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Modal */}
        {showComparison && selectedCars.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Car Comparison</h2>
              <button
                onClick={() => setShowComparison(false)}
                className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Feature</th>
                    {getSelectedModels().map(model => (
                      <th key={model.id} className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                        {model.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Price</td>
                    {getSelectedModels().map(model => (
                      <td key={model.id} className="border border-gray-300 px-4 py-3 text-gray-700">
                        {model.price}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Type</td>
                    {getSelectedModels().map(model => (
                      <td key={model.id} className="border border-gray-300 px-4 py-3 text-gray-700">
                        {model.type}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Engine</td>
                    {getSelectedModels().map(model => (
                      <td key={model.id} className="border border-gray-300 px-4 py-3 text-gray-700">
                        {model.engine}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Horsepower</td>
                    {getSelectedModels().map(model => (
                      <td key={model.id} className="border border-gray-300 px-4 py-3 text-gray-700">
                        {model.horsepower}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Torque</td>
                    {getSelectedModels().map(model => (
                      <td key={model.id} className="border border-gray-300 px-4 py-3 text-gray-700">
                        {model.torque}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Top Speed</td>
                    {getSelectedModels().map(model => (
                      <td key={model.id} className="border border-gray-300 px-4 py-3 text-gray-700">
                        {model.topSpeed}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">0-60 Acceleration</td>
                    {getSelectedModels().map(model => (
                      <td key={model.id} className="border border-gray-300 px-4 py-3 text-gray-700">
                        {model.acceleration}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Transmission</td>
                    {getSelectedModels().map(model => (
                      <td key={model.id} className="border border-gray-300 px-4 py-3 text-gray-700">
                        {model.transmission}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
