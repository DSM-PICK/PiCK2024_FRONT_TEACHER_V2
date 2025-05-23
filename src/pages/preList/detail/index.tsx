import { DetailList } from "@/apis/story";
import Layout from "@/components/layout/layout";
import OutRequest from "@/components/outRequest/outRequest";
import { useParams } from "react-router-dom";

const PreviousDetail = () => {
  const { detail } = useParams<{ detail: string }>();
  const id = detail || "";

  const { data: detailListData } = DetailList(id);

  return (
    <Layout title={`${detailListData?.user_name}의 이전 외출 기록`}>
      {detailListData?.application_story.length !== 0
        ? detailListData?.application_story.map((item) => (
            <OutRequest
              key={item.date}
              userInfo={item.date}
              time={
                item.end_time
                  ? `${item.start_time} ~ ${item.end_time}`
                  : `${item.start_time} ~`
              }
              reason={item.reason}
              selected={false}
              onClick={() => {}}
            />
          ))
        : "외출 기록이 없습니다"}
    </Layout>
  );
};

export default PreviousDetail;
