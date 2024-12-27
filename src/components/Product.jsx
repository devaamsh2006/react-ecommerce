import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHeart } from "react-icons/fi";
import { useContext } from 'react';
import { userValid } from '../contexts/User';
import { WishItemsList } from '../contexts/Wishitems';

function Product() {
  const { usernow } = useContext(userValid);
  const { wishitems, setwishitems } = useContext(WishItemsList);
  const navigate = useNavigate();
  const obj = useLocation();
  const [element] = useState(obj.state);
  const [clicked, setClicked] = useState(false);
  const [qty, setQty] = useState(0);
  const [mistake, setMistake] = useState(null);

  useEffect(() => {
    const existingItem = wishitems.find((item) => item.title === element.title);
    if (existingItem) {
      setClicked(true);
      setQty(existingItem.quantity);
    }
  }, [wishitems, element]);

  function handleArrow() {
    navigate('/');
  }

  function addWishlist() {
    if (Object.keys(usernow).length === 0) {
      navigate('/login');
      return;
    }
    const newWishlistItem = { ...element, id: String(element.id), userId: usernow.id, quantity: 1 };
    fetch('http://localhost:3000/wishlist', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWishlistItem),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add item to wishlist");
        }
        return res.json();
      })
      .then(() => {
        setClicked(true);
        setQty(1);
        setwishitems((prev) => [...prev, newWishlistItem]);
      })
      .catch((err) => setMistake(err.message));
  }

  function removeWishlist() {
    fetch(`http://localhost:3000/wishlist/${element.id}?userId=${usernow.id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to remove item from wishlist");
        }
        return res.json();
      })
      .then(() => {
        setClicked(false);
        setQty(0);
        setwishitems((prev) => prev.filter((item) => item.title !== element.title));
      })
      .catch((err) => setMistake(err.message));
  }

  function updateWishlistQuantity(newQty) {
    const updatedItem = { ...element, id: String(element.id), userId: usernow.id, quantity: newQty };
    fetch(`http://localhost:3000/wishlist/${updatedItem.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update item quantity");
        }
        return res.json();
      })
      .then(() => {
        setwishitems((prev) =>
          prev.map((item) =>
            item.title === element.title ? { ...item, quantity: newQty } : item
          )
        );
      })
      .catch((err) => setMistake(err.message));
  }

  function handleAddQty() {
    const newQty = qty + 1;
    setQty(newQty);
    updateWishlistQuantity(newQty);
  }

  function handleDelQty() {
    if (qty > 0) {
      const newQty = qty - 1;
      setQty(newQty);
      if (newQty === 0) {
        removeWishlist();
      } else {
        updateWishlistQuantity(newQty);
      }
    }
  }

  return (
    <div className='m-5'>
      <div
        key={element.id}
        className='my-5 p-8 relative transition group shadow-2xl shadow-slate-800/80 bg-slate-800 text-white rounded-xl flex flex-row overflow-hidden items-center'
      >
        <FiArrowLeft
          className='absolute top-3 left-3 scale-125 cursor-pointer hover:scale-150'
          onClick={handleArrow}
        />
        <img src={element.images[0]} className='w-80 rounded-xl' />
        <div className="flex flex-wrap flex-col gap-16 m-16">
          {mistake && <p className="text-red-500">{mistake}</p>}
          <p className='font-bold'>{element.title}</p>
          <p className='font-medium'>Price: ${element.price}</p>
          <p className='font-medium'>{element.description}</p>
          <p className='font-medium uppercase'>Category: {element.category.name}</p>
          <div className='flex gap-4'>
            {qty > 0 && clicked ? (
              <div className='flex gap-3 border-2 border-white w-20 justify-center rounded-lg p-3'>
                <button onClick={handleDelQty}>-</button>
                <p>{qty}</p>
                <button onClick={handleAddQty}>+</button>
              </div>
            ) : (
              <div
                onClick={addWishlist}
                className='flex flex-row gap-1 bg-white text-slate-800 w-52 cursor-pointer p-3 justify-center items-center rounded-lg'
              >
                <button>Add to Wishlist</button>
                <FiHeart />
              </div>
            )}
            {clicked && qty > 0 && (
              <div
                onClick={removeWishlist}
                className='flex flex-row gap-1 bg-slate-800 text-white border-2 border-white w-52 cursor-pointer p-3 justify-center items-center rounded-lg'
              >
                <button>Remove from Wishlist</button>
                <FiHeart />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
