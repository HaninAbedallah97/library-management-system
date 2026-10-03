import { useEffect, useState } from "react";
import API from "../services/api";

function Members() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [member, setMember] = useState({
    fullName: "",
    email: "",
    phone: "",
    joinDate: "",
  });

  const getMembers = async () => {
    const res = await API.get("/members");
    setMembers(res.data);
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setMember({
      fullName: "",
      email: "",
      phone: "",
      joinDate: "",
    });
    setEditId(null);
    setShowForm(false);
  };

  const saveMember = async (e) => {
    e.preventDefault();

    if (editId === null) {
      await API.post("/members", member);
    } else {
      await API.put(`/members/${editId}`, member);
    }

    await getMembers();
    resetForm();
  };

  const editMember = (selectedMember) => {
    setMember({
      fullName: selectedMember.fullName,
      email: selectedMember.email,
      phone: selectedMember.phone,
      joinDate: selectedMember.joinDate?.substring(0, 10),
    });

    setEditId(selectedMember.memberId);
    setShowForm(true);
  };

  const deleteMember = async (id) => {
    await API.delete(`/members/${id}`);
    await getMembers();
  };

  return (
    <>
      {!showForm ? (
        <div className="page-card">
          <div className="page-header">
            <h3>Members</h3>

            <button className="btn btn-primary" type="button" onClick={() => setShowForm(true)}>
              <i className="bi bi-plus"></i> Add Member
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {members.map((m, index) => (
                <tr key={m.memberId}>
                  <td>{index + 1}</td>
                  <td>{m.fullName}</td>
                  <td>{m.email}</td>
                  <td>{m.phone}</td>
                  <td>{m.joinDate?.substring(0, 10)}</td>
                  <td>
                    <button className="btn-edit" type="button" onClick={() => editMember(m)}>
                      <i className="bi bi-pencil-fill"></i>
                    </button>

                    <button className="btn-delete" type="button" onClick={() => deleteMember(m.memberId)}>
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
          <h3>{editId === null ? "Add Member" : "Edit Member"}</h3>

          <form onSubmit={saveMember} className="form-grid">
            <div>
              <label>Full Name</label>
              <input name="fullName" value={member.fullName} onChange={handleChange} required />
            </div>

            <div>
              <label>Email</label>
              <input name="email" value={member.email} onChange={handleChange} />
            </div>

            <div>
              <label>Phone</label>
              <input name="phone" value={member.phone} onChange={handleChange} />
            </div>

            <div>
              <label>Join Date</label>
              <input type="date" name="joinDate" value={member.joinDate} onChange={handleChange} required />
            </div>

            <div className="form-buttons">
              <button className="btn btn-primary" type="submit">Save</button>
              <button className="btn btn-light" type="button" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Members;