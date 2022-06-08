import { useState, useEffect } from "react";
import { Row, Col, Radio, Select, Avatar, Image } from "antd";
import { getData, IPage  } from '../slices/infoApi/data.thunks';
import { action } from '../slices/infoApi/data';
import { Items } from './items';
import { PaginationFooter } from './paginationFooter';
import { useDispatch } from 'react-redux';
import { LanguageTypes } from './interfaces';

const { Option } = Select;

export const Dashboard = () => {
  const [page, setPage] = useState<IPage | undefined>(undefined);
  const dispatch = useDispatch();


  useEffect(() => { 
     dispatch<any>(action.clearData())
  });

  const handleChange = (item: string) => { 
    setPage( { page: 0, value: item } );
    getItems( { page: 0, value: item } );
  };

  const getItems = (value: IPage) => {
    dispatch<any>(getData(value));
  };


  return (
    <div className="table">
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
      <Row gutter={[24, 24]}>
          <Items />
      </Row>
      <PaginationFooter getItems={getItems}  />
    </div>
  );
};
