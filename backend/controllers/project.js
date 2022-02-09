'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: "Im the home!"
        });
    },
    test: function(req, res){
        return res.status(200).send({
            message: "Im method or action test for the controller"
        });
    },

    // Metodo que nos permita guardar un nuevo proyecto en la bd
    saveProject: function(req, res){
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.youtube = params.youtube;
        project.github = params.github;
        project.arduino = params.arduino;
        project.imagefront = null;
        project.image = null;
        project.image2 = null;
        project.image3 = null;

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({
                message: "Error saving the project!!"});

            if(!projectStored) return res.status(404).send({
                message: "Couldn't save the project!"});

            return res.status(200).send({project: projectStored});
            });
    },

    // Metodo para que nos devuelva un documento de la db que le solicitemos por la url
    // findById es propiedad de mongoose y hay muchos como ellos. se encuentran en su documentacion

    getProject: function(req, res){
        var projectId = req.params.id;

        if(projectId == null){
            return res.status(404).send({
                message: "The project doesn't exists"});
        };

        Project.findById(projectId, (err, project) =>{
        if(err) return res.status(500).send({
            message: "Error returning the project!!"});

        if(!project) return res.status(404).send({
            message: "The project doesn't exists"});

        return res.status(200).send({project});

        
        });
    },

    // El metodo find saca todos los objetos y se le puede pasar algun parametro como el año en este caso: {year: 2022}. sort es para ordenar
    getProjects: function(req, res){
        Project.find({}).sort('-year').exec((err, projects) =>{
            if(err) return res.status(500).send({
                message: "Error returning the projects!"
            });
            if(!projects) return res.status(404).send({
                message: "There are not projects to view"});
            
            return res.status(200).send({projects});
        });
    },

    updateProjects: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) =>{
            if(err) return res.status(500).send({
                message: "Error updating the project!"});
            if(!projectUpdated) return res.status(404).send({
                message: "The selected project doesn't exists"});
            
            return res.status(200).send({
                project: projectUpdated,
                message: "Updated succefully"});
        });
    },

    deleteProjects: function(req, res){
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemoved) =>{
            if(err) return res.status(500).send({
                message: "Error deleting the project!"});
            if(!projectRemoved) return res.status(404).send({
                message: "The selected project doesn't exists"});
            
            return res.status(200).send({
                project: projectRemoved,
                message: "Removed succefully"});
        });
    },

	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = "Could not upload the image 1 !!!";

        if(req.files){
            var file_path = req.files.null.path;
			var file_split = file_path.split("\\");
			var file_name = file_split[1];

            var ext_split = file_name.split('\.');
			var file_ext = ext_split[1];

			if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif' || file_ext == 'mp4'){

            Project.findByIdAndUpdate(projectId, {image: file_name}, {new: true}, (err, projectUpdated) => {
                if(err) return res.status(500).send({message: 'Could not upload the image 1 !!!!!!!!!!!!'});

                if(!projectUpdated) return res.status(404).send({message: 'The project does not exists and the image was not uploaded'});

                return res.status(200).send({
                    project: projectUpdated
                });
            });
            
            }else{
                fs.unlink(file_path, (err) => {
                    return res.status(200).send({message: 'The extension is not valid'});
                });
            }
        }else{
            return res.status(200).send({
                message: fileName
            });
        }

    },




    uploadImageFront: function(req, res){
		var projectId = req.params.id;
		var fileName = "Could not upload the image front page !!!";

        if(req.files){
            var file_path = req.files.null.path;
			var file_split = file_path.split("\\");
			var file_name = file_split[1];

            var ext_split = file_name.split('\.');
			var file_ext = ext_split[1];

			if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif' || file_ext == 'mp4'){

            Project.findByIdAndUpdate(projectId, {imagefront: file_name}, {new: true}, (err, projectUpdated) => {
                if(err) return res.status(500).send({message: 'Could not upload the image front page !!!!!!!!!!!!'});

                if(!projectUpdated) return res.status(404).send({message: 'The project does not exists and the image was not uploaded'});

                return res.status(200).send({
                    project: projectUpdated
                });
            });
            
            }else{
                fs.unlink(file_path, (err) => {
                    return res.status(200).send({message: 'The extension is not valid'});
                });
            }
        }else{
            return res.status(200).send({
                message: fileName
            });
        }

    },






    uploadImage2: function(req, res){
		var projectId = req.params.id;
		var fileName = "Could not upload the image 2 !!!";

        if(req.files){
            var filePath = req.files.null.path;
			var fileSplit = filePath.split("\\");
			var fileName = fileSplit[1];

            var extSplit = fileName.split('\.');
			var fileExt = extSplit[1].toLowerCase();

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

            Project.findByIdAndUpdate(projectId, {image2: fileName}, {new: true}, (err, projectUpdated) => {
                if(err) return res.status(500).send({message: 'Could not upload the image 2 !!!!!!!!!!!!'});

                if(!projectUpdated) return res.status(404).send({message: 'The project does not exists and the image was not uploaded'});

                return res.status(200).send({
                    project: projectUpdated
                });
            });
            
            }else{
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'The extension is not valid'});
                });
            }
        }else{
            return res.status(200).send({
                message: fileName
            });
        }
	},	
    
    uploadImage3: function(req, res){
		var projectId = req.params.id;
		var fileName = "Could not upload the image 3 !!!";

        if(req.files){
            var filePath = req.files.null.path;
			var fileSplit = filePath.split("\\");
			var fileName = fileSplit[1];

            var extSplit = fileName.split('\.');
			var fileExt = extSplit[1].toLowerCase();

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

            Project.findByIdAndUpdate(projectId, {image3: fileName}, {new: true}, (err, projectUpdated) => {
                if(err) return res.status(500).send({message: 'Could not upload the image 3 !!!!!!!!!!!!'});

                if(!projectUpdated) return res.status(404).send({message: 'The project does not exists and the image was not uploaded'});

                return res.status(200).send({
                    project: projectUpdated
                });
            });
            
            }else{
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'The extension is not valid'});
                });
            }
        }else{
            return res.status(200).send({
                message: fileName
            });
        }
	},

    getImageFile: function(req, res){
		var file = req.params.image;
		var path_file = './uploads/'+file;

		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: "The image does not exists"
				});
			}
		});
	}

};

module.exports = controller;