// Hapi update: https://github.com/hapijs/joi/issues/2145

const Joi = require('joi'); // Validation

const schema = Joi.object({
  profileImage: Joi.string(),
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(), // Joi.ref('password'),
  title: Joi.string(),
  sex: Joi.string(),
  dateOfBirth: Joi.string(), // Joi.date().format('YYYY-MM-DD'),
  phoneNumber: Joi.string(),
  address: Joi.object(),
  isTeacher: Joi.boolean(),
  teacherInfo: Joi.object({
    licence: Joi.string(),
    accreditations: Joi.array(),
    specialtyField: Joi.string(),
    subSpecialtyField: Joi.string(),
    education: Joi.array(),
    availability: Joi.object({
      openingTime: Joi.string(),
      closingTime: Joi.string(),
      lunchBreakStart: Joi.string(),
      lunchBreakEnd: Joi.string(),
      unavailableDateTimes: Joi.array(),
    }),
    yearsExperience: Joi.number().integer(),
    tags: Joi.array(),
    languagesSpoken: Joi.array(),
  }),
  studentInfo: Joi.object({
    education: Joi.array().items(
      Joi.object({
        name: Joi.string().allow(''), 
        department: Joi.string().allow(''),
        gradeLevel: Joi.string().allow(''),
        notes: Joi.string().allow(''),
      })
    ),
    courses: Joi.array().items(
      Joi.object({
        courseName: Joi.string().allow(''),
        courseCode: Joi.string().allow(''),
        notes: Joi.string().allow(''),
      })
    ),
    academicLevel: Joi.string(),
  }),
});

// Add forbidden fields: token & created at & teacherInfo[rating]
const schemaValidation = (data) => schema.validate(data);

const signInValidation = (data) => {
  const signInSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return signInSchema.validate(data);
};

module.exports = { schemaValidation, signInValidation };
