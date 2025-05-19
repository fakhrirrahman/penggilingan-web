import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Layanan = () => {
  const [layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLayanan = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/layanan");
        setLayanan(response.data.data || []);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchLayanan();
  }, []);

  const filteredData = layanan.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    // TODO: Implement edit functionality, misal navigasi ke halaman edit atau buka modal
    alert(`Edit layanan dengan ID: ${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus layanan ini?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8000/api/layanan/${id}`);
      // Setelah delete berhasil, refresh data layanan
      setLayanan(layanan.filter((item) => item.id !== id));
    } catch (err) {
      alert("Gagal menghapus layanan: " + (err.message || ""));
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r border-gray-300">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Tabel Layanan
        </h2>

        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Cari layanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-20">Memuat data...</div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>Error: {error}</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            Tidak ada data yang cocok.
          </div>
        ) : (
          <div className="overflow-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="text-left py-3 px-6">#</th>
                  <th className="text-left py-3 px-6">Nama</th>
                  <th className="text-left py-3 px-6">Deskripsi</th>
                  <th className="text-left py-3 px-6">Gambar</th>
                  <th className="text-left py-3 px-6">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition duration-150"
                  >
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6 font-medium">{item.nama}</td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {item.deskripsi}
                    </td>
                    <td className="py-3 px-6">
                      <img
                        src={`http://localhost:8000/${item.gambar}`}
                        alt={item.nama}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-6 space-x-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                      >
                        Hapus
                      </button>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded text-sm">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Layanan;
