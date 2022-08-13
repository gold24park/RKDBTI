import { ResultConverter } from "@services/ResultConverter";
import { theme } from "@styles/theme";
import { logEvent } from "firebase/analytics";
import { Props, SnsButton } from "./Buttons";
import Image from "next/image";
import { BaseImageWrapper } from "@components/BaseImageWrapper";

export const TwitterButton = ({ style, shareTitle, shareUrl, shareImage, result }: Props) => {
  const handleOnClick = () => {
    logEvent(window.FirebaseAnalytics, "share_twitter", {
      url: location.href,
      typeNumber: result.unique_id,
    });

    const twitterShareUrl = `https://twitter.com/share?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareTitle)}`;
    window.open(twitterShareUrl, "tweet", "width=486, height=386,scrollbars=yes");
  };

  return (
    <SnsButton
      style={style}
      onClick={handleOnClick}
      backgroundColor={theme.colors.twitter}
      fontColor={"white"}
    >
      <div className="imageWrapper">
        <Image src="/images/twitter.png" width={30} height={30} alt="twitter"/>
      </div>
      트위터 공유하기
    </SnsButton>
  );
};
