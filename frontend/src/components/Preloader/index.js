// @flow

import * as React from 'react';

import './styles.scss';

type Props = {
  height?: number,
};

const Preloader = ({ height }: Props) => (
  <div className="text-center">
    <div className="preloader" style={{ height }}>
      <div className="preloader__bounce preloader__bounce--1" />
      <div className="preloader__bounce preloader__bounce--2" />
      <div className="preloader__bounce preloader__bounce--3" />
    </div>
  </div>
);

Preloader.defaultProps = {
  height: 548,
};

export default Preloader;
