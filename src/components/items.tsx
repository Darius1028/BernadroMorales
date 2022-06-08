import { Row, Col } from "antd";
import {
  HeartOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import { IHits, Item } from "../slices/infoApi/data";


interface Props {
  item: Item
}

export const Items = ( { item }: Props  ) => {


    const handleClickRow = (url: string) => {
      window.open(url);
    };

    const handleClickHeart= (url: string) => {
      window.open(url);
    };


  return (
    <>
      {Array.isArray(item.hits)
        ? item.hits.map((item: IHits) => (
          <Col span={12} >
            <Row className={"wrap"}>
              <Col span={22} className={"description"} 
                onClick={ () => { handleClickRow(item.story_url) } } 
              >
                <div className='info'>
                  <ClockCircleOutlined /> 2 hours ago by {item.author}
                </div>
                <div>{ item.story_title }</div>
              </Col>
              <Col
                span={2}
                className={"heart"}
                onClick={ () => { handleClickHeart(item.story_url) } } 
                style={{ justifyContent: "center", display: "flex" }}
              >
                <HeartOutlined />
              </Col>
            </Row>
          </Col>
          ))
        : null}
    </>
  );
};
