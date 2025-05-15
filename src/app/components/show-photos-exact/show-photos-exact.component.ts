import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { ActivatedRoute } from '@angular/router';
import { DisplayPhotosComponent} from '../display-photos/display-photos.component';
import { CommonModule } from '@angular/common';
import { PhotoOBJ } from '../../photoOBJ';

@Component({
  selector: 'app-show-photos-exact',
  standalone: true,
  imports: [CommonModule, DisplayPhotosComponent],
  templateUrl: './show-photos-exact.component.html',
  styleUrl: './show-photos-exact.component.css'
})
export class ShowPhotosExactComponent {

  photos: PhotoOBJ[] = [];
  //filePaths : string [] = [];
  loading = true;
  trouble = '';
  
  constructor( private photoService: PhotoService, 
               private route: ActivatedRoute ) {}
  
  ngOnInit(){      
      this.route.params.subscribe((params) =>{
        this.photos =[];
        this.getFilteredPhotosOBJ( params['locid'], params['datetaken']);
      });      
  }

  getFilteredPhotosOBJ( locId : number, dateTaken : string){        
      console.log('show-photos-EXACT ', locId, " ", dateTaken);
      if (locId != 0) {
        this.photoService.getPhotosExact(locId, dateTaken).subscribe({    
          next: data => {
            console.log('show-photos-EXACT JSON Data:', data);
            this.photos = data;                
            this.loading = false;
          },
          error: error => {
            console.error('Error fetching JSON data from show-photos-EXACT:', error);
            this.trouble = error;
          }}
        );
      }
    }
}
