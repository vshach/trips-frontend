import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs'; 
import { PhotoOBJ } from '../photoOBJ';
//import { PhotoUpdateDTO } from '../photoUpdateDTO';
import { map, filter, catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {    

  constructor( private http:HttpClient ) { }

  //pics taken from the given date onwards
  getPhotos(locId: number, dateTaken: string) : Observable<any> {
    return this.http.get<PhotoOBJ[]>('/server/api/v1/photos/'+locId+'/'+dateTaken);
    /*return this.http.get<PhotoOBJ[]>('/server/api/v1/photos/'+locId+'/'+dateTaken).pipe(
      // Here you can process the data as needed
      map(response => {
        //find the path for every photo
        return response.map( pic => this.getFullPath( pic))
      })
    );*/
  }

  //pics taken on exact date
  getPhotosExact(locId: number, dateTaken: string) : Observable<any> {
    return this.http.get<PhotoOBJ[]>('/server/api/v1/photos/exact/'+locId+'/'+dateTaken);
    /*return this.http.get<PhotoOBJ[]>('/server/api/v1/photos/exact/'+locId+'/'+dateTaken).pipe(
      // Here you can process the data as needed
      map(response => {
        //find the path for every photo
        return response.map( pic => this.getFullPath( pic))
      })
    );*/
  }
    
  monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  //from database to storage
  //2023-01-16  -> 2023/01Jan-16/ +filepath
  public getFullPath( pic : PhotoOBJ ) : string {     
    var dateSplit : string [] = pic.dateTaken.split('-');
    var monthNumber : number = Number.parseInt( dateSplit[1]);
    var fullPath = dateSplit[0]+'/'+dateSplit[1]+ this.monthNames[monthNumber-1] +'-'+dateSplit[2]+'/';
    return fullPath + pic.filepath;
 }

 apiUploadUrl = "/server/api/v1/files/upload";
 uploadData(formData: FormData): Observable<any> {
    return this.http.post(this.apiUploadUrl, formData);
 } 

 apiUpdatePhotoData = "/server/api/v1/photos/update";
 updatePhoto( photoOBJ: PhotoOBJ) : Observable<any> {
  //return this.http.put<PhotoUpdateDTO>(`${this.apiUpdatePhotoData}/${photoDTO.id}`, photoDTO);//that will send a body
    const params = new HttpParams()
      .set('locationId', photoOBJ.locationID.toString())
      .set('people', photoOBJ.people)
      .set('date', photoOBJ.dateTaken);
    console.log(params.toString());

    return this.http.put(`${this.apiUpdatePhotoData}/${photoOBJ.id}`, null, { params });
 }
}
