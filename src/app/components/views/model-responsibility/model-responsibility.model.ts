export interface ModelResponsibility{
  id: Number,
  description: String,
  sonResponsibilities?: Responsibility[]
}


export interface Responsibility{
  id: Number,
  description: string,
  parentResponsibility: ModelResponsibility;
}
