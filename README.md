# Trips
This is the Angular component of the trips application. <br />
Other components located in the trips-backend repo are:
<ul>
<li>SpringBoot server + photo directory on that SpringBoot server;</li>
<li>MSSQL data base, where the metadata about the photos and routes per day are located. </li>
</ul>
I assume that the server is running at localhost:8080, as stated in proxy.conf.json.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0.

# Technologies used:
<ul>
<li>Angular 17 stand alone components</li>
<li>Leaflet</li>
</ul>

# To install leaflet stuff(that's to enable the map):
npm i leaflet <br />
npm i --save-dev @types/leaflet <br />
npm install leaflet-routing-machine@latest <br />
npm i --save-dev @types/leaflet-routing-machine <br />

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
ng serve --proxy-config proxy.conf.json

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
