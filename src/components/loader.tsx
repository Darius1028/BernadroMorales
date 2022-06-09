import { Spin } from 'antd';
import React from 'react';

export const Loader: React.FC = () => (
  <div className="spin">
    <Spin size="large" />
  </div>
);