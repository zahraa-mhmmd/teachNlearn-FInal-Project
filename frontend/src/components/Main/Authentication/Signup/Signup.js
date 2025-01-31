import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, MessageContext } from '../../../../globalState/index';
import { useNavigate } from 'react-router-dom';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import '../Form/Form.scss';
import Button from '../../../Button/Button';
import { SignUpUser } from '../../../AxiosTest/userRoutes';

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { flashMessage, setFlashMessage } = useContext(MessageContext);

  const [formState, setFormState] = useState({
    step: 0,
    isTeacher: false,
    validationIcon: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    title: '',
    sex: '',
    weight: '',
    dob: '',
    phone: '+961',
    addressNumber: '',
    street: '',
    city: '',
    state: '',
    country: 'Lebanon',
    postcode: '',
    education: [{ name: '', department: '' , gradeLevel: '' }],
    courses: [{ courseName: '', courseCode: '' , notes: ''}],
    academicLevel: '',
    //Teacher states
    licence: '',
    accreditations: [{ accreditation: '' }],
    specialtyField: '',
    subSpecialtyField: '',
    educations: [{ education: '' }],
    yearsExp: '',
    languages: [''],
  });

  const maxLengthCheck = el => {
    if (el.target.value.length > el.target.maxLength) {
      el.target.value = el.target.value.slice(0, el.target.maxLength);
    }
  };

  const handleYes = () => {
    setFormState({
      ...formState,
      isTeacher: true,
      step: formState.step + 1,
    });
  };

  const handleNo = () => {
    setFormState({
      ...formState,
      isTeacher: false,
      step: formState.step + 1,
    });
  };

  const onNextStepOne = () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!formState.password || !formState.confirmPassword || !formState.email) {
      setFlashMessage({
        message: 'Please fill in all the inputs',
        type: 'error',
        icon: 'alert',
      });
      return null;
    } else if (formState.password !== formState.confirmPassword) {
      setFlashMessage({
        message: 'Passwords do not match',
        type: 'error',
        icon: 'alert',
      });
      return null;
    } else if (!emailRegex.test(formState.email)) {
      setFlashMessage({
        message: 'Please enter a valid email address',
        type: 'error',
        icon: 'alert',
      });
      return null;
    } else if (formState.password.length < 6) {
      setFlashMessage({
        message: 'Passwords must be at least 6 characters',
        type: 'error',
        icon: 'alert',
      });
      return null;
    } else if (
      formState.password === formState.confirmPassword &&
      formState.password !== ''
    ) {
      setFormState({
        ...formState,
        step: formState.step + 1,
      });
    }
  };
  const onNextStepTwo = () => {
    if (
      !formState.firstName ||
      !formState.lastName ||
      !formState.title ||
      !formState.dob ||
      !formState.phone ||
      !formState.addressNumber ||
      !formState.state ||
      !formState.street ||
      !formState.city ||
      !formState.country ||
      !formState.postcode
    ) {
      setFlashMessage({
        message: 'Please fill in all the inputs',
        type: 'error',
        icon: 'alert',
      });
      return null;
    } else if (formState.firstName.length <= 1) {
      setFlashMessage({
        message: 'Firt name must be at least 2 characters',
        type: 'error',
        icon: 'alert',
      });
      return null;
    } else if (formState.lastName.length <= 1) {
      setFlashMessage({
        message: 'Last name must be at least 2 characters',
        type: 'error',
        icon: 'alert',
      });
      return null;
    } else if (
      formState.password === formState.confirmPassword &&
      formState.password !== ''
    ) {
      setFormState({
        ...formState,
        step: formState.step + 1,
      });
    }
  };

  const onPrev = () => {
    setFormState({
      ...formState,
      step: formState.step - 1,
    });
    setFlashMessage(null);
  };

  useEffect(() => {
    if (
      //password and confirm password match
      formState.password === formState.confirmPassword &&
      formState.password.length >= 6
    ) {
      setFormState({
        ...formState,
        validationIcon: 'success',
      });

      //password and confirm password are not the same
    } else if (
      formState.password !== formState.confirmPassword &&
      formState.password.length === formState.confirmPassword.length
    ) {
      setFormState({
        ...formState,
        validationIcon: 'error',
      });
      setFlashMessage({
        message: 'passwords do not match',
        type: 'error',
        icon: 'alert',
      });
      return null;
    }
  }, [formState.password, formState.confirmPassword]);

  const onValueChange = (e, key) => {
    setFormState({
      ...formState,
      [key]: e.target.value,
    });

    setFlashMessage(null);
  };

  const onArrValueChange = (e, key, i, subKey) => {
    const list = [...formState[key]];
    list[i][subKey] = e.target.value;

    setFormState({
      ...formState,
      [key]: list,
    });

    setFlashMessage(null);
  };

  const handleLanguages = (e, i) => {
    const list = [...formState['languages']];
    list[i] = e.target.value;

    setFormState({
      ...formState,
      ['languages']: list,
    });
    setFlashMessage(null);
  };

  //Handlers for adding/removing extra form fields
  const handleRemoveClick = (key, i) => {
    //spread value at the formState key into list
    const list = [...formState[key]];

    //at index i, remove one item
    list.splice(i, 1);
    setFormState({
      ...formState,
      [key]: list,
    });
  };

  //key param refers to which key to reference e.g. existingConditions
  //stateFields is the object that is needed to be put into the array
  //e.g. formFieldsObject = { condition: '', conditionStartDate: '', conditionComment: '' }
  const handleAddClick = (key, formFieldsObject) => {
    setFormState({
      ...formState,
      [key]: [...formState[key], formFieldsObject],
    });
  };

  const handleAddLanguage = key => {
    setFormState({
      ...formState,
      [key]: [...formState[key], ''],
    });
  };

  const sanitizedTeacherForm = () => {
    return {
      firstName: formState.firstName,
      lastName: formState.lastName,
      title: formState.title,
      sex: formState.sex,
      dateOfBirth: formState.dob,
      phoneNumber: formState.phone,
      email: formState.email,
      password: formState.password,
      confirmPassword: formState.confirmPassword,
      isTeacher: formState.isTeacher,
      address: {
        number: formState.addressNumber,
        street: formState.street,
        city: formState.city,
        state: formState.state,
        country: formState.country,
        postcode: formState.postcode,
      },
      teacherInfo: {
        licence: formState.licence,
        accreditations: deleteKeys('accreditations', 'accreditation'),
        specialtyField: formState.specialtyField,
        subSpecialtyField: formState.subSpecialtyField,
        education: deleteKeys('educations', 'education'),
        yearsExperience: formState.yearsExp,
        languagesSpoken: formState.languages,
      },
    };
  };

  const sanitizedStudentForm = () => {
    return {
      firstName: formState.firstName,
      lastName: formState.lastName,
      title: formState.title,
      sex: formState.sex,
      dateOfBirth: formState.dob,
      phoneNumber: formState.phone,
      email: formState.email,
      password: formState.password,
      confirmPassword: formState.confirmPassword,
      isTeacher: formState.isTeacher,
      address: {
        number: formState.addressNumber,
        street: formState.street,
        city: formState.city,
        state: formState.state,
        country: formState.country,
        postcode: formState.postcode,
      },
      studentInfo: {
        education: formState.education,
        courses: formState.courses,
        academicLevel: formState.academicLevel,
      },
    };
  };

  // init new array
  // loop over each object in the array
  // grab the value and push into the new array
  // return the new array
  const deleteKeys = (key, subKey) => {
    const newArr = [];
    formState[key].forEach(el => {
      newArr.push(el[subKey]);
    });
    return newArr;
  };

  const checkEmptyInputFields = key => {
    let isNotValid;

    formState[key].forEach(el => {
      const inputValues = Object.values(el);

      for (let i = 0; i < inputValues.length; i++) {
        if (!inputValues[i]) {
          console.log(el, key);
          isNotValid = true;
        }
      }
    });
    return isNotValid;
  };

  const ValidateElementsInArrayAreStrings = key => {
    let isNotValid;
    formState[key].forEach(el => {
      if (el === '') isNotValid = true;
    });

    return isNotValid;
  };

  //handler for submitting form
  const handleSubmit = async () => {
    if (!formState.isTeacher && checkEmptyInputFields('education')) {
      setFlashMessage({
        message: 'Please fill in all fields that you added',
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (!formState.isTeacher && checkEmptyInputFields('courses')) {
      setFlashMessage({
        message: 'Please fill in all fields that you added',
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (formState.isTeacher && ValidateElementsInArrayAreStrings('languages')) {
      setFlashMessage({
        message: 'Please include all languages',
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (!formState.licence && formState.isTeacher) {
      setFlashMessage({
        message: 'Please include a valid licence number',
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (!formState.accreditations && formState.isTeacher) {
      setFlashMessage({
        message: 'Please include a valid accreditation',
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (!formState.specialtyField && formState.isTeacher) {
      setFlashMessage({
        message: 'Please include a speciality field',
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (!formState.educations && formState.isTeacher) {
      setFlashMessage({
        message: 'Please include your education',
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (!formState.yearsExp && formState.isTeacher) {
      setFlashMessage({
        message: 'Please include your years of experience',
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (!formState.languages && formState.isTeacher) {
      setFlashMessage({
        message: 'Please include the languages you speak',
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (!formState.academicLevel && !formState.isTeacher) {
      setFlashMessage({
        message: 'Please include your blood type',
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    const sanitizedForm = formState.isTeacher
      ? sanitizedTeacherForm()
      : sanitizedStudentForm();

    if (!flashMessage) {
      SignUpUser(sanitizedForm, setUser, '/profile', errors =>
        setFlashMessage({
          message: `${errors.message}`,
          type: 'error',
          icon: 'alert',
        }), navigate
      );
    }
  };

  // Handle enter key callback to advance the form - placed on last input field of each form step
  const handleEnterKey = e => {
    if (e.keyCode === 13 && formState.step === 1) {
      onNextStepOne();
    }

    if (e.keyCode === 13 && formState.step === 2) {
      onNextStepTwo();
    }
  };

  const displayFormStep = () => {
    switch (formState.step) {
      case 0:
        return (
          <div className="form-wrapper">
            <div className="trim" />
            <div className="form-container">
              <div className="form-header">
                <h1>Sign up</h1>
                <span>1/4</span>
              </div>
              <h3>Are you a Teacher?</h3>
              <div className="form-button-wrapper">
                <Button
                  action="No"
                  color="pink"
                  onClick={handleNo}
                  icon="cross"
                />
                <Button
                  action="Yes"
                  color="pink"
                  onClick={handleYes}
                  icon="check"
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="form-wrapper">
            <div className="trim" />
            <div className="form-container">
              <div className="form-header">
                <h1>Sign up</h1>
                <span>2/4</span>
              </div>
              <StepOne
                formState={formState}
                onValueChange={onValueChange}
                onKeyUp={handleEnterKey}
              />
              <div className="form-button-wrapper">
                <Button
                  action="Previous"
                  color="navy"
                  onClick={onPrev}
                  icon="arrowLeft"
                />
                <Button
                  action="Next"
                  color="pink"
                  onClick={onNextStepOne}
                  icon="arrowRight"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-wrapper">
            <div className="trim" />
            <div className="form-container">
              <div className="form-header">
                <h1>Sign up</h1>
                <span>3/4</span>
              </div>

              <StepTwo
                formState={formState}
                onValueChange={onValueChange}
                onKeyUp={handleEnterKey}
                onInput={maxLengthCheck}
              />
              <div className="form-button-wrapper">
                <Button
                  action="Previous"
                  color="navy"
                  onClick={onPrev}
                  icon="arrowLeft"
                />
                <Button
                  action="Next"
                  color="pink"
                  onClick={onNextStepTwo}
                  icon="arrowRight"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-wrapper">
            <div className="trim" />
            <div className="form-container">
              <div className="form-header">
                <h1>Sign up</h1>
                <span>4/4</span>
              </div>
              <StepThree
                formState={formState}
                onValueChange={onValueChange}
                handleAddClick={handleAddClick}
                handleRemoveClick={handleRemoveClick}
                onArrValueChange={onArrValueChange}
                handleLanguages={handleLanguages}
                onInput={maxLengthCheck}
                handleAddLanguage={handleAddLanguage}
              />
              <div className="form-button-wrapper">
                <Button
                  action="Previous"
                  color="navy"
                  onClick={onPrev}
                  icon="arrowLeft"
                />
                <Button
                  action="Submit"
                  color="pink"
                  onClick={handleSubmit}
                  icon="check"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return displayFormStep();
};

export default Signup;
