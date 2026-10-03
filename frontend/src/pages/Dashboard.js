import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState({
    totalBooks: 0,
    totalMembers: 0,
    borrowedBooks: 0,
    returnedBooks: 0,
    recentBorrowRecords: [],
  });

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    const res = await API.get("/dashboard");
    setData(res.data);
  };

  return (
    <>
      <h2 className="mb-4">Library Dashboard</h2>

      <div className="row">
        <div className="col-md-3">
          <div className="dash-card">
            <i className="bi bi-book"></i>
            <div>
              <p>Total Books</p>
              <h3>{data.totalBooks}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dash-card">
            <i className="bi bi-people"></i>
            <div>
              <p>Total Members</p>
              <h3>{data.totalMembers}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dash-card">
            <i className="bi bi-journal-arrow-down"></i>
            <div>
              <p>Borrowed Books</p>
              <h3>{data.borrowedBooks}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dash-card">
            <i className="bi bi-check-circle"></i>
            <div>
              <p>Returned Books</p>
              <h3>{data.returnedBooks}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="page-card mt-4">
        <div className="page-header">
          <h3>Recent Borrow Records</h3>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Book</th>
              <th>Member</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.recentBorrowRecords.map((r, index) => (
              <tr key={r.borrowRecordsId}>
                <td>{index + 1}</td>
                <td>{r.book?.title}</td>
                <td>{r.member?.fullName}</td>
                <td>{r.borrowDate?.substring(0, 10)}</td>
                <td>{r.returnDate?.substring(0, 10)}</td>
                <td>
                  <span
                    className={
                      r.status === "Returned" ? "badge-green" : "badge-red"
                    }
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;