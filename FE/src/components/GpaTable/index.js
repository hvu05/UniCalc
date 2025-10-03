import { useState } from "react"
import "./GpaTable.scss" // File CSS tùy chọn để styling
import useGetAllGrade from "../../func/getAllGrade"
import axios from "axios"
import { URL_BASE_API } from "../../constants"
import { message } from "antd"
import { Modal } from 'antd';
import { showMessage } from "../Message"

const { confirm } = Modal;

const GpaTable = ({ refresh, setRefresh }) => {
  const { grades, loading } = useGetAllGrade(refresh)

  const [editingId, setEditingId] = useState({})
  const [editValues, setEditValues] = useState({credit: 0, grade4: 0, grade10: 0, subjectName: ''})
  const [loadingSave, setLoadingSave] = useState(false)

  const [subject, setSubject] = useState({ name: '', credit: '' })
  const [grade, setGrade] = useState({ grade4: 4, grade10: null })
  const [isAdding, setIsAdding] = useState(false)
  const [activeSemesterId, setActiveSemesterId] = useState(null)

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${URL_BASE_API}/grade/${_id}`, {
        withCredentials: true
      })
      setRefresh(prev => !prev)
      message.success('Xóa môn học thành công!')
    } catch (err) {
      message.error('Delete a subject FAILED')
    }
  }

  const handleEdit = (subject) => {
    setEditingId({ gradeId: subject._id, subjectId: subject.subjectId._id })
    setEditValues({
      grade4: subject.grade4,
      grade10: subject.grade10,
      credit: subject.subjectId.credit,
      subjectName: subject.subjectId.subjectName
    })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setEditValues(prev => ({ ...prev, [name]: value }))
  }
  const handleSave = async (gradeId, subjectId) => {
    setLoadingSave(true)
    try {
      // if(editValues.credit) {
      //   const num = Number(editValues.credit)
      //   const creditFix = Number(num.toFixed(0))
      //   console.log('credit', creditFix)
      //   setEditValues(prev => ({ ...prev, credit: creditFix}))
      // }
      await axios.put(`${URL_BASE_API}/grade`, {
        _id: gradeId,
        grade4: editValues.grade4,
        grade10: editValues.grade10
      }, {
        withCredentials: true
      })
      await axios.put(`${URL_BASE_API}/subject`, {
        idSubject: subjectId,
        subjectName: editValues.subjectName,
        credit: Number(editValues.credit).toFixed(0)
      }, {
        withCredentials: true
      })
      setEditingId({ gradeId: 0 });
      setEditValues({});
      setRefresh(prev => !prev);
      showMessage('Cập nhập điểm thành công')

      showMessage('Cập nhật điểm thành công', 'success');
    } catch (err) {
      showMessage('Cập nhật điểm thất bại', 'error');
    } finally {
      setLoadingSave(false);
    }
  }
  const HandleSaveAddSubject = async (e, idSemester) => {
    e.preventDefault()
    try {
      const submitSubject = await axios.post(`${URL_BASE_API}/subject`, {
        subjectName: subject.name,
        credit: Number(subject.credit).toFixed(0)
      }, {
        withCredentials: true
      })
      await axios.post(`${URL_BASE_API}/grade`, {
        subjectId: submitSubject.data.data._id,
        semesterId: idSemester,
        grade10: Number(grade.grade10),
        grade4: Number(grade.grade4)
      }, {
        withCredentials: true
      })
      setSubject({ name: "", credit: '' })
      setGrade({ grade4: 4, grade10: '' })
      setRefresh(!refresh)
      showMessage('Thêm môn học thành công', 'success')
    } catch (err) {
      showMessage('Thêm môn học thất bại, vui lòng thử lại', 'error')
    }
  }
  return (
    <div className="gpa-table-container">


      {loading && <p>Loading ...</p>}
      {!loading &&
        <div className="overall-container">
          <div className="overallGpa">Điểm TBTL: <span>{grades.overallGPA}</span></div>
          <div className="totalCredit">Tổng TCTL: <span>{grades.totalCredit}</span></div>
        </div>
      }

      {!loading && grades.gradesBySemester.map((semester) => (
        <div key={semester.semesterId} className="semester-table-wrapper">
          <div className="semester-table-wrapper__header">
            <h3>{semester.semesterName}</h3>
            <button
              onClick={() => {
                setIsAdding(true);
                setActiveSemesterId(semester.semesterId);
              }}
              className="btn-addSubject">Thêm môn học</button>
          </div>
          {isAdding && (
            <div className="overlay">
              <div className="modal">
                <h3>Thêm môn học mới</h3>
                <div className="form-group">
                  <label>Tên môn học</label>
                  <input
                    required
                    name="subjectName"
                    value={subject.name}
                    onChange={(e) => setSubject({ ...subject, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Tín chỉ</label>
                  <input
                    required
                    name="credit"
                    type="number"
                    value={subject.credit}
                    onChange={(e) => setSubject({ ...subject, credit: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Điểm thang 4</label>
                  <input
                    required
                    name="grade4"
                    type="number"
                    step={0.5}
                    max={4}
                    min={0}
                    value={grade.grade4}
                    onChange={(e) => setGrade({ ...grade, grade4: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Điểm thang 10</label>
                  <input
                    required
                    name="grade10"
                    type="number"
                    step="0.01"
                    max={10}
                    min={0}
                    value={grade.grade10}
                    onChange={(e) => setGrade({ ...grade, grade10: e.target.value })}
                  />
                </div>

                <div className="btn-actions">
                  <button
                    className="save-btn"
                    onClick={(e) => {
                      HandleSaveAddSubject(e, activeSemesterId);
                      setIsAdding(false);
                      setActiveSemesterId(null);
                    }}
                  >
                    Lưu
                  </button>
                  <button className="cancel-btn" onClick={() => setIsAdding(false)}>
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
          {semester.subjects.length === 0 && <p>Chưa có môn học</p>}
          {semester.subjects.length > 0 &&
            <>
              <table className="gpa-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên môn học</th>
                    <th>Tín chỉ</th>
                    <th>Thang 4</th>
                    <th>Thang 10</th>
                    <th>Điểm chữ</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {semester.subjects.length > 0 && semester.subjects.map((subject, subjectIndex) => (
                    <tr key={subject._id}>
                      <td>{subjectIndex + 1}</td>

                      {editingId.gradeId === subject._id ? (
                        <>
                          <td>
                            <input
                              name="subjectName"
                              value={editValues.subjectName}
                              onChange={handleChange}
                              className="input-subject-name"
                            />
                          </td>
                          <td>
                            <input
                              name="credit"
                              value={editValues.credit}
                              onChange={handleChange}
                              type="number"
                            />
                          </td>
                          <td>
                            <input
                              name="grade4"
                              value={editValues.grade4}
                              onChange={handleChange}
                              type="number"
                              step={0.5}
                              max={4}
                              min={0}
                            />
                          </td>
                          <td>
                            <input
                              name="grade10"
                              value={editValues.grade10}
                              onChange={handleChange}
                              max={10}
                              min={0}
                              step='0.01'
                              type="number"
                            />
                          </td>
                          <td>{subject.gradeChar}</td>
                          <td>

                            <button className="action-btn cancel-btn" onClick={() => setEditingId({ gradeId: 0 })}>Hủy</button>
                            <button
                              onClick={() => handleSave(subject._id, subject.subjectId._id)}
                              className="action-btn save-btn"
                            >
                              {loadingSave ? "Đang lưu..." : "Lưu"}
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{subject.subjectId.subjectName}</td>
                          <td>{subject.subjectId.credit}</td>
                          <td>{Number(subject.grade4).toFixed(1)}</td>
                          <td>{Number(subject.grade10).toFixed(2)}</td>
                          <td>{subject.gradeChar}</td>

                          <td>
                            <button
                              className="action-btn edit-btn"
                              onClick={() => handleEdit(subject)}
                            >
                              Sửa
                            </button>
                            <button
                              className="action-btn delete-btn"
                              onClick={(e) => handleDelete(subject._id)}
                            >
                              Xóa
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}

                </tbody>
              </table>
              <p>
                GPA: {semester.gpa}; Tổng tín chỉ: {semester.totalCredits}
              </p>
              <div className="divider"></div>
            </>

          }

        </div>
      ))}
    </div>
  );
};

export default GpaTable;