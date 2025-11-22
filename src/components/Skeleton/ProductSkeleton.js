import styles from './ProductSkeleton.module.css';

const ProductSkeleton = () => {
    return (
        <div className={styles.card}>
            <div className={styles.imagePlaceholder}></div>
            <div className={styles.info}>
                <div className={styles.category}></div>
                <div className={styles.title}></div>
                <div className={styles.price}></div>
                <div className={styles.button}></div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
