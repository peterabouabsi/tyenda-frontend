interface ButtonPagerConfig{
  color?: string;
  value?: string;
  path?: string;
  queryParams?: any
}
export interface PagerConfig{
  button: ButtonPagerConfig,
  dataCount: number;
}
