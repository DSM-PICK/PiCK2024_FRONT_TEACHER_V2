export interface AttendType {
  id: string;
  user_name: string;
  grade: number;
  class_num: number;
  num: number;
  status: string;
}

export interface ChangeStatus {
  user_id: string;
  status: string;
}
