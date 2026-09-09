import { useApiCollection } from '../api.js'

function Users() {
  const { data: users, error, loading } = useApiCollection('users')

  return (
    <section>
      <h1 className="h2">Users</h1>
      {loading && <p>Loading users...</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      {!loading && !error && (
        <div className="card">
          <ul className="list-group list-group-flush">
            {users.map((user) => (
              <li className="list-group-item" key={user._id}>
                <strong>{user.displayName}</strong>
                <span className="text-body-secondary"> · {user.email}</span>
                <span className="badge text-bg-secondary float-end">{user.fitnessLevel}</span>
              </li>
            ))}
            {users.length === 0 && <li className="list-group-item text-body-secondary">No users yet.</li>}
          </ul>
        </div>
      )}
    </section>
  )
}

export default Users
