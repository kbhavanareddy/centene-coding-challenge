import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EnrolleesService } from '../enrollees/enrollees.service';

interface Enrollee {
  name: string;
  id: string;
  dateOfBirth: string;
  active: Boolean;
}

@Component({
  selector: 'app-enrollee-details',
  templateUrl: './enrollee-details.component.html',
  styleUrls: ['./enrollee-details.component.scss']
})

export class EnrolleeDetailsComponent implements OnInit {
  enrolleeModel: Enrollee;
  enrolleeForm: FormGroup;
  params: any;
  enrollee: any;

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _enrolleeService: EnrolleesService,
    private _router: Router) {
    this.enrolleeForm = this._fb.group({
      name: ['', Validators.required],
      id: [{ value: '', disabled: true}],
      dateOfBirth: [{ value: '', disabled: true}],
      active: ['']
    });
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((data) => {
      this.params = data;
    });
    this.getEnrollee();
  }

  getEnrollee() {
    this._enrolleeService.getEnrollee(this.params.id).subscribe((enrollee) => {
      this.enrollee = enrollee;
      this.enrolleeForm.patchValue({
        'id': this.enrollee['id'],
        'name': this.enrollee['name'],
        'dateOfBirth': this.enrollee['dateOfBirth']?(this.getDateFormat(this.enrollee['dateOfBirth'])):'',
        'active': this.enrollee['active']
      });
      console.log(enrollee)
    });
  }

  


  getDateFormat(date) {
    // (new Date(this.enrollee['dateOfBirth'])).toISOString()
    // return date.split('-').reverse().join('/');
    let items = date?.split('-');
    let formattedDate = this.getMonth(items[1]) + ' ' + items[2] + ' ' + items[0];
    return formattedDate;
  }

  getDate(date) {
    let items = date?.split(' ');
    let formattedDate =  items[2] + '-' + items[1] + '-' + this.getNumericMonth(items[0]);
    return formattedDate;
  }

  getMonth(inputMonth) {
    switch (inputMonth) {
      case '01':
        return 'January'
      case '02':
        return 'February'
      case '03':
        return 'March'
      case '04':
        return 'April'
      case '05':
        return 'May'
      case '06':
        return 'June'
      case '07':
        return 'July'
      case '08':
        return 'August'
      case '09':
          return 'September'
      case '10':
          return 'October'
      case '11':
          return 'November'
      case '12':
          return 'December'
      default:
          return 'error'
    }
  }

  getNumericMonth(inputMonth) {
    switch (inputMonth) {
      case 'January':
        return '01'
      case 'February':
        return '02'
      case 'March':
        return '03'
      case 'April':
        return '04'
      case 'May':
        return '05'
      case 'June':
        return '06'
      case 'July':
        return '07'
      case 'August':
        return '08'
      case 'September':
          return '09'
      case 'October':
          return '10'
      case 'November':
          return '11'
      case 'December':
          return '12'
      default:
          return 'error'
    }
  }

  onSubmit() {
    if (this.enrolleeForm.valid) {
      this.enrolleeModel = this.enrolleeForm.value;
      // this.enrolleeModel.dateOfBirth = this.enrolleeForm.value.dateOfBirth.toISOString();
      // this.enrolleeModel.dateOfBirth = this.enrolleeForm.value.dateOfBirth?(this.getDate(this.enrolleeForm.value.dateOfBirth)):'';
      if (this.params.id) {
        this.mapValuesToEnrollee();
        this._enrolleeService.updateEnrollee(this.enrollee, this.params.id).subscribe((data) => {
          if (data) {
            this._router.navigate(['/enrollees']);
          }
        }, (error) => {
          console.log(error);
        });
      }
    }
  }

  mapValuesToEnrollee() {
    this.enrollee.name = this.enrolleeForm.value.name;
    // this.enrollee.id = this.enrolleeForm.value.id;
    // this.enrollee.dateOfBirth = this.enrolleeForm.value.dateOfBirth;
    this.enrollee.active = this.enrolleeForm.value.active;
  }

  cancel() {
    this._router.navigate(['/enrollees']);
  }

}
