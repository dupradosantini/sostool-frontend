import { Responsibility } from "../model-responsibility/model-responsibility.model";
import { ModelRole } from "../model-role/model-role.model";

export interface Workspace{
  id: Number;
  name: String;
  description: String;
  teams: Teams[];
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
}
