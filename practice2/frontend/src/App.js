import {useState, useEffect} from 'react';

function App(){
  const [students, setStudents]= useState([]);
  const [name, setName]=useState("");
  const [subject, setSubject]=useState("");
  const [marks, setMarks]=useState("");

  //fetch all student on load
  useEffect(()=>{
    fetchStudents();
  },[]);

  const fetchStudents=()=>{
    fetch("http://localhost:5000/api/students")
    .then(res=>res.json())
    .then(data=>setStudents(data));
  };

  // add new student
  const addStudent=()=>{
    if(!name|| !subject || !marks) return alert("file all fields");

    fetch("http://localhost:5000/api/students",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,subject,marks})
    })
    .then(res=> res.json())
    .then(()=>{
      fetchStudents();
      setName("");
      setSubject("");
      setMarks("");
    });
  };

//delete student
const deleteStudent=(id)=>{
  fetch(`http://localhost:5000/api/students/${id}`,{
    method:"DELETE"
  }).then(()=>fetchStudents());
};
return(
  <div style={{ padding: "20px", fontFamily: "Arial" }}>
    <h1>Student Marks Manager</h1>
    {/* Add Student Form */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Add Student</h2>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          placeholder="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          placeholder="Marks"
          value={marks}
          onChange={e => setMarks(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={addStudent} style={{ padding: "5px 15px" }}>
          Add
        </button>
        </div>
        
        {/* Students Table */}
      <h2>All Students</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.subject}</td>
              <td>{s.marks}</td>
              <td>
                <button onClick={() => deleteStudent(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
  </div>
);
}
export default App;