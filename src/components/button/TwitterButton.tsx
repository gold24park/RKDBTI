import { ResultConverter } from "@services/ResultConverter";
import { theme } from "@styles/theme";
import { logEvent } from "firebase/analytics";
import { Props, SnsButton } from "./Buttons";

export const TwitterButton = ({ shareTitle, result }: Props) => {
  const handleOnClick = () => {
    logEvent(window.FirebaseAnalytics, "share_twitter", {
      url: location.href,
      typeNumber: result.unique_id,
    });

    const baseUrl = `https://${location.host}`;
    const resultUrl = `${baseUrl}/result?type=${ResultConverter.encode(
      result.unique_id
    )}`;

    const shareUrl = `https://twitter.com/share?url=${encodeURIComponent(
      resultUrl
    )}&text=${encodeURIComponent(shareTitle)}`;
    window.open(shareUrl, "tweet", "width=486, height=386,scrollbars=yes");
  };

  return (
    <SnsButton
      onClick={handleOnClick}
      backgroundColor={theme.colors.twitter}
      fontColor={"white"}
    >
      <img src="/images/twitter.png" />
      트위터 공유하기
    </SnsButton>
  );
};
