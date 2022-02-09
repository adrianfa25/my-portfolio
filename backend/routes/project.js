'use strict'

var express = require('express');
const { route } = require('../app');
var ProjectController = require('../controllers/project');

var router = express.Router();


var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });



router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProjects);
router.delete('/project/:id', ProjectController.deleteProjects);

router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.post('/upload-image2/:id', multipartMiddleware, ProjectController.uploadImage2);
router.post('/upload-image3/:id', multipartMiddleware, ProjectController.uploadImage3);
router.post('/upload-imagefront/:id', multipartMiddleware, ProjectController.uploadImageFront);

router.get('/get-image/:image', ProjectController.getImageFile);




module.exports = router;