//import { Component, OnInit, ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import * as L from 'leaflet';  // Import Leaflet
import 'leaflet-routing-machine';
import { StopOBJ, StopsByDateResponse } from '../../stopOBJ';
import { StopsService } from '../../services/stops.service';

@Component({
  selector: 'app-stops',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './stops.component.html',
  styleUrl: './stops.component.css'
})
export class StopsComponent  implements AfterViewInit {
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;
  @ViewChild('distance1', { static: false }) distanceElement!: ElementRef;
  
  private map: any;
  private stops : StopOBJ[] = [];  
  private datetaken : string ='';

  constructor(private el: ElementRef, 
              private stopsService : StopsService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngAfterViewInit(): void {  
    this.route.paramMap.subscribe((params ) => {
      console.log(params.get("datevisited"));
      this.loadAndDisplayStopsForDay( params.get("datevisited") );            
    });
    
  }

  loadAndDisplayStopsForDay( datetaken : any){
    this.stopsService.getRouteForDay( datetaken).subscribe({    
      next: data => {
        console.log('JSON Data:', data);
        this.stops = data.listStops; 
        this.datetaken = data.date; 
        //sort the array according to dayorder
        this.stops.sort((a, b) => a.dayorder - b.dayorder);
        for (let i = 0; i < this.stops.length; i++) {
          console.log( this.stops[i].name +" order in the day "+this.stops[i].dayorder); 
        }
        // Initialize the map after the view has been fully initialized
        this.initializeMap();      
      },
      error: error => {
        console.error('Error fetching JSON data for getting route per day:', error)
      }}
    );
  }

  // Initialize the Leaflet map
  initializeMap() {
    //// Ensure mapElement is available
    //if (this.mapElement && this.mapElement.nativeElement)
    
    // Create a map object and set the view to a specific location with a zoom level    
    this.map = L.map(this.mapElement.nativeElement).setView([32.210597, 35.160943], 8);

    // Add a tile layer to the map (This uses OpenStreetMap tiles as an example)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    
    let waypointsThatDay = this.stops.map(stop => L.latLng(stop.latitude, stop.longitude));

            // Use Leaflet Routing Machine to create a route
            var route1 = L.Routing.control({
              waypoints: waypointsThatDay,
              router: L.Routing.osrmv1({
                  serviceUrl: 'https://router.project-osrm.org/route/v1' // OSRM route service
              }),
              lineOptions: {
                  styles: [
                      { 
                          color: 'red',     // Line color
                          weight: 3,         // Line width
                          opacity: 0.7//,      // Line opacity
                          //dashArray: '5, 5'  // Dash pattern for the line (optional)
                      }
                  ],
                  extendToWaypoints: true,
                  missingRouteTolerance: 4
              },
              //createMarker: function() { return null; }, // Hide default markers            
              //createMarker: () => null,
              routeWhileDragging: false,
              show: false // Hide itinerary panel
          }).addTo(this.map);
                   
    // Add the points to the map (if any)
    let mydate = this.datetaken;    
    let myAngularRouter = this.router;
    this.stops.forEach(point => {
      let marker = L.marker([point.latitude, point.longitude]) // Use appropriate field names
        .addTo(this.map)
        .bindPopup(`<b>${point.name}</b>
          <br>
          <button class="show-pics-btn${point.id}">Show Pics</button>`); // Customize the popup as needed
    
      // Add click event for the "Show Pics" button in the popup
      marker.on('popupopen', () => {
        // Attach a click event to the button inside the popup
        let button = document.querySelector('.show-pics-btn'+point.id) as HTMLButtonElement;
        button.addEventListener('click', () => {
          // Navigate programmatically to the route
          console.log('stopsComponent in CLICK', point.name, mydate);
          myAngularRouter.navigate(['/stops', mydate, 'picByRoute', point.id, mydate]);
        });
      });
    });    
    
    //calculate total distance
    let writeElement = this.distanceElement.nativeElement;
    route1.on('routesfound', function(e) {
      var routes = e.routes;
      var distanceKm = (routes[0].summary.totalDistance / 1000).toFixed(2);            
      writeElement.innerText = 'Total distance: ' +distanceKm+"km.";
  });

   }
}
