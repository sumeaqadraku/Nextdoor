const Router = require('express').Router();
const LigjeratatController  = require('../controllers/LigjeratatController');

//Routes

//Mbush Ligjeruesit
Router.post('/addLecturers', LigjeratatController.addLecturer);

//Krijo Ligjerate
Router.post('/createLecture', LigjeratatController.AddLigjerata);

//Merr Ligjeruesit
Router.get('/getLecturers', LigjeratatController.getAllLecturers);

//Merr LigjeruesinById
Router.get('/getLecturerById/:id', LigjeratatController.getLecturerById);

//Merr LigjeruesitMeLigjeratat
Router.get('/getLecturersWithLectures', LigjeratatController.getLectutersAndCourses);

//Perditeso Ligjeruesin
Router.put('/updateLecturer/:id', LigjeratatController.updateLecturer);

//Fshije Ligjeraten
Router.delete('/delete/:id', LigjeratatController.deleteLigjerata);

module.exports = Router;