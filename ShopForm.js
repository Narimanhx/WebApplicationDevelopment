import React, { useState } from 'react';

function ShopForm() {
  const [shopName, setShopName] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [submittedShop, setSubmittedShop] = useState(null);

  // Define the logoPreview state to show the uploaded logo
  const [logoPreview, setLogoPreview] = useState(null);

  const handleShopSubmit = (e) => {
    e.preventDefault();
    setSubmittedShop({
      shopName,
      shopDescription,
      selectedLogo,
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setSelectedLogo(file);

    // Display the uploaded logo
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setShopName('');
    setShopDescription('');
    setSelectedLogo(null);
    setLogoPreview(null);
    setSubmittedShop(null);
  };

  return (
    <div>
      <h2>New Shop</h2>
      {submittedShop ? (
        <div>
          <p>Submitted Shop:</p>
          <p>Name: {submittedShop.shopName}</p>
          <p>Description: {submittedShop.shopDescription}</p>
          <p>Uploaded Logo: {submittedShop.selectedLogo.name}</p>
        </div>
      ) : (
        <form onSubmit={handleShopSubmit}>
          <div>
            <label>Upload Logo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
            {selectedLogo && <p>Selected Logo: {selectedLogo.name}</p>}
          </div>
          <div>
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo Preview"
                style={{ maxWidth: '200px' }}
              />
            )}
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter shop name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              placeholder="Enter shop description"
              value={shopDescription}
              onChange={(e) => setShopDescription(e.target.value)}
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

export default ShopForm;
