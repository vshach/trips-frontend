import { Component, OnInit } from '@angular/core';
import { StopsService } from '../../services/stops.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-route',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './admin-route.component.html',
  styleUrl: './admin-route.component.css'
})
export class AdminRouteComponent implements OnInit{

  public years = []; // I am getting back an array of years
  public dates = [];
  public chosen_year ='';
  public chosen_date = '';

  constructor(private stopsService: StopsService,
      private router: Router    ){
  }

  ngOnInit(){
    this.getYears();    
  }

  getYears(){
    this.stopsService.getYears().subscribe({    
      next: data => {
        console.log('JSON Data:', data);        
        this.years = data;
      },
      error: error => {
        console.error('Error fetching JSON data in getYears:', error)
      }}
    );
  }

  onYearChange(selectedYear: string): void {
    //console.log('Year selected:', selectedYear);
    // Perform any action you want when the year changes
    // For example, fetch data for the selected year
    this.stopsService.getDatesForYear( selectedYear ).subscribe({    
      next: data => {
        console.log('JSON Data:', data);        
        this.dates = data;
      },
      error: error => {
        console.error('Error fetching JSON data in onYearChange', error)
      }}
    );
  }

  showRoute(){      
    this.router.navigate(['stops', this.chosen_date]);
  }
}
