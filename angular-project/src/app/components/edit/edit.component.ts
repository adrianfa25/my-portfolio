import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService],

})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: string;
  public filesToUploadFront: Array<File>;
  public filesToUpload1: Array<File>;
  public filesToUpload2: Array<File>;
  public filesToUpload3: Array<File>;
  public save_project: any;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router

  ) { 
    this.title = "Edit Project";
    this.project = new Project('', '', '', '', 2022, '','','', false,'','','','');
    this.status = '';
    this.filesToUploadFront = [];
    this.filesToUpload1 = [];
    this.filesToUpload2 = [];
    this.filesToUpload3 = [];
    this.save_project = [];
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params['id'];
      this.getProject(id)
    }
      )
  }

  getProject(id: any){
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error => {
        console.log(error)
      }
    )
  }
  onActivate(event:any){ 
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
    }


    onSubmit(form:any){
      // Save basic data
      this._projectService.updateProject(this.project).subscribe(
        response => {
          if(response.project){
            // Upload the 3 images + image front page (list projects):
            if(this.filesToUpload1.length>=1){
              this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload1, 'null'),
              this._uploadService.makeFileRequest(Global.url+"upload-image2/"+response.project._id, [], this.filesToUpload2, 'null'),
              this._uploadService.makeFileRequest(Global.url+"upload-image3/"+response.project._id, [], this.filesToUpload3, 'null'),
              this._uploadService.makeFileRequest(Global.url+"upload-imagefront/"+response.project._id, [], this.filesToUploadFront, 'null')
              .then((result:any)=>{
                this.save_project = result;
                this.status = 'success';
              })
            }else{
              this.save_project = response.project;
              this.status = 'success';
            }
          }else{
            this.status = 'failed';
          };
        },
        error => {
          console.log(<any>error)
        }
      )
    }
    fileChangeEventFront(fileInput: any){
      this.filesToUploadFront = <Array<File>>fileInput.target.files;
    }
    fileChangeEvent1(fileInput: any){
      this.filesToUpload1 = <Array<File>>fileInput.target.files;
    }
    fileChangeEvent2(fileInput: any){
      this.filesToUpload2 = <Array<File>>fileInput.target.files;
    } 
    fileChangeEvent3(fileInput: any){
      this.filesToUpload3 = <Array<File>>fileInput.target.files;
    }
  
}
