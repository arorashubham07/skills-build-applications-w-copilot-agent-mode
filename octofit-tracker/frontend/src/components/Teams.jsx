import { useApiCollection } from '../api.js'

function Teams() {
  const { data: teams, error, loading } = useApiCollection('teams')

  return (
    <section>
      <h1 className="h2">Teams</h1>
      {loading && <p>Loading teams...</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id}>
              <article className="card h-100">
                <div className="card-body">
                  <h2 className="h5 card-title">{team.name}</h2>
                  <p className="card-text text-body-secondary mb-0">
                    {team.memberIds?.length ?? 0} member{team.memberIds?.length === 1 ? '' : 's'}
                  </p>
                </div>
              </article>
            </div>
          ))}
          {teams.length === 0 && <p className="text-body-secondary">No teams yet.</p>}
        </div>
      )}
    </section>
  )
}

export default Teams
