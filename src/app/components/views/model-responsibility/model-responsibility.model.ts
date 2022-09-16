export interface ModelResponsibility{
  id: Number,
  description: String,
  sonResponsibilities?: Responsibility[]
}


export interface Responsibility{
  id: Number,
  description: String,
  parentResponsibility: ModelResponsibility;
}
