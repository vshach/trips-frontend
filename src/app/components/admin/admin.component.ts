import { Component, OnInit } from '@angular/core';
import {LocationService } from '../../services/location.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { StopsComponent } from "../stops/stops.component";
import { LocationOBJ } from '../../locationOBJ';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, StopsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  //public locations: any; //before cache
  public locations: LocationOBJ[] = [];

  location : string ='';
  startdate :string ='';
  
  constructor( private locationService: LocationService,
    private router: Router    
  ){}

  ngOnInit(){
    this.getLocations();
  }

  /*getLocations(){
    this.locationService.getLocations().subscribe(data => {
      this.locations = data;
    });
  }*/

  getLocations(){
    this.locationService.getLocations().subscribe({    
      next: data => {
        console.log('JSON Data:', data);
        this.locations = data;
      },
      error: error => {
        console.error('Error fetching JSON data:', error)
      }}
    );
  }

  lookup() {
      //alert(this.location+" bla bla date: "+ this.startdate);      
      this.router.navigate(['pic', this.location, this.startdate]);
  }

  navtoedit(){
    this.router.navigate(['edit']);
  }
}
