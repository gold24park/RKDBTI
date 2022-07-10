import Link from "next/link";
import Image from "next/image";
import { NavTextButton } from "./button/NavTextButton";
import styled from "styled-components";
import { ContainerWidth, NavbarHeight } from "@styles/size";

/**
 * 네비바
 */

type Props = {
  onClickBack?: () => void;
};

const NavWrapper = styled.nav`
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: space-around;
  height: ${NavbarHeight - 1}px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 1px;
  width: calc(100% - 2px);
  max-width: ${ContainerWidth - 2}px;
  background: white;
  z-index: 1;

  div {
    flex: 1;
  }
`;

export const Navbar = ({ onClickBack }: Props) => (
  <NavWrapper>
    {onClickBack && <NavTextButton onClick={onClickBack}>뒤로</NavTextButton>}
    <Link href="/">
      <a>
        <Image src="/images/head_logo.png" width={250} height={40} alt="logo" />
      </a>
    </Link>
    {onClickBack && (
      <Link href="/">
        <NavTextButton>다시하기</NavTextButton>
      </Link>
    )}
  </NavWrapper>
);
