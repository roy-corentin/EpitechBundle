export type UserRole = 'employee' | 'manager' | 'administrator'

type User = {
  id: number
  username: string
  email: string
  role: UserRole
  team_ids: number[]
  managed_team_ids: number[]
}

export type UserUpdate = User & {
  password?: string
}

export default User
