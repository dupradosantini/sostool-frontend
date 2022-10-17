import { Responsibility } from "../model-responsibility/model-responsibility.model";
import { ModelRole } from "../model-role/model-role.model";
import { User } from "../users-read/userModel";

export interface Workspace{
  id: Number;
  name: String;
  description: String;
  teams: Teams[];
  activities: Activity[];
}

export interface Teams{
  id: Number;
  name: String;
  teamAssignedRoles: Roles[];
}

export interface Roles{
  id: Number;
  name: string;
  description: String;
  parentRole: ModelRole;
  roleAssignedResponsibilities?: Responsibility[];
  assignedMembers: User[];
}

export interface Activity{
  id: number,
  name: string,
  description: string,
  state: string
}
