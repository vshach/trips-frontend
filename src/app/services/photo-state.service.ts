import { Injectable } from '@angular/core';
import { PhotoOBJ } from '../photoOBJ';

@Injectable({
  providedIn: 'root'
})
export class PhotoStateService {

  constructor() { }

  private selectedPhoto: PhotoOBJ | null = null;

  setSelectedPhoto(photo: PhotoOBJ): void {
    this.selectedPhoto = photo;
  }

  getSelectedPhoto(): PhotoOBJ | null {
    return this.selectedPhoto;
  }

  clearSelectedPhoto(): void {
    this.selectedPhoto = null;
  }

}
