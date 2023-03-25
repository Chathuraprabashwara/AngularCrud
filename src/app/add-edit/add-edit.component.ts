import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  empForm: FormGroup;

  Education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Under Graduate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

/* save  & update Employee data */
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Employee Updated Successfully');
              this._dialogRef.close(true);
            },
            error: console.log,
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee Added Successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
  /* Closed Function */
  onClose() {
    this._dialogRef.close(true);
  }
}
