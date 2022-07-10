import styles from "@styles/progress.module.css";

type Props = {
  current: number;
  total: number;
};

export const ProgressBar = ({ current, total }: Props) => {
  const progress = (current / total) * 100;

  return (
    <div className={styles.wrapper}>
      <div className={styles.progressBackground}>
        <div
          className={styles.progressForeground}
          style={{ width: `${progress}%`, transition: "all 200ms" }}
        ></div>
      </div>
      {current} / {total}쪽
    </div>
  );
};
