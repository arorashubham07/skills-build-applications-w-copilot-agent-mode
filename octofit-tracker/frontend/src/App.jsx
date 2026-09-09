import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  ['users', 'Users'],
  ['activities', 'Activities'],
  ['teams', 'Teams'],
  ['leaderboard', 'Leaderboard'],
  ['workouts', 'Workouts'],
]

function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <header className="border-bottom bg-white">
        <nav className="container navbar navbar-expand-lg">
          <NavLink className="navbar-brand fw-bold" to="/users">
            Octofit Tracker
          </NavLink>
          <div className="navbar-nav flex-row flex-wrap gap-2">
            {navigation.map(([path, label]) => (
              <NavLink
                className={({ isActive }) => `nav-link px-2 ${isActive ? 'active fw-semibold' : ''}`}
                key={path}
                to={`/${path}`}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="container py-4">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/users" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
