import { useApiCollection } from '../api.js'

function Workouts() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
    : 'http://localhost:8000/api/workouts'
  const { data: workouts, error, loading } = useApiCollection(apiUrl, 'workouts')

  return (
    <section>
      <h1 className="h2">Workout suggestions</h1>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6 col-lg-4" key={workout._id}>
              <article className="card h-100">
                <div className="card-body">
                  <span className="badge text-bg-secondary mb-2">{workout.fitnessLevel}</span>
                  <h2 className="h5 card-title">{workout.title}</h2>
                  <p className="card-text">{workout.description}</p>
                </div>
                <div className="card-footer text-body-secondary">{workout.durationMinutes} minutes</div>
              </article>
            </div>
          ))}
          {workouts.length === 0 && <p className="text-body-secondary">No workout suggestions yet.</p>}
        </div>
      )}
    </section>
  )
}

export default Workouts
