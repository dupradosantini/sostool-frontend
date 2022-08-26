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
  name: String;
  description: String;
}
