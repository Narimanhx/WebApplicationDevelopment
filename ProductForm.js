import React, { useState } from 'react';

function ProductForm() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [submittedProduct, setSubmittedProduct] = useState(null);

  // Define the imagePreview state to show the uploaded image
  const [imagePreview, setImagePreview] = useState(null);

  const handleProductSubmit = (e) => {
    e.preventDefault();
    setSubmittedProduct({
      productName,
      productDescription,
      productCategory,
      productQuantity,
      productPrice,
      selectedFile,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Display the uploaded image
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setProductName('');
    setProductDescription('');
    setProductCategory('');
    setProductQuantity('');
    setProductPrice('');
    setSelectedFile(null);
    setImagePreview(null);
    setSubmittedProduct(null);
  };

  return (
    <div>
      <h2>New Product</h2>
      {submittedProduct ? (
        <div>
          <p>Submitted Product:</p>
          <p>Name: {submittedProduct.productName}</p>
          <p>Description: {submittedProduct.productDescription}</p>
          <p>Category: {submittedProduct.productCategory}</p>
          <p>Quantity: {submittedProduct.productQuantity}</p>
          <p>Price: {submittedProduct.productPrice}</p>
          <p>Uploaded File: {submittedProduct.selectedFile.name}</p>
        </div>
      ) : (
        <form onSubmit={handleProductSubmit}>
          <div>
            <label>Upload Photo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {selectedFile && <p>Selected File: {selectedFile.name}</p>}
          </div>
          <div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                style={{ maxWidth: '200px' }}
              />
            )}
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              placeholder="Enter product description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              placeholder="Enter product category"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              placeholder="Enter product quantity"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              placeholder="Enter product price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ProductForm;
