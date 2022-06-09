import { useState, useEffect } from "react";
import { Row, Col, Radio, Select, Avatar, Image } from "antd";
import { getData, IPage } from "../slices/infoApi/data.thunks";
import { selectors, Item } from "../slices/infoApi/data";
import { Items } from "./items";
import { PaginationFooter } from "./paginationFooter";
import { Loader } from "./loader";
import { useDispatch, useSelector } from "react-redux";
import { LanguageTypes } from "./interfaces";

import { RootState } from "../slices/rootReducer";

const { Option } = Select;

export const Dashboard = () => {
  const [item, setItem] = useState<Item>({
    nbHits: 0,
    page: 0,
    nbPages: 0,
    hitsPerPage: 0,
    query: "",
    hits: [],
    params: "",
  });
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => selectors.getDataState(state));

  const handleChange = (item: string) => {
    getItems({ page: 0, value: item });
  };

  useEffect(() => {
    window.localStorage.clear();
  });

  useEffect(() => {
    const temp: Item = data.items.filter((item: Item) => item.params === data.params)[0];

    if (temp) {
      setItem(temp);
    }
  }, [data]);

  const getItems = async (value: IPage) => {
    const temp: Item = data.items.filter(
      (item: Item) => item.page === value.page && item.query === value.value
    )[0];
    if (temp) {
      setItem(temp);
    } else {
      await dispatch<any>(getData(value));
    }
  };

  return (
    <div className='table'>
      <Row style={{ marginBottom: "38px" }}>
        <Col span={24} className={"radioButton"}>
          <Radio.Group value={"all"}>
            <Radio.Button value='all'>All</Radio.Button>
            <Radio.Button value='My faves'>My faves</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={24}>
          <Select placeholder='Select your news' onChange={handleChange}>
            {LanguageTypes.map((option) => (
              <Option key={option.value} value={option.value}>
                <Avatar
                  src={
                    <Image
                      preview={false}
                      src={`assets/${option.value}.png`}
                      style={{ width: 15 }}
                    />
                  }
                />
                {option.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      {data.loading ? (
        <Loader />
      ) : (
        <>
          <Row gutter={[24, 24]}>
            <Items item={item} favoriteHits={data.favoriteHits} />
          </Row>
          <PaginationFooter getItems={getItems} item={item} />
        </>
      )}
    </div>
  );
};
