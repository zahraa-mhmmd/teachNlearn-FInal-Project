import React from 'react';
import '../Form/Form.scss';
import Button from '../../../Button/Button';
import AuthInput from '../Form/AuthInput/AuthInput';
import AuthSelect from '../Form/AuthSelect/AuthSelect';
import languages from '../Form/languages';

const StepThree = ({
  formState,
  onValueChange,
  handleAddClick,
  handleRemoveClick,
  onArrValueChange,
  handleLanguages,
  onInput,
  handleAddLanguage,
}) => {
  const { isTeacher } = formState;
  const academicLevels = ['primary', 'secondary', 'highschool', 'undergraduate', 'graduate'];

  const studentSignup = (
    <>
      <h3>Student Information</h3>
      <p>Please provide your details below</p>
  
      <h3>Education</h3>
  
      {formState.education.map((edu, i) => {
        return (
          <div key={i}>
            <AuthInput
              name="educationName"
              value={edu.name}
              placeholder="School/University Name"
              type="text"
              maxLength="255"
              icon="school"
              onValueChange={e => onArrValueChange(e, 'education', i, 'name')}
              dataCypress={`educationName-${i}`}
            />
            <AuthInput
              name="educationDepartment"
              value={edu.department}
              placeholder="Department"
              type="text"
              maxLength="255"
              icon="department"
              onValueChange={e => onArrValueChange(e, 'education', i, 'department')}
              dataCypress={`educationDepartment-${i}`}
            />
            <AuthInput
            name="educationGradeLevel"
            value={edu.gradeLevel}
            placeholder="Grade Level"
            type="text"
            maxLength="255"
            icon="grade"
            onValueChange={e => onArrValueChange(e, 'education', i, 'gradeLevel')}
            dataCypress={`educationGradeLevel-${i}`}
          />
            <AuthInput
              name="educationNotes"
              value={edu.notes}
              placeholder="Notes"
              type="text"
              maxLength="1000"
              icon="notes"
              onValueChange={e => onArrValueChange(e, 'education', i, 'notes')}
              dataCypress={`educationNotes-${i}`}
            />
            <div className="btn-box">
              {formState.education.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('education', i)}
                  icon="minus"
                  color="mid"
                  dataCypress={`educationMinus-${i}`}
                />
              )}
              {formState.education.length - 1 === i && (
                <Button
                  onClick={() =>
                    formState.education[i].name !== '' &&
                    handleAddClick('education', { name: '', department: '', notes: '' })
                  }
                  icon="plus"
                  color="mid"
                  dataCypress={`educationAdd-${i}`}
                />
              )}
            </div>
          </div>
        );
      })}
  
      <h3>Courses</h3>
  
      {formState.courses.map((course, i) => {
        return (
          <div key={i}>
            <AuthInput
              name="courseName"
              value={course.courseName}
              placeholder="Course Name"
              type="text"
              maxLength="255"
              icon="book"
              onValueChange={e => onArrValueChange(e, 'courses', i, 'courseName')}
              dataCypress={`courseName-${i}`}
            />
            <AuthInput
              name="courseCode"
              value={course.courseCode}
              placeholder="Course Code"
              type="text"
              maxLength="50"
              icon="code"
              onValueChange={e => onArrValueChange(e, 'courses', i, 'courseCode')}
              dataCypress={`courseCode-${i}`}
            />
            <AuthInput
              name="courseNotes"
              value={course.notes}
              placeholder="Notes"
              type="text"
              maxLength="1000"
              icon="notes"
              onValueChange={e => onArrValueChange(e, 'courses', i, 'notes')}
              dataCypress={`courseNotes-${i}`}
            />
            <div className="btn-box">
              {formState.courses.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('courses', i)}
                  icon="minus"
                  color="mid"
                  dataCypress={`courseMinus-${i}`}
                />
              )}
              {formState.courses.length - 1 === i && (
                <Button
                  onClick={() =>
                    formState.courses[i].courseName !== '' &&
                    handleAddClick('courses', { courseName: '', courseCode: '', notes: '' })
                  }
                  icon="plus"
                  color="mid"
                  dataCypress={`courseAdd-${i}`}
                />
              )}
            </div>
          </div>
        );
      })}
  
      <h3>Academic Level</h3>
      <AuthSelect
        value={formState.academicLevel}
        placeholder="Select Academic Level"
        icon="graduation"
        directive="academicLevel"
        options={academicLevels}
        onValueChange={e => onValueChange(e, 'academicLevel')}
        dataCypress="academicLevel"
      />
    </>
  );
  
  const teacherSignup = (
    <>
      <AuthInput
        value={formState.licence}
        placeholder="Licence"
        type="text"
        maxLength="30"
        icon="licence"
        onValueChange={e => onValueChange(e, 'licence')}
        dataCypress="licence"
      />
      {formState.accreditations.map((val, i) => {
        return (
          <div key={i} className="auth-multi">
            <AuthInput
              name="accreditation"
              value={val.accreditation}
              placeholder="Accreditation"
              type="text"
              maxLength="30"
              icon="briefcase"
              onValueChange={e =>
                onArrValueChange(e, 'accreditations', i, 'accreditation')
              }
              dataCypress={`accreditation-${i}`}
            />
            <div className="btn-box">
              {formState.accreditations.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('accreditations', i)}
                  icon="minus"
                  color="mid"
                  dataCypress={`accreditationMinus-${i}`}
                />
              )}
              {formState.accreditations.length - 1 === i && (
                <Button
                  onClick={() =>
                    formState.accreditations[i].accreditation !== '' &&
                    handleAddClick('accreditations', {
                      accreditation: '',
                    })
                  }
                  icon="plus"
                  color="mid"
                  dataCypress={`accreditationAdd-${i}`}
                />
              )}
            </div>
          </div>
        );
      })}
      <AuthInput
        value={formState.specialtyField}
        placeholder="Specialty Field"
        type="text"
        maxLength="30"
        icon="fileText"
        onValueChange={e => onValueChange(e, 'specialtyField')}
        dataCypress="specialtyField"
      />
      <AuthInput
        value={formState.subSpecialtyField}
        placeholder="Sub Specialty Field"
        type="text"
        maxLength="30"
        icon="fileText"
        onValueChange={e => onValueChange(e, 'subSpecialtyField')}
        dataCypress="subSpecialtyField"
      />
      {formState.educations.map((val, i) => {
        return (
          <div key={i} className="auth-multi">
            <AuthInput
              name="education"
              value={val.education}
              placeholder="Education"
              type="text"
              maxLength="30"
              icon="briefcase"
              onValueChange={e =>
                onArrValueChange(e, 'educations', i, 'education')
              }
              dataCypress={`education-${i}`}
            />
            <div className="btn-box">
              {formState.educations.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('educations', i)}
                  icon="minus"
                  color="mid"
                  dataCypress={`educationMinus-${i}`}
                />
              )}
              {formState.educations.length - 1 === i && (
                <Button
                  onClick={() =>
                    formState.educations[i].education !== '' &&
                    handleAddClick('educations', {
                      education: '',
                    })
                  }
                  icon="plus"
                  color="mid"
                  dataCypress={`educationAdd-${i}`}
                />
              )}
            </div>
          </div>
        );
      })}
      <AuthInput
        value={formState.yearsExp}
        placeholder="Years of Experience"
        type="number"
        icon="hash"
        maxLength="2"
        onValueChange={e => onValueChange(e, 'yearsExp')}
        onInput={onInput}
        dataCypress="yearsExp"
      />
      {formState.languages.map((val, i) => {
        return (
          <div key={i} className="auth-multi">
            <AuthSelect
              value={formState.languages[i]}
              placeholder="Language"
              type="text"
              directive="language"
              icon="language"
              options={languages}
              onValueChange={e => handleLanguages(e, i)}
              dataCypress={`languages-${i}`}
            />
            <div className="btn-box">
              {formState.languages.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('languages', i)}
                  icon="minus"
                  color="mid"
                  dataCypress={`languagesMinus-${i}`}
                />
              )}
              {formState.languages.length - 1 === i && (
                <Button
                  onClick={() =>
                    formState.languages[i] !== '' &&
                    handleAddLanguage('languages')
                  }
                  icon="plus"
                  color="mid"
                  dataCypress={`languagesAdd-${i}`}
                />
              )}
            </div>
          </div>
        );
      })}
    </>
  );

  return <div>{isTeacher ? teacherSignup : studentSignup}</div>;
};

export default StepThree;
