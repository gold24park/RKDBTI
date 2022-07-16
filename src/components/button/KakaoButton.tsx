import { ResultConverter } from "@services/ResultConverter";
import { logEvent } from "firebase/analytics";
import { Props, SnsButton } from "./Buttons";
import { theme } from "@styles/theme";
import Image from "next/image";

export const KakaoButton = ({ shareTitle, result }: Props) => {
  const handleOnClick = () => {
    logEvent(window.FirebaseAnalytics, "share_kakao", {
      url: location.href,
      typeNumber: result.unique_id,
    });

    const baseUrl = `https://${location.host}`;
    const resultUrl = `${baseUrl}/result?type=${ResultConverter.encode(
      result.unique_id
    )}`;

    // TODO: remove default image
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: shareTitle,
        description: result.name,
        imageUrl:
          result.image ||
          "https://avatars.githubusercontent.com/u/12989924?v=4",
        link: {
          mobileWebUrl: baseUrl,
          webUrl: baseUrl,
        },
      },
      buttons: [
        {
          title: "결과 확인하기",
          link: {
            mobileWebUrl: resultUrl,
            webUrl: resultUrl,
          },
        },
        {
          title: "나도 해보기",
          link: {
            mobileWebUrl: baseUrl,
            webUrl: baseUrl,
          },
        },
      ],
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
