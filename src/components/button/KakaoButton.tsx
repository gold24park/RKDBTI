import { ResultConverter } from "@services/ResultConverter";
import { logEvent } from "firebase/analytics";
import { Props, SnsButton } from "./Buttons";
import { theme } from "@styles/theme";
import Image from "next/image";

export const KakaoButton = ({ shareTitle, shareUrl, shareImage, result }: Props) => {
  const handleOnClick = () => {
    logEvent(window.FirebaseAnalytics, "share_kakao", {
      url: location.href,
      typeNumber: result.unique_id,
    });

    const description = `<${result.name}> "${result.ment}"`

    window.Kakao.Link.sendCustom({
      templateId: 81347,
      templateArgs: {
        "TITLE": shareTitle,
        "DESC": description,
        "THU": shareImage,
        "RESULT_PATH": shareUrl.replace(`${process.env.NEXT_PUBLIC_URL}/`, "")
      },
    });
  };

  return (
    <SnsButton
      onClick={handleOnClick}
      backgroundColor={theme.colors.kakao}
      fontColor={theme.colors.kakaoBlack}
    >
      <div className="imageWrapper">
        <Image src="/images/kakao.png" width={30} height={30} alt="kakaotalk"/>
      </div>
      카카오톡 공유하기
    </SnsButton>
  );
};
