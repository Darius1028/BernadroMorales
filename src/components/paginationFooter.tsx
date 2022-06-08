
import { useState, useEffect } from "react";
import { Pagination, Row, PaginationProps } from "antd";
import { Item } from "../slices/infoApi/data";
import { IPage  } from '../slices/infoApi/data.thunks';


interface Props {
  item: Item
  getItems: ( page: IPage ) => void;
}

export const PaginationFooter = ( { getItems, item }: Props ) => {
  
  const [currentPage, setCurrentPage] = useState<number>(1)
  const onChange: PaginationProps['onChange'] = page => {
    getItems( { page: page - 1 , value: item.query ??  ""  } )
  };
 
  useEffect(() => { 
    let temp = item.page?? 0; 
    setCurrentPage( temp + 1 );
 }, [item] );

  return (
    <>
      {item
        ? <Row className={"radioButton"}>
        <Pagination 
        current={ currentPage } 
        total={item.nbPages ?? 0 } 
        onChange={onChange}
        hideOnSinglePage={true}
        showSizeChanger={false}
        />
      </Row>
        : null}

    </>
  );
};
