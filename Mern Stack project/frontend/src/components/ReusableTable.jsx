import { useState } from "react";

const ReusableTable = ({
  columns,
  data,
  mode, 
  onEdit,
  onDelete,
  onRestore,
}) => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

 
  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

 
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;

    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="card p-3 mb-4">
      {/* 🔹 SEARCH */}
      <input
        className="form-control mb-3"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ cursor: col.sortable ? "pointer" : "default" }}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                {col.label} {col.sortable && "↕"}
              </th>
            ))}
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center">
                No data found
              </td>
            </tr>
          ) : (
            sortedData.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}

                <td>
                  {mode === "ACTIVE" && (
                    <>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => onEdit(row)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(row.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {mode === "DELETED" && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => onRestore(row.id)}
                    >
                      Restore
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
