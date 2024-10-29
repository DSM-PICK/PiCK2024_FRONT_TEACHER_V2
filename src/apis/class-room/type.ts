export interface RequestClassRoomType {
  user_id: string;
  user_name: string;
  classroom_name: string;
  move: string;
  grade: number;
  class_num: number;
  num: number;
  start: number;
  end: number;
}

export interface SubmitClassroom {
  status: "OK" | "NO";
  id_list: string[];
}
