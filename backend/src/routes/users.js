const router = require('express').Router();

const verifyToken = require('./verifyToken');
const {
  signUp,
  signIn,
  signOut,
  signOutAll,
  viewProfile,
  updateProfile,
  deleteProfile,
  viewStudents,
  viewStudent,
  viewTeachers,
  viewTeacher,
  // createUpload,
} = require('../controllers/usersController');

const { createBooking } = require('../controllers/sessionsController');

// // Authentication routes
// Sign up
router.post('/signup', signUp);

// Sign in (Should be PATCH)
router.post('/signin', signIn);

// Sign out of current session (Should be DELETE)
router.patch('/signout', verifyToken, signOut);

// Sign out of all sessions (Should be DELETE)
router.patch('/signoutall', verifyToken, signOutAll);

// // Profile Routes
// Get own user's profile
router.get('/profile', verifyToken, viewProfile);

// Update profile
router.patch('/profile', verifyToken, updateProfile);

// Delete user's profile
router.delete('/profile', verifyToken, deleteProfile);

// // Student Routes (GET)
// All Students
router.get('/students', verifyToken, viewStudents);

// One Student
router.get('/students/:id', verifyToken, viewStudent);

// // Teacher Routes (GET) // More validation required (Should be /teachers)
// All Teachers
router.get('/', viewTeachers);

// One Teacher
router.get('/:id', viewTeacher);

// Book a session (NEW Route)
router.post('/:id/book', verifyToken, createBooking);

// Upload an image to S3
// router.post('/upload', verifyToken, createUpload);

module.exports = router;
