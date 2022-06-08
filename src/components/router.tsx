import React, { Component, ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutWrap } from './layout';
import { Dashboard } from './dashboard'; 



class RootRouter extends Component {

  render(): ReactNode {
    return (
      <BrowserRouter>
        <LayoutWrap>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </LayoutWrap>
      </BrowserRouter>
    );
  }
}

export default RootRouter;
