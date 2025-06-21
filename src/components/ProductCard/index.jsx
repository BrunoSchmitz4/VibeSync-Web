// src/components/ProductCard/index.jsx
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      <a href={product.url} target="_blank" rel="noopener noreferrer">
        <img
          className={styles.productImage}
          src={product.image}
          alt={product.name}
        />
        <h3 className={styles.productName}>{product.name}</h3>
      </a>
    </div>
  );
}

export default ProductCard;
