const moment = require('moment');
const User = require('../models/User');
const Session = require('../models/Session');
const {
  schemaValidation,
  signInValidation,
} = require('../utils/validations/users');

// Sign up
exports.signUp = async (req, res) => {
  try {
    // Validation before creation
    const { error } = schemaValidation(req.body);
    if (error) return res.status(400).send(error);

    // Check for unique email
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    // Check if confirmPassword is the same as password
    if (req.body.confirmPassword !== req.body.password) {
      return res.status(400).send('Confirmed password is incorrect');
    }

    // Prepare user data
    const userData = { ...req.body };
    if (userData.isTeacher) {
      delete userData.studentInfo;
      userData.teacherInfo = userData.teacherInfo || {}; // Ensure teacherInfo exists
      userData.teacherInfo.rating = 1;
    } else {
      delete userData.teacherInfo;
    }

    // Create and save the user
    const user = new User(userData);
    user.tokens = [];
    await user.save();

    // Generate token
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

// Sign in
exports.signIn = async (req, res) => {
  try {
    // Validation
    const { error } = signInValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if email & password are correct
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    // Create and assign a token
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

// Sign out of current session
exports.signOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
};

// Sign out of all sessions
exports.signOutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

// Get own user's profile
exports.viewProfile = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).send();
    }
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    // Unrequire list of fields if not provided
    const unrequiredFields = ['firstName', 'lastName', 'password'];
    unrequiredFields.forEach((field) => {
      if (!req.body[field]) {
        req.body[field] = req.user[field];
      }
    });

    // Unrequire confirm password
    req.body.confirmPassword = req.body.password;

    // Disable updating email & isTeacher
    req.body.email = req.user.email;
    req.body.isTeacher = req.user.isTeacher;

    const { error } = schemaValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    Object.keys(req.body).forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.status(201).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Delete user's profile
exports.deleteProfile = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

// // GET Student(s) Routes
// All Students
exports.viewStudents = async (req, res) => {
  try {
    if (!req.user.isTeacher) {
      res.status(403).send({ error: 'Forbidden' });
    }

    // Change this to allow null
    const bookedSessions = await Session.find(
      { teacher: req.user._id },
      function (err) {
        if (err) {
          return res.status(404).send();
        }
      }
    );

    const bookedWithStudents = bookedSessions.map((session) => session.student);

    // Assign all users to the user of bookedSessions
    const users = await User.find(
      { _id: { $in: bookedWithStudents } },
      function (err) {
        if (err) {
          return res.status(404).send();
        }
      }
    );

    // Only send appropriate data
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send();
  }
};

// One Student
exports.viewStudent = async (req, res) => {
  try {
    await Session.find(
      {
        teacher: req.user._id,
        student: req.params.id,
      },
      function (err) {
        if (err) {
          return res.status(404).send();
        }
      }
    );

    const user = await User.findOne(
      { _id: req.params.id, isTeacher: false },
      function (err) {
        if (err) {
          return res.status(404).send();
        }
      }
    );

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
};

// // GET Teacher(s) Routes (ADD MORE VALIDATION HERE)
// All Teachers
exports.viewTeachers = async (req, res) => {
  try {
    const users = await User.find({ isTeacher: true });
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
};

// One Teacher
exports.viewTeacher = async (req, res) => {
  try {
    const user = await User.findOne(
      { _id: req.params.id, isTeacher: true },
      function (err) {
        if (err) {
          return res.status(404).send();
        }
      }
    );
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
};

// exports.createUpload = async (req, res) => {
//   try {
//     console.log(req.file);
//     res.send({
//       message: 'Hello World',
//     });
//   } catch (e) {
//     res.status(500).send();
//   }
// };
