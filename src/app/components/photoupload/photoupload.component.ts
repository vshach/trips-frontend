import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { LocationService } from '../../services/location.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocationOBJ } from '../../locationOBJ';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photoupload',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './photoupload.component.html',
  styleUrl: './photoupload.component.css'
})
export class PhotouploadComponent {

  locations : LocationOBJ []  = [];

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  locationID: string = '';
  people: string = '';
  dateTaken : string = '';  
  selectedLocation : any;

  constructor(private photoService: PhotoService,
              private locationService: LocationService,
              private router: Router ) {

  }

  ngOnInit(){
    this.getLocations();
  }

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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      //for photo preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  upload() {
    
    if (!this.selectedFile || !this.selectedLocation || !this.people || !this.dateTaken) {
      alert('Please fill all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', this.selectedFile);
    formData.append('locationID', this.selectedLocation);
    formData.append('people', this.people);
    formData.append('date', this.dateTaken);

    this.photoService.uploadData(formData).subscribe({
      next: (res) => { 
        console.log('Upload success:', res);        
        //clean the form
        this.cleanTheForm();
      },
      error: (err) => console.error('Upload failed:', err)
    });
  }

  cleanTheForm(){
    this.selectedFile = null;
    this.previewUrl = null;
    this.locationID = '';
    this.people = '';
    this.dateTaken = '';  
    this.selectedLocation ='';
  }
}
