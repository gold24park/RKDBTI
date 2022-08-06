import Link from "next/link";
import Image from "next/image";
import { NavTextButton } from "./button/NavTextButton";
import styled from "styled-components";
import { media, size } from "@styles/size";
import { BaseImageWrapper } from "./BaseImageWrapper";

/**
 * 네비바
 */

type Props = {
  onClickBack?: () => void;
};

const LogoWrapper = styled(BaseImageWrapper)`
  width: 260px;
  ${media.phone} {
    width: 200px;
  }
`

const NavWrapper = styled.nav`
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: space-around;
  height: ${size.navbar_height - 1}px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 0px;
  width: calc(100% - 2px);
  max-width: ${size.container_width - 2}px;
  background: white;
  z-index: 1;
  
  @media (min-height: ${size.container_height}px) {
    top: calc(50% - ${size.container_height / 2}px + 2px);
  }

  ${media.tablet} {
    top: calc(50% - ${size.tablet.container_height / 2}px + 2px);
  }
  
  ${media.phone} {
    height: ${size.mobile.navbar_height}px;
    top: 1px;
  }
`;

export const Navbar = ({ onClickBack }: Props) => (
  <NavWrapper>
    {onClickBack && <NavTextButton onClick={onClickBack}>뒤로</NavTextButton>}
    <Link href="/">
      <LogoWrapper>
        <Image 
          className="logo"
          src="/images/head_logo.png" 
          layout="fill"
          objectFit="contain" 
          alt="logo" 
        />
      </LogoWrapper>
    </Link>
    {onClickBack && (
      <Link href="/">
        <NavTextButton>다시하기</NavTextButton>
      </Link>
    )}
  </NavWrapper>
);
