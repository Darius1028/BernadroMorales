import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../slices/rootReducer";
import { selectors, IHits} from "../slices/infoApi/data";

export const Items = () => {
  const [hits, setHits] = useState<IHits[] | undefined>(undefined);
  const info = useSelector((state: RootState) => selectors.getDataState(state));

    const handleClickRow = (url: string) => {
      window.open(url);
    };

    const handleClickHeart= (url: string) => {
      window.open(url);
    };

    useEffect(() => { 
      setHits( info.data?.hits )
   }, [info] );

  return (
    <>
      {Array.isArray(hits)
        ? hits.map((item: IHits) => (
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
