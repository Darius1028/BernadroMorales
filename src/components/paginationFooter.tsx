
import { useState, useEffect } from "react";
import type, { Pagination, Row, PaginationProps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../slices/rootReducer";
import { selectors } from "../slices/infoApi/data";
import { IPage  } from '../slices/infoApi/data.thunks';


interface Props {
  getItems: ( page: IPage ) => void;
}

export const PaginationFooter = ( {getItems}: Props ) => {
  
  const dataPagination = useSelector((state: RootState) => selectors.getDataState(state));
  const [currentPage, setCurrentPage] = useState<number>(1);


  const onChange: PaginationProps['onChange'] = page => {
    getItems( { page: page - 1 , value: dataPagination.query ??  ""  } )
  };
 
  useEffect(() => { 
    let temp = dataPagination.page?? 0; 
    console.log(dataPagination);
    setCurrentPage( temp + 1 );
 }, [dataPagination] );


 
  return (
    <>
      {dataPagination
        ? <Row className={"radioButton"}>
        <Pagination 
        current={ currentPage } 
        total={dataPagination.data?.nbPages ?? 0 } 
        onChange={onChange}
        hideOnSinglePage={true}
        showSizeChanger={false}
        />
      </Row>
        : null}

    </>
  );
};
