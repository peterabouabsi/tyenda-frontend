export interface CartConfig<Type> {
  top: number;
  skip: number;
  loaded: boolean;
  data: Type[];
}
