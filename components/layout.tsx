import * as React from "react";
import styles from './layout.module.css'

interface IProps {

}

const layout: React.FC<IProps> = ({children}) => {
    return (
        <div className={styles.container}>{children}</div>);
};

export default layout;
