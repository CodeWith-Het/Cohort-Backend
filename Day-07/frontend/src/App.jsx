import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/menu";

function App() {
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({
    item_name: "",
    price: "",
    discount_Price: "",
    image: "",
  });
    
  const fetchMenu = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setMenu(data.menuItemFetch);
  };

  // 🔹 Add Menu
  const addMenu = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        discount_Price: Number(form.discount_Price),
      }),
    });

    setForm({
      item_name: "",
      price: "",
      discount_Price: "",
      image: "",
    });

    fetchMenu();
  };

  // 🔹 Delete Menu
  const deleteMenu = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchMenu();
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Menu Management</h2>

      <input
        placeholder="Item Name"
        value={form.item_name}
        onChange={(e) => setForm({ ...form, item_name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        type="number"
        placeholder="Discount Price"
        value={form.discount_Price}
        onChange={(e) => setForm({ ...form, discount_Price: e.target.value })}
      />

      <input
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <br />
      <button onClick={addMenu}>Add Menu</button>

      <hr />

      <h2>Menu List</h2>

      {menu.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{item.item_name}</h3>
          <p>Price: ₹{item.price}</p>
          <p>Discount: ₹{item.discount_Price}</p>

          <button onClick={() => deleteMenu(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
