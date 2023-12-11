import User from "./user"

type Team = {
  id: number
  name: string
  manager: User
  members: User[]
}

export default Team
