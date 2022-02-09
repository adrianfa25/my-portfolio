import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('MY ID', 'MY TEMPLATE', e.target as HTMLFormElement, 'MY USER')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        this.status = 'success';
      }, (error) => {
        console.log(error.text);
        this.status = 'failed';
      });
  }
  public status: string;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);
  messageFormControl = new FormControl('', [Validators.required]);

  constructor() { 
    this.status = '';
  }

  ngOnInit(): void {

  }

  onSubmit(){

  }
}
