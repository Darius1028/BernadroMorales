import { Row, Col } from "antd";
import {
  HeartOutlined,
  ClockCircleOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { IHits, Item, action } from "../slices/infoApi/data";
import { useDispatch } from "react-redux";

interface Props {
  item: Item;
  favoriteHits: string[];
}

export const Items = ({ item, favoriteHits }: Props) => {
  const dispatch = useDispatch();

  const handleClickRow = (url: string) => {
    window.open(url);
  };

  const handleClickHeart = (value: string) => {
    dispatch<any>(action.addFavoriteHit(value));
  };

  return (
    <>
      {Array.isArray(item.hits)
        ? item.hits.map((elem: IHits) => (
            <Col span={12}>
              <Row className={"wrap"}>
                <Col
                  span={22}
                  className={"description"}
                  onClick={() => {
                    handleClickRow(elem.story_url);
                  }}
                >
                  <div className='info'>
                    <ClockCircleOutlined /> 2 hours ago by {elem.author}
                  </div>
                  <div>{elem.story_title}</div>
                </Col>
                <Col
                  span={2}
                  className={"heart"}
                  onClick={() => {
                    handleClickHeart(elem.objectID);
                  }}
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  {!favoriteHits.includes(elem.objectID) ? (
                    <HeartOutlined />
                  ) : (
                    <HeartFilled />
                  )}
                </Col>
              </Row>
            </Col>
          ))
        : null}
    </>
  );
};
