import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PhotoService } from '../../services/photo.service';
import { LocationService } from '../../services/location.service';
import { LocationOBJ } from '../../locationOBJ';
import { PhotoStateService } from '../../services/photo-state.service';
import { PhotoOBJ } from '../../photoOBJ';
import { PhotoUpdateDTO } from '../../photoUpdateDTO';

@Component({
  selector: 'app-photoeditdata',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './photoeditdata.component.html',
  styleUrl: './photoeditdata.component.css'
})
export class PhotoeditdataComponent {

  phdatetaken : string ='';
  selectedlocation : number = -1;  

  selectedPhoto : PhotoOBJ | null = null;

  locations : LocationOBJ []  = [];

  constructor (private photoService: PhotoService,
               private photoStateService: PhotoStateService,
                private locationService: LocationService){

    //photoId = this.route.snapshot.paramMap.get('picid');//this will work from ngInit, but not from the constructor
  }

  ngOnInit(){
    this.getLocations();
    this.selectedPhoto = this.photoStateService.getSelectedPhoto();
    this.selectedlocation = this.selectedPhoto!.locationID; 
  }

  saveChanges(){
    alert( this.selectedPhoto?.id+" "+ this.selectedPhoto?.dateTaken + " "+this.selectedPhoto?.locationID);    

    this.photoService.updatePhoto( this.selectedPhoto!).subscribe({
      next: (result) => {
        console.log('Photo updated successfully', result);
        // Optionally, handle the success response, like updating UI
      },
      error: (err) => {
        console.error('Error updating photo', err);
        // Optionally, handle the error
      }
    });
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
}
