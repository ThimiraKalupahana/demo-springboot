import { useEffect, useState } from "react";

const emptyForm = { name: "", description: "", price: "", quantity: "" };

export default function ProductForm({ editingProduct, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        description: editingProduct.description || "",
        price: editingProduct.price,
        quantity: editingProduct.quantity,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity, 10),
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        step="0.01"
        min="0"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        name="quantity"
        type="number"
        min="0"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        required
      />
      <div className="form-actions">
        <button type="submit">{editingProduct ? "Update" : "Add"}</button>
        {editingProduct && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
