import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  infoWindows: any = [];
  markers: any = [
    {
      title: "Market Square Bus Terminal",
      latitude: "-17.83687",
      longitude:"31.04193"
    },
    {
      title: "Busstop Lightgrove",
      latitude: "-17.852923",
      longitude:"31.025920"
    },
    {
      title: "Busstop Sucess Auto",
      latitude: "17.85639",
      longitude:"31.01605"
    },
    {
      title: "Busstop Montana Carswell Meats",
      latitude: "-17.858259",
      longitude:"31.017078"
    },
    {
      title: "Gomo Busstop",
      latitude: "-17.860383",
      longitude:"31.018329"
    },
    {
      title: "Southerton Post Office Busstop",
      latitude: "-17.862328",
      longitude:"31.018329"
    },
    {
      title: "Busstop",
      latitude: "-17.868383",
      longitude:"31.013101"
    },
    {
      title: "Busstop",
      latitude: "-17.868847",
      longitude:"31.012605"
    },
    {
      title: "Fleming Busstop",
      latitude: "-17.871339",
      longitude:"31.009306"
    },
    {
      title: "Guildford Busstop",
      latitude: "-17.869417",
      longitude:"31.008466"
    },
    {
      title: "Britannia Round About",
      latitude: "-17.866843",
      longitude:"31.007509"
    },
    {
      title: "Lyndon Moore/Copper Chadwick Busstop",
      latitude: "-17.865318",
      longitude:"31.005247"
    },
    {
      title: "Lyndon Moore/Boydway Busstop",
      latitude: "-17.865745",
      longitude:"31.004468"
    }
  ];

  constructor() {}

  ionViewDidEnter() {
    this.showMap();
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
                              '<h2 id="firstHeading"class"firstHeading">' + marker.title + '</h2>' +
                              '<p>Latitude: ' + marker.latitude + '</p>' +
                              '<p>Longitude: ' + marker.longitude + '</p>' +
                              '<ion-button id="navigate">Navigate</ion-button>' +
                            '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('navigate').addEventListener('click', () => {
          console.log('navigate button clicked!');
          // code to navigate using google maps app
          window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.latitude + ',' + marker.longitude);
        });
      });

    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  showMap() {
    const location = new google.maps.LatLng(-17.824858, 31.053028);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);
  
}