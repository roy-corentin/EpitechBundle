import { dayjs } from '@/dayjs'
import parseApiClock from '@/parsers/parseApiClock'
import parseApiWorkingTime, { getLocalDateTime } from '@/parsers/parseApiWorkingTime'
import { ClockApi } from '@/types/clock'
import Team from '@/types/team'
import User, { UserRole } from '@/types/user'
import UserWithToken from '@/types/userWithToken'
import WorkingTime, { ApiWorkingTime } from '@/types/workingTime'
import useOfflineMode from './offlineMode'

const API_URL = 'http://loclahost:4000/api'
const { registerRequest } = useOfflineMode()

interface FetchUserParams {
  username?: string
  email?: string
}

interface FetchWorkingTimesParams {
  userId: number
  startDate?: string
  endDate?: string
  page?: number
}

interface CreateWorkingTimeParams {
  userId: number
  startDate: Date
  endDate: Date
}

interface UpdateWorkingTimeParams {
  userId: number
  workingTimeId: number
  startDate: Date
  endDate: Date
}

async function signUp(email: string, username: string, password: string): Promise<UserWithToken> {
  const url = `${API_URL}/sign_up`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        email,
        username,
        password
      }
    })
  })
  return await res.json()
}

async function signIn(email: string, password: string): Promise<UserWithToken> {
  const url = `${API_URL}/sign_in`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        email,
        password
      }
    })
  })
  return await res.json()
}

async function getMe(): Promise<User> {
  const url = `${API_URL}/me`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return (await res.json()).user
}

async function fetchUsers(params?: FetchUserParams): Promise<User[]> {
  let url = `${API_URL}/users`
  if (params) {
    if (params.username && params.username.trim().length > 0) url += `?username=${params.username}`
    if (params.email && params.email.trim().length > 0) url += `${url.includes('?') ? '&' : '?'}email=${params.email}`
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return (await res.json()).data as User[]
}

async function getUserById(userId: number): Promise<User> {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return (await res.json()).data as User
}

async function createUser(email: string, username: string, password: string, role: UserRole): Promise<User> {
  const url = `${API_URL}/users`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      user: {
        email,
        username,
        password,
        role
      }
    })
  })
  return (await res.json()).data
}

async function updateUser(userId: number, updatedUser: Partial<User>): Promise<User> {
  const url = `${API_URL}/users/${userId}`
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      user: updatedUser
    })
  })
  return (await res.json()).data
}

