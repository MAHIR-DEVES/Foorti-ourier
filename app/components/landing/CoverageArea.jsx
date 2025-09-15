'use client';
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FiDownload } from 'react-icons/fi';
import axios from 'axios';

const DeliveryTable = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MERCHANT_API_KEY}/distList`
        );
        if (response.data.Status) {
          setDistricts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
  }, []);

  const handleDownload = () => {
    const headers = ['ID', 'Name', 'Bangla Name', 'Zone ID', 'Inside'];
    const rows = districts.map(d => [
      d.id,
      d.name,
      d.bn_name,
      d.zone_id,
      d.inside,
    ]);

    const csvContent =
      '\uFEFF' +
      [headers, ...rows]
        .map(row =>
          row
            .map(String)
            .map(v => `"${v}"`)
            .join(',')
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'districts.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = districts.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(districts.length / rowsPerPage);

  console.log(currentRows);

  return (
    <div className=" container mx-auto px-4 mt-20 md:mt-28">
      <h2 className="text-xl font-semibold mb-4">District List </h2>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <select className="border px-3 py-2 rounded text-sm">
            <option value="">Inside Dhaka</option>
          </select>

          <div className="ml-2 relative">
            <input
              type="text"
              placeholder="Area or District"
              className="border pl-9 pr-3 py-2 rounded text-sm outline-none"
            />
            <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 cursor-pointer bg-gray-100  border border-gray px-4 py-2 rounded"
        >
          <FiDownload className="text-base" />
          Download
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto border rounded">
            <table className="min-w-full text-sm table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">ID</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Bangla Name</th>
                  <th className="p-3 border">Zone ID</th>
                  <th className="p-3 border">Inside</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{item.id}</td>
                    <td className="p-3 border">{item.name}</td>
                    <td className="p-3 border">{item.bn_name}</td>
                    <td className="p-3 border">{item.zone_id}</td>
                    <td className="p-3 border">{item.inside ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end items-center mt-4 text-sm">
            <div className="space-x-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                className="px-3 py-1 border outline-none cursor-pointer rounded"
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page
                      ? 'button-primary cursor-pointer text-white'
                      : ''
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                className="px-3 py-1 border outline-none cursor-pointer rounded"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeliveryTable;
