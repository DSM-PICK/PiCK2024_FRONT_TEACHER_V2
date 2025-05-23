export interface ApplicationListType {
  id: string;
  user_id: string;
  user_name: string;
  start: string;
  end: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}

export interface EarlyReturnType {
  id: string;
  user_name: string;
  start: string;
  grade: number;
  class_num: number;
  num: number;
  reason: string;
}
