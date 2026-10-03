import { useEffect, useState } from "react";
import API from "../services/api";

function BorrowRecords() {
  const [records, setRecords] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [record, setRecord] = useState({
    bookId: "",
    memberId: "",
    borrowDate: "",
    returnDate: "",
    status: "Borrowed",
  });

  const loadData = async () => {
    const recordsRes = await API.get("/borrowrecords");
    const booksRes = await API.get("/books");
    const membersRes = await API.get("/members");

    setRecords(recordsRes.data);
    setBooks(booksRes.data);
    setMembers(membersRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setRecord({
      bookId: "",
      memberId: "",
      borrowDate: "",
      returnDate: "",
      status: "Borrowed",
    });

    setEditId(null);
    setShowForm(false);
  };

  const saveRecord = async (e) => {
    e.preventDefault();

    const data = {
      bookId: Number(record.bookId),
      memberId: Number(record.memberId),
      borrowDate: record.borrowDate,
      returnDate: record.returnDate,
      status: record.status,
    };

    if (editId === null) {
      await API.post("/borrowrecords", data);
    } else {
      await API.put(`/borrowrecords/${editId}`, data);
    }

    await loadData();
    resetForm();
  };

  const editRecord = (selectedRecord) => {
    setRecord({
      bookId: selectedRecord.bookId,
      memberId: selectedRecord.memberId,
      borrowDate: selectedRecord.borrowDate?.substring(0, 10),
      returnDate: selectedRecord.returnDate?.substring(0, 10),
      status: selectedRecord.status,
    });

    setEditId(selectedRecord.borrowRecordsId);
    setShowForm(true);
  };

  const deleteRecord = async (id) => {
    await API.delete(`/borrowrecords/${id}`);
    await loadData();
  };

  return (
    <>
      {!showForm ? (
        <div className="page-card">
          <div className="page-header">
            <h3>Borrow Records</h3>

            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setShowForm(true)}
            >
              <i className="bi bi-plus"></i> Add Record
            </button>
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
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r, index) => (
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
                  <td>
                    <button
                      className="btn-edit"
                      type="button"
                      onClick={() => editRecord(r)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>

                    <button
                      className="btn-delete"
                      type="button"
                      onClick={() => deleteRecord(r.borrowRecordsId)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="page-card">
          <h3>{editId === null ? "Add Borrow Record" : "Edit Borrow Record"}</h3>

          <form onSubmit={saveRecord} className="form-grid">
            <div>
              <label>Book</label>
              <select
                name="bookId"
                value={record.bookId}
                onChange={handleChange}
                required
              >
                <option value="">Select Book</option>

                {books.map((b) => (
                  <option key={b.bookId} value={b.bookId}>
                    {b.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Member</label>
              <select
                name="memberId"
                value={record.memberId}
                onChange={handleChange}
                required
              >
                <option value="">Select Member</option>

                {members.map((m) => (
                  <option key={m.memberId} value={m.memberId}>
                    {m.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Borrow Date</label>
              <input
                type="date"
                name="borrowDate"
                value={record.borrowDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Return Date</label>
              <input
                type="date"
                name="returnDate"
                value={record.returnDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Status</label>
              <select name="status" value={record.status} onChange={handleChange}>
                <option>Borrowed</option>
                <option>Returned</option>
              </select>
            </div>

            <div className="form-buttons">
              <button className="btn btn-primary" type="submit">
                Save
              </button>

              <button className="btn btn-light" type="button" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default BorrowRecords;