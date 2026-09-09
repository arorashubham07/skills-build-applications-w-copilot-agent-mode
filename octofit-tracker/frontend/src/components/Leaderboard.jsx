import { useApiCollection } from '../api.js'

function Leaderboard() {
  const { data: entries, error, loading } = useApiCollection('leaderboard')

  return (
    <section>
      <h1 className="h2">Leaderboard</h1>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      {!loading && !error && (
        <ol className="list-group list-group-numbered">
          {entries.map((entry) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={entry._id}>
              {entry.userId?.displayName ?? 'Unknown user'}
              <span className="badge text-bg-primary rounded-pill">{entry.points} points</span>
            </li>
          ))}
          {entries.length === 0 && <li className="list-group-item text-body-secondary">No scores yet.</li>}
        </ol>
      )}
    </section>
  )
}

export default Leaderboard
