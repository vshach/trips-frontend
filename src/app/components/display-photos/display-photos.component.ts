import { Component, Input } from '@angular/core';
import { PhotoOBJ } from '../../photoOBJ';
import { Router } from '@angular/router';
import { PhotoStateService } from '../../services/photo-state.service';

@Component({
  selector: 'app-display-photos',
  standalone: true,
  imports: [],
  templateUrl: './display-photos.component.html',
  styleUrl: './display-photos.component.css'
})
export class DisplayPhotosComponent {
  @Input() photos: PhotoOBJ[] = [];

  constructor( private photoStateService: PhotoStateService,
    private router: Router){

  }

  onSelectPhoto(photo: PhotoOBJ) {       
       this.photoStateService.setSelectedPhoto( photo );
       this.router.navigate(['/edit', photo.id]);
  }
}
