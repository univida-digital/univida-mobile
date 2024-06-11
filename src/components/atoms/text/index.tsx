import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import { CustomTextStyle } from './styles';

interface CustomTextProps {
  children: ReactNode;
  size?: number;
  font?: 'regular' | 'medium' | 'semiBold' | 'bold';
  color?: 'primary' | 'black' | 'white';
  mt?: number;
}

export default function CustomText({ size, font, color, mt, children }: CustomTextProps) {
  return (
    <CustomTextStyle size={size} font={font} color={color} mt={mt}>
      {children}
    </CustomTextStyle>
  );
}