import { IconButton } from "react-native-paper";
import styled from "styled-components/native";

const BellNotificationStyle = styled(IconButton)`
  position: absolute;
  top: ${({ theme }) => theme.metrics.px(50)}px;
  right: ${({ theme }) => theme.metrics.px(20)}px;
`;

export default BellNotificationStyle;