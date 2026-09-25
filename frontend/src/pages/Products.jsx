import { useEffect, useState } from "react";
import * as productApi from "../api/productApi";
import ProductForm from "../components/ProductForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      const { data } = await productApi.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (product) => {
    try {
      if (editingProduct) {
        await productApi.updateProduct(editingProduct.id, product);
      } else {
        await productApi.createProduct(product);
      }
      setEditingProduct(null);
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await productApi.deleteProduct(id);
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="products-page">
      <header>
        <h1>Products</h1>
        <div>
          <span>Signed in as {username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {error && <p className="error">{error}</p>}

      <ProductForm
        editingProduct={editingProduct}
        onSubmit={handleSubmit}
        onCancel={() => setEditingProduct(null)}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <button onClick={() => setEditingProduct(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
