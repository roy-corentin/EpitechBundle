import User from './types/user'

export function authorizedToViewUser(myself: User, user: User): boolean {
  if (user.id === myself.id) return true
  if (myself.role === 'employee') return false
  else if (myself.role === 'manager') {
    if (user.team_ids.length === 0) return false
    let inTeam = false
    for (const managedTeamId of myself.managed_team_ids)
      if (user.team_ids.find((teamId) => teamId === managedTeamId)) {
        inTeam = true
        break
      }
    return inTeam
  }
  return true
}

export function authorizedToCUDUser(myself: User, user: User): boolean {
  if (user.id === myself.id) return true
  if (myself.role === 'administrator') return true
  return false
}
