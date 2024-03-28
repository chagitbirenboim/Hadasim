import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '@app/_services/user.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.css']
})
export class AddMemberModalComponent implements OnInit {
  userForm: any;
  // vaccineArray: any;
  submitted = false;
  enableSubmit = true;
  loading = false;
  IsEnterStartIll!: string
  today = new Date();

  @Output() closeModalEvent = new EventEmitter();

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,) {
    this.userForm = this.formBuilder.group({
      identityNum: ' ',
      firstName: ' ',
      lastName: ' ',
      phone: ' ',
      mobilePhone: ' ',
      city: ' ',
      street: ' ',
      numHouse: ' ',
      birthDate: ' ',
      startIllDate: ' ',
      endIllDate: ' ',

    });
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      identityNum: new FormControl('', Validators.required),
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-z\u0590-\u05fe]+$/i)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-z\u0590-\u05fe]+$/i)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^0?(([23489]{1}\d{7})|[5]{1}\d{8}|(([7]\d{1,2}\-\d{7})|([7]\d{8})))$/)] ),
      mobilePhone: new FormControl('', [Validators.required, Validators.pattern(/^0?(([23489]{1}\d{7})|[5]{1}\d{8}|(([7]\d{1,2}\-\d{7})|([7]\d{8})))$/), Validators.minLength(10)]),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      numHouse: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      birthDate: new FormControl('', Validators.required),
      startIllDate: new FormControl(null,),
      endIllDate: new FormControl(null,),
      vaccineDetails: this.formBuilder.array([
        this.createVaccineFormGroup()
      ])
    });
  }

  createVaccineFormGroup(): FormGroup {
    return this.formBuilder.group({
      manufacturer: [''],
      date: [null]
    });
  }

  // Initialize vaccineArray as a getter property to access the form array
  get vaccineArray(): FormArray {
    return this.userForm.get('vaccineDetails') as FormArray;
  }

  // Method to add a new vaccine form group
  addVaccine() {
    if (this.vaccineArray.length < 4)
      this.vaccineArray.push(this.createVaccineFormGroup())
  }

  // addVaccine(): void {
  //   this.vaccineArray = this.userForm.get('vaccineDetails') as FormArray;
  //   this.vaccineArray.push(this.createVaccineFormGroup());
  // }

  addVaccineTry() {
    const vaccineArray = this.userForm.get('vaccineDetails') as FormArray;
    vaccineArray.push(this.createVaccineFormGroup());
  }
  validIdNum(idNum: any) {
    let id = String(idNum).trim();
    if (id.length > 9) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    if (id == "000000000") {
      return false
    }
    return Array.from(id, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) % 10 === 0;
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit(formData: any): void {
    this.submitted = true;
    this.enableSubmit = false;
    const validId = this.validIdNum(formData.identityNum)
    if (!validId) {
      this.userForm.get('identityNum').setErrors({ invalid: 'invalid id' })
    }
    if (formData.endIllDate < formData.startIllDate || (formData.endIllDate && !formData.startIllDate)) {
      this.userForm.get('endIllDate').setErrors({ early: 'early date' })
    }
    if (!this.userForm.invalid && validId) {
      this.userService.addUser(formData).subscribe(
        users => {
          this.closeModal()
        },
        error => {
          console.log(error)
          if (error.includes("duplicate")) {
            this.userForm.get('identityNum').setErrors({ duplicate: 'duplicate id' })
          }
        });
    }
    this.enableSubmit = true
  }
}
