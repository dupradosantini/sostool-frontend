export interface ModelResponsibility{
  id: number,
  description: string,
  sonResponsibilities?: Responsibility[]
}


export interface Responsibility{
  id: number,
  description: string,
  parentResponsibility: ModelResponsibility;
}
