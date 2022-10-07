import { Roles } from "../model-role/model-role.model"
import { Workspace } from "../workspace/workspace.model"

export interface User {
  id: number,
  name: string,
  email: string,
  workspaceMember: WorkspaceMember[]
}

export interface WorkspaceMember{
  id: number,
  workspace: Workspace[]
  businessRole: Roles[]
}

export interface RoleHistoryItem{

  role: Roles,
  dateStart: Date,
  dateEnd: Date;

}
