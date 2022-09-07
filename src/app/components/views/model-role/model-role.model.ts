export interface ModelRole{
  id: Number,
  name: String,
  description: String,
  sonRoles?: Roles[]
}


export interface Roles{
  id: Number;
  name: String;
  description: String;
  parentRole: ModelRole;
}
