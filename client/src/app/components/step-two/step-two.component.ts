import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { UserService } from 'src/app/services/user.service';
/**
 *
 *  @param control
 */


@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {

  registerNextForm: FormGroup;


  constructor(public builder: FormBuilder,
    public _userService: UserService) { }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.registerNextForm = this.builder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required,]
    })
  }

  onClick() {
    this._userService.addStepTwo(this.registerNextForm.value.name, this.registerNextForm.value.lastName, this.registerNextForm.value.city, this.registerNextForm.value.street)
  }

}
