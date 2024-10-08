import styled from "styled-components/native";

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.metrics.px(18)}px;
  font-family: ${({ theme }) => theme.fonts.Inter_400Regular};
`;
