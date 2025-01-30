import React, { useState } from "react";
import MeasurementForm from "./MeasurementForm";
import products from "../data/products";
import "../styles/ProductDisplay.css";

const ProductDisplay = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]); // Default to first product

  return (
    <div className="">
      <div className="dropdown">
      <label className="productSelectLabel">Select a Product:</label>
        <select className="productSelectDropdown" onChange={(e) => setSelectedProduct(products[e.target.value])}>
          {products.map((product, index) => (
            <option key={product.id} value={index}>{product.name}</option>
          ))}
        </select>
      </div>
      
    
    <div className="productDisplay">
      
      
      <div className="productDisplay-left">
        <div className="productDisplay-imgList">
          <img src={selectedProduct.image} alt="" />
          <img src={selectedProduct.image} alt="" />
        </div>
        <div className="productDisplay-img">
          <img className="productDisplay-imgMain" src={selectedProduct.image} alt="" />
          
        </div>
      </div>

      <div className="productDisplay-middle">
        <h1>{selectedProduct.name} {selectedProduct.size}</h1>
        <div className="priceWrapper">
          <div className="productDisplay-priceNew">£{selectedProduct.new_price}/m²</div>
          <div className="productDisplay-priceOld"><span>RRP </span>£{selectedProduct.old_price}/m²</div>
        </div>
        <hr className='hr-style' />
        
        

        <h3 className='details-header'>Details:</h3>
        <div className="product-info">
          <div className="product-info-left">
            <p><span> Box Size:</span> {selectedProduct.box_size}m²</p>
            <p><span>Format:</span> {selectedProduct.size}cm</p>
            <p><span>Finish:</span> {selectedProduct.finish}</p>
            <p><span>Suitable for:</span> {selectedProduct.sub_category}</p>
          </div>
          <div className="product-info-right">
            <p><span>Thickness:</span> {selectedProduct.thickness}mm</p>
            <p><span>Material:</span> {selectedProduct.material}</p>
            <p><span>Available:</span> In Stock</p>
          </div>
        </div>
        <h4>Description:</h4>
        <div className="productDisplay-desc">{selectedProduct.desc}</div>
        <h5>Tags:</h5>
        <div className="product-tags">
          {selectedProduct.category}, {selectedProduct.sub_category}, {selectedProduct.finish}
        </div>
      </div>

      <div className="productDisplay-right">
        <div className="priceCalculator">
          <MeasurementForm product={selectedProduct} />
        </div>   
      </div>
    </div>
    </div>
  );
}

export default ProductDisplay;
