import React from 'react';

interface Props<T> {
  children: React.ReactElement;
  value: T;
  selectedValue: T;
}
type TabPannelType = <T>(props: Props<T>) => JSX.Element;

const TabPannel: TabPannelType = ({ children, value, selectedValue }) => (
  <>{value === selectedValue && children}</>
);

export default TabPannel;
