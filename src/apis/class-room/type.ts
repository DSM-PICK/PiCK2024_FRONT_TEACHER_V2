export interface RequestClassRoomType {
  user_id: string;
  username: string;
  classroom_name: string;
  move: string;
  grade: number;
  class_num: number;
  num: number;
  start_period: number;
  end_period: number;
}

export interface SubmitClassroom {
  status: "OK" | "NO";
  ids: string[];
}
