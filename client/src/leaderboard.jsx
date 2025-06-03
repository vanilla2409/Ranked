import React, { useEffect, useState } from "react";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPlayers: 0,
    playersPerPage: 10
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/leaderboard?page=${page}&limit=10`);
        const result = await response.json();
        
        if (result.success === "true") {
          setLeaders(result.data);
          setPagination(result.pagination);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
    
    fetchData();
  }, [page]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      
      {leaders.length === 0 ? (
        <p>No players found</p>
      ) : (
        <>
          <ul className="space-y-2">
            {leaders.map(user => (
              <li key={user.userId} className="p-2 border rounded bg-white shadow">
                #{user.rank} - {user.userId} ({user.rating})
              </li>
            ))}
          </ul>
          
          <div className="mt-4 flex gap-2 items-center">
            <button 
              onClick={() => setPage(p => Math.max(p - 1, 1))} 
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Prev
            </button>
            
            <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
            
            <button 
              onClick={() => setPage(p => p + 1)} 
              disabled={page === pagination.totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}