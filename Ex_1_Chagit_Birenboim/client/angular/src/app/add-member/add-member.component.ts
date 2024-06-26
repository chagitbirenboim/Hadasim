import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  isModalOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openAddMemberModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false; // לסגור את המודל
  }

}
