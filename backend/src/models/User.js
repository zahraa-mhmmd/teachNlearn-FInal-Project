const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const Session = require('./Session');

dotenv.config({ path: '../../config/.env' });

const userSchema = new mongoose.Schema({
  profileImage: {
    type: String, // Link
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: 2,
    maxlength: 255,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: 2,
    maxlength: 255,
    trim: true,
  },
  title: {
    type: String,
    minlength: 2,
    maxlength: 255,
    trim: true,
  },
  sex: {
    type: String,
    lowercase: true,
    enum: ['male', 'female'],
  },
  dateOfBirth: {
    type: String, // Date
  },
  phoneNumber: {
    type: String,
    minlength: 10,
    maxlength: 24,
    trim: true,
  },
  address: {
    number: {
      type: String,
      minlength: 1,
      maxlength: 255,
    },
    street: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    city: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    state: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    country: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    postcode: {
      type: Number,
      min: 1,
      max: 1000000,
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    minlength: 6,
    maxlength: 255,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    maxlength: 1024,
    trim: true,
  },
  isTeacher: {
    type: Boolean,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  teacherInfo: {
    availability: {
      openingTime: String,
      closingTime: String,
      lunchBreakStart: String,
      lunchBreakEnd: String,
      unavailableDateTimes: [
        {
          startDateTime: String,
          endDateTime: String,
          modifier: String,
        },
      ],
    },
    licence: {  //Teaching License/Certification
      type: String,
      min: 6,
      max: 12,
    },
    accreditations: [
      {
        type: String,
        minlength: 1,
        maxlength: 255,
      },
    ],
    specialtyField: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    subSpecialtyField: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    education: [
      {
        type: String,
        minlength: 1,
        maxlength: 255,
      },
    ],
    yearsExperience: {
      type: Number,
      min: 1,
      max: 100,
    },
    tags: [
      {
        type: String,
        minlength: 1,
        maxlength: 255,
      },
    ],
    languagesSpoken: [
      {
        type: String,
        minlength: 1,
        maxlength: 255,
      },
    ],
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  studentInfo: {
    education: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          auto: true,
        },
        name: {
          type: String,
          minlength: 1,
          maxlength: 255,
          trim: true,
        },
        department: {
          type: String,
          minlength: 1,
          maxlength: 255,
          trim: true,
        },
        gradeLevel: {
          type: String,
          minlength: 1,
          maxlength: 1000,
          trim: true,
        },
        notes: {
          type: String,
          minlength: 1,
          maxlength: 1000,
          trim: true,
        },
      },
    ],
    courses: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          auto: true,
        },
        courseName: {
          type: String,
          minlength: 1,
          maxlength: 255,
          trim: true,
        },
        courseCode: {
          type: String,
          minlength: 1,
          maxlength: 50,
          trim: true,
        },
        notes: {
          type: String,
          minlength: 1,
          maxlength: 1000,
          trim: true,
        },
      },
    ],
    academicLevel: {
        type: String,
        enum: ['primary', 'secondary', 'highschool', 'undergraduate'], 
      },
  },
});

userSchema.pre('save', async function (next) { //pre-save hook
  const user = this;

  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(8);
    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  if (user.isTeacher) {
    await Session.deleteMany({ teacher: user._id });
  } else {
    // await Session.updateMany(
    //   { student: user._id, startDate: { $gt: Date.now() } },
    //   { student: null }
    // );
    await Session.deleteMany({ student: user._id });
  }

  next();
});

userSchema.methods.toJSON = function () {//sensitive data is being removed mn lresponse
  const user = this;
  const userObject = user.toObject();

  if (user.isTeacher) {
    delete userObject.studentInfo;
  } else {
    delete userObject.teacherInfo;
  }

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // // Obscure 400 incorrect email or password messages to prevent hacking
  // Method 1 // return res.status(400).send('email or password is incorrect');
  // Method 2 preferred: throw new Error(...)

  // Check if email exists
  // eslint-disable-next-line no-use-before-define
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email or password is incorrect');

  // Check if password is correct
  const isMatchedPass = await bcrypt.compare(password, user.password);
  if (!isMatchedPass) throw new Error('Email or password is incorrect');

  return user;
};

//Create and assign a token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.TOKEN_SECRET
  );

  // Concat new token to tokens array
  user.tokens = user.tokens.concat({ token });
  // user.tokens.push({ token });

  await user.save();
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