async function deleteUser(userId: number) {
  return await fetch(`http://localhost:4000/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

async function getWorkingTimeById(userId: number, workingTimeId: number): Promise<WorkingTime> {
  const url = `${API_URL}/workingtimes/${userId}/${workingTimeId}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  const apiWorkingTime = (await res.json()).data as ApiWorkingTime
  return parseApiWorkingTime(apiWorkingTime)
}

async function fetchUserWorkingTimes(
  params: FetchWorkingTimesParams
): Promise<{ workingTimes: WorkingTime[]; nbPage: number }> {
  const nbPerPage = 10
  let url = `${API_URL}/workingtimes/${params.userId}`

  if ((params.startDate && params.startDate.trim().length > 0) || (params.endDate && params.endDate.trim().length > 0))
    url += '?'
  if (params.startDate && params.startDate.trim().length > 0)
    url += `startDate=${dayjs(params.startDate).format('YYYY-MM-DDTHH:mm:ss[Z]')}&`
  if (params.endDate && params.endDate.trim().length > 0)
    url += `endDate=${dayjs(params.endDate).format('YYYY-MM-DDTHH:mm:ss[Z]')}`

  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  const apiWorkingTimes = (await result.json()).data as ApiWorkingTime[]
  const workingTimes = apiWorkingTimes.map(parseApiWorkingTime)

  if (params.page) {
    const indexFirstItem = Math.floor((params.page - 1) * nbPerPage)
    const workingTimesPaginated = workingTimes.slice(indexFirstItem, indexFirstItem + nbPerPage)
    return { workingTimes: workingTimesPaginated, nbPage: Math.floor(workingTimes.length / nbPerPage) + 1 }
  }

  return { workingTimes, nbPage: Math.floor(workingTimes.length / nbPerPage) }
}

async function createWorkingTime(params: CreateWorkingTimeParams): Promise<WorkingTime> {
  const url = `${API_URL}/workingtimes/${params.userId}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      workingtime: {
        start: getLocalDateTime(params.startDate),
        end: getLocalDateTime(params.endDate)
      }
    })
  })
  const apiWorkingTime = (await res.json()).data as ApiWorkingTime
  return parseApiWorkingTime(apiWorkingTime)
}

async function updateWorkingTime(params: UpdateWorkingTimeParams): Promise<WorkingTime> {
  const url = `${API_URL}/workingtimes/${params.workingTimeId}`
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      working_time: {
        start: getLocalDateTime(params.startDate),
        end: getLocalDateTime(params.endDate),
        user_id: params.userId
      }
    })
  })
  const apiWorkingTime = (await res.json()).data as ApiWorkingTime
  return parseApiWorkingTime(apiWorkingTime)
}

async function deleteWorkingTime(workingTimeId: number) {
  const url = `${API_URL}/workingtimes/${workingTimeId}`
  return await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

async function getClockByUserId(userId: number) {
  const url = `${API_URL}/clocks/${userId}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return parseApiClock((await res.json()).data as ClockApi)
}

async function toggleClockByUserId(userId: number, offline: boolean) {
  const url = `${API_URL}/clocks/${userId}`
  const options: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

  if (offline) {
    registerRequest(url, options)
    Promise.resolve()
    return
  }

  const res = await fetch(url, options)
  return parseApiClock((await res.json()).data as ClockApi)
}

async function fetchTeams(): Promise<Team[]> {
  const url = `${API_URL}/teams`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return (await res.json()).data
}

async function getTeamById(teamId: number): Promise<Team> {
  const url = `${API_URL}/teams/${teamId}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return (await res.json()).data
}

async function createTeam(name: string, manager: User, members: User[]): Promise<Team> {
  const url = `${API_URL}/teams`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      team: {
        name,
        manager_id: manager.id
      }
    })
  })
  const teamId = (await res.json()).data.id as number
  for (const member of members) {
    await addTeamMember(teamId, member.id)
  }
  return {
    id: teamId,
    name,
    manager,
    members
  }
}

async function updateTeam(
  teamId: number,
  updatedTeam: { name?: string; manager_id?: number },
  usersToAdd?: User[],
  usersToRemove?: User[]
): Promise<Team> {
  const url = `${API_URL}/teams/${teamId}`
  const _res = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      team: updatedTeam
    })
  })
  if (usersToAdd) {
    for (const userToAdd of usersToAdd) addTeamMember(teamId, userToAdd.id)
  }
  if (usersToRemove) {
    for (const userToRemove of usersToRemove) removeTeamMember(teamId, userToRemove.id)
  }
  return await getTeamById(teamId)
}

async function deleteTeam(teamId: number): Promise<boolean> {
  const url = `${API_URL}/teams/${teamId}`
  return (
    await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  ).ok
}

async function addTeamMember(teamId: number, memberId: number): Promise<number> {
  const url = `${API_URL}/team_user/${teamId}/assign/${memberId}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return (await res.json()).data.id
}

async function removeTeamMember(teamId: number, memberId: number): Promise<boolean> {
  const url = `${API_URL}/team_user/${teamId}/unassign/${memberId}`
  return (
    await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  ).ok
}

const useApi = () => {
  return {
    signUp,
    signIn,
    getMe,
    fetchUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    fetchUserWorkingTimes,
    getWorkingTimeById,
    createWorkingTime,
    updateWorkingTime,
    deleteWorkingTime,
    getClockByUserId,
    toggleClockByUserId,
    fetchTeams,
    createTeam,
    updateTeam,
    deleteTeam
  }
}

export default useApi
