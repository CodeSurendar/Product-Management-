import { useEffect, useState } from "react";
import axios from "axios";
import ReusableTable from "../components/ReusableTable";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);


  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");


  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "NAME", sortable: true },
    { key: "price", label: "PRICE", sortable: true },
    { key: "category", label: "CATEGORY", sortable: true },
  ];

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  
  const fetchDeletedProducts = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/products/deleted"
    );
    setDeletedProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchDeletedProducts();
  }, []);

  
  const editProduct = (product) => {
    setId(product.id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
  };

 
  const submitProduct = async () => {
    if (!name || !price || !category) {
      alert("All fields required");
      return;
    }

    if (id) {
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        name,
        price,
        category,
      });
    } else {
      await axios.post("http://localhost:5000/api/products", {
        name,
        price,
        category,
      });
    }

   
    setId(null);
    setName("");
    setPrice("");
    setCategory("");

    fetchProducts();
  };

 
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
    fetchDeletedProducts();
  };

 
  const restoreProduct = async (id) => {
    await axios.put(
      `http://localhost:5000/api/products/restore/${id}`
    );
    fetchProducts();
    fetchDeletedProducts();
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Product Management</h3>

    
      <div className="card p-3 mb-4">
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button className="btn btn-primary" onClick={submitProduct}>
          {id ? "Update Product" : "Add Product"}
        </button>
      </div>

      
      <h5>Active Products</h5>
      <ReusableTable
        columns={columns}
        data={products}
        mode="ACTIVE"
        onEdit={editProduct}
        onDelete={deleteProduct}
      />

      
      <h5 className="mt-5">Deleted Products</h5>
      <ReusableTable
        columns={columns}
        data={deletedProducts}
        mode="DELETED"
        onRestore={restoreProduct}
      />
    </div>
  );
};

export default Products;
