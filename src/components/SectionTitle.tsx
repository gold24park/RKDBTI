import { media } from "@styles/size";
import styled from "styled-components";

export const SectionTitle = styled.div`
  font-weight: bold;
  padding: 8px 12px;
  position: relative;
  background: #eee;
  border-radius: 16px;
  display: inline-block;
  margin-bottom: 14px;
  margin-top: 24px;
  ${media.phone} {
    font-size: 14px;
  }
`;