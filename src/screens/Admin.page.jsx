import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../context/UserContext";
import { collection, addDoc } from "firebase/firestore/lite";
import { appDB } from "../utils/firestore.js";

const Admin = () => {
  const { generateUUID, setGenerateUUID, generateUniqueID } = useUser();

  const { InventoryList, updateInventoryList } = useUser();

  const handleChange = (e) => {
    updateInventoryList({
      ...InventoryList,
      [e.target.id]: e.target.value,
    });
  };

  const handleSliderChange = (e) => {
    updateInventoryList({
      ...InventoryList,
      sliderValue: e.target.value,
    });
  };

  const handleItemIdChange = (newUUID) => {
    updateInventoryList({
      ...InventoryList,
      itemId: newUUID,
    });
  };

  const saveChange = async (e) => {
    e.preventDefault();
    try {
      const res = await addDoc(collection(appDB, "Products"), {
        itemId: InventoryList.itemId,
        name: InventoryList.name,
        image: InventoryList.image,
        description: InventoryList.description,
        brand: InventoryList.brand,
        category: InventoryList.category,
        price: InventoryList.price,
        countInStock: InventoryList.countInStock,
        rating: InventoryList.rating,
        totalReviews: InventoryList.totalReviews,
        sliderValue: InventoryList.sliderValue,
        discount: InventoryList.discount,
      });
      // localStorage.setItem("InventoryList", JSON.stringify(InventoryList));
      alert("Data is successfully saved");
      console.log(res);
      if (res) {
        alert("Data exported to Firestore");
      }
    } catch (err) {
      alert("Data not exported to Firestore");
      console.log(err.code);
      console.error("Firestore error:", err);
    }
  };

  // useEffect(() => {
  //   const storedInventoryList = localStorage.getItem("InventoryList");

  //   if (storedInventoryList) {
  //     updateInventoryList(JSON.parse(storedInventoryList));
  //   }
  // }, []);

  return (
    <section className="admin">
      <h1>Welcome to Store Inventory</h1>
      <h2>Enter Product Listing Details</h2>
      <form className="inventory-details" onSubmit={saveChange}>
        <label htmlFor="itemId"></label>
        <input
          type="text"
          id="itemId"
          value={generateUUID}
          onChange={((e) => setGenerateUUID(e.target.value), handleChange)}
          placeholder="Random ID"
        />
        <button
          type="button"
          className="gen-id"
          onClick={async (e) => {
            const newUUID = await generateUniqueID(e);
            handleItemIdChange(newUUID);
          }}
        >
          Generate Unique ID
        </button>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={InventoryList.name}
          onChange={handleChange}
          placeholder="name"
        />
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          value={InventoryList.image}
          onChange={handleChange}
          placeholder="imageURL"
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={InventoryList.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          id="brand"
          value={InventoryList.brand}
          onChange={handleChange}
          placeholder="Brand"
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          value={InventoryList.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={InventoryList.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <label htmlFor="countInStock">Count In Stock</label>
        <input
          type="number"
          id="countInStock"
          value={InventoryList.countInStock}
          onChange={handleChange}
          placeholder="Count In Stock"
        />
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          value={InventoryList.rating}
          onChange={handleChange}
          placeholder="Rating"
        />
        <label htmlFor="reviews">Reviews</label>
        <input
          type="number"
          id="totalReviews"
          value={InventoryList.totalReviews}
          onChange={handleChange}
          placeholder="Total Reviews"
        />
        <div className="radio">
          <label htmlFor="radio-for">sliderValue</label>
          <input
            id="radio-true"
            type="radio"
            value="true"
            name="sliderValue"
            checked={InventoryList.sliderValue === "true"}
            onChange={handleSliderChange}
          />
          True
          <input
            id="radio-false"
            type="radio"
            value="false"
            name="sliderValue"
            checked={InventoryList.sliderValue === "false"}
            onChange={handleSliderChange}
          />
          False
        </div>
        <label htmlFor="discount">Discount</label>
        <input
          type="text"
          id="discount"
          value={InventoryList.discount}
          onChange={handleChange}
          placeholder="discount"
        />
        <button type="submit" className="add-db">
          Add To DB
        </button>
      </form>
    </section>
  );
};

export default Admin;
