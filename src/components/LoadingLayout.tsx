import { ReactNode } from "react"
import loadingStyles from "@styles/loading.module.css"

type Props = {
    children?: ReactNode
}

export const LoadingLayout = (props: Props) => (
    <div className={loadingStyles.wrapper}>
        {props.children}
    </div>
)