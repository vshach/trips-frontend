import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { ActivatedRoute } from '@angular/router';
import { DisplayPhotosComponent} from '../display-photos/display-photos.component';
import { CommonModule } from '@angular/common';
import { PhotoOBJ } from '../../photoOBJ';

@Component({
  selector: 'app-show-photos',
  standalone: true,
  imports: [CommonModule, DisplayPhotosComponent],
  templateUrl: './show-photos.component.html',
  styleUrl: './show-photos.component.css'
})
export class ShowPhotosComponent {
  
  photos: PhotoOBJ[] = [];
  //filePaths : string [] = [];
  loading = true;
  trouble = '';

  constructor( private photoService: PhotoService, 
               private route: ActivatedRoute ) {}

  ngOnInit(){
    //const locId = Number(this.route.snapshot.paramMap.get('locid'));
    //const dateTaken = String (this.route.snapshot.paramMap.get('datetaken'));

    this.route.params.subscribe((params) =>{
      this.photos =[];
      this.getFilteredPhotosOBJ( params['locid'], params['datetaken']);
    });
    
  }

  getFilteredPhotosOBJ( locId : number, dateTaken : string){        
    console.log('show-photos ', locId, " ", dateTaken);
    if (locId != 0) {
      this.photoService.getPhotos(locId, dateTaken).subscribe({    
        next: data => {
          console.log('JSON Data:', data);
          this.photos = data;    
          this.loading = false;            
        },
        error: error => {
          console.error('Error fetching JSON data:', error);
          this.trouble = error;
        }}
      );
    }
  }


}