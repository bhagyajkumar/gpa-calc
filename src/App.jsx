import { useState } from 'react'
import './App.css'

function App() {
  const [numSubjects, setNumSubjects] = useState(0)
  const [subjects, setSubjects] = useState([])
  const grades = ['S', 'A', 'B', 'C', 'D', 'F']
  const gradeScores = { 'S': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'F': 0 }

  const handleSubjectChange = (idx, field, value) => {
    const newSubjects = [...subjects]
    newSubjects[idx] = { ...newSubjects[idx], [field]: value }
    setSubjects(newSubjects)
  }

  const handleNumSubjectsChange = (num) => {
    const newSubjects = Array(num).fill().map((_, idx) => ({
      subject: subjects[idx]?.subject || '',
      credits: subjects[idx]?.credits || '',
      grade: subjects[idx]?.grade || 'F'
    }))
    setNumSubjects(num)
    setSubjects(newSubjects)
  }

  const calculateGPA = () => {
    let totalCredits = 0
    let totalPoints = 0

    subjects.forEach(subject => {
      const credits = parseFloat(subject.credits) || 0
      const grade = subject.grade || 'F'
      const score = gradeScores[grade]

      totalCredits += credits
      totalPoints += credits * score
    })

    return totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0
  }

  return (
    <>
      <label>Number of subjects: </label>
      <input 
        type="number" 
        value={numSubjects} 
        onChange={(e) => handleNumSubjectsChange(Number(e.target.value))}
      />
      {numSubjects > 0 && (
        <table>
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Total Credits</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(Array(numSubjects).keys()).map((idx) => (
              <tr key={idx}>
                <td>
                  <input 
                    type="text" 
                    placeholder={`Subject ${idx + 1}`} 
                    value={subjects[idx]?.subject || ''} 
                    onChange={(e) => handleSubjectChange(idx, 'subject', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    min="0" 
                    placeholder="Credits" 
                    value={subjects[idx]?.credits || ''} 
                    onChange={(e) => handleSubjectChange(idx, 'credits', e.target.value)}
                  />
                </td>
                <td>
                  <select 
                    value={subjects[idx]?.grade || 'F'} 
                    onChange={(e) => handleSubjectChange(idx, 'grade', e.target.value)}
                  >
                    {grades.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {numSubjects > 0 && (
        <div>
          <h2>GPA: {calculateGPA()}</h2>
        </div>
      )}
    </>
  )
}

export default App
