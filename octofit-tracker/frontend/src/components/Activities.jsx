import { useApiCollection } from '../api.js'

function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities`
    : 'http://localhost:8000/api/activities'
  const { data: activities, error, loading } = useApiCollection(apiUrl, 'activities')

  return (
    <section>
      <h1 className="h2">Activities</h1>
      {loading && <p>Loading activities...</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      {!loading && !error && (
        <div className="card">
          <ul className="list-group list-group-flush">
            {activities.map((activity) => (
              <li className="list-group-item" key={activity._id}>
                <strong>{activity.type}</strong> · {activity.durationMinutes} minutes
                <span className="badge text-bg-primary float-end">{activity.points} points</span>
              </li>
            ))}
            {activities.length === 0 && (
              <li className="list-group-item text-body-secondary">No activities logged yet.</li>
            )}
          </ul>
        </div>
      )}
    </section>
  )
}

export default Activities
