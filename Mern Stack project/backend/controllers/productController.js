const db = require("../config/db");

exports.getProducts = (req, res) => {
  db.query(
    "SELECT id, name, price, category, deleted_at FROM products WHERE deleted_at IS NULL",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

exports.addProduct = (req, res) => {
  const { name, price, category } = req.body;

  db.query(
    "INSERT INTO products (name, price, category) VALUES (?, ?, ?)",
    [name, price, category],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product Added" });
    }
  );
};

exports.updateProduct = (req, res) => {
  const { name, price, category } = req.body;

  db.query(
    "UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?",
    [name, price, category, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product Updated" });
    }
  );
};

exports.deleteProduct = (req, res) => {
  db.query(
    "UPDATE products SET deleted_at = NOW() WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product Soft Deleted" });
    }
  );
};

exports.restoreProduct = (req, res) => {
  db.query(
    "UPDATE products SET deleted_at = NULL WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Product Restored" });
    }
  );
};

exports.getDeletedProducts = (req, res) => {
  db.query(
    "SELECT * FROM products WHERE deleted_at IS NOT NULL",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

