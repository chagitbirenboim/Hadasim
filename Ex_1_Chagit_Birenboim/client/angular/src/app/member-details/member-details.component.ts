import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/_models/user';
import { Illnes } from '@app/_models/illnes';
import { Vaccine } from '@app/_models/vaccine';
import { UserService } from '@app/_services/user.service';
import { FormArray, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  user!: User;
  illness!: Illnes;
  vaccine!: Vaccine;
  // editing!: { [key: string]: boolean };
  editing: boolean = false
  addNewVaccine: boolean = false
  numOfVaccines: any =0;

  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user
      });
      this.userService.getVaccineByIdUser(userId).subscribe(vaccines => {
        this.numOfVaccines = vaccines.vaccinations?.length
        this.vaccine = vaccines
        this.vaccine?.vaccinations?.map(vaccine => {
          vaccine.date = this.formatDate(vaccine.date)
        })
      });
      this.userService.getIllnessByIdUser(userId).subscribe(illness => {
        this.illness = illness
      });
    });
    console.log(this.editing)
  }

  // editMember(whatEditing: string) {
  //   this.editing[whatEditing] = !this.editing[whatEditing]; // Toggle editing mode
  // }

  editMember() {
    this.editing = true
  }

  saveChanges(whatEditing: string) {
    this.userService.updateUser(this.user).subscribe(data => {
      console.log(data)
    })
    this.userService.updateIlness(this.illness).subscribe(data => {
      console.log(data)
    })
    this.editing = false
    // this.editing[whatEditing] = false;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  addVaccine(manufacturer: string, date: string) {
    this.addNewVaccine = false
    this.userService.addVaccine({ user_id: this.user._id, vaccine: { date: date, manufacturer: manufacturer } }).subscribe(data => {
      console.log(data)
      this.userService.getVaccineByIdUser(this.user._id).subscribe(vaccine => {
        this.vaccine = vaccine
        this.numOfVaccines = vaccine.vaccinations?.length
        this.vaccine?.vaccinations?.map(vaccine => {
          vaccine.date = this.formatDate(vaccine.date)
        })
      });
    })
    
  }
  // Method to add a new vaccine form group
  addNewVaccineToTheList() {
    this.addNewVaccine = true
  }
}
