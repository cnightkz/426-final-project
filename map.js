
var L;

window.onload = function() {
  L.mapquest.key = 'g35eHBz9AG9uFnWoGwMH4GWCXLKlVRXF';

  
  var map = L.mapquest.map('map', {
    center: [23.1291, 113.2644],
    
    layers: L.mapquest.tileLayer('map'),
    zoom: 12
  });

  // 2. Add control
  map.addControl(L.mapquest.control());

  // 3. Add icon
  L.marker([23.1291, 113.2644], {
    icon: L.mapquest.icons.marker({
      primaryColor: '#22407F',
      secondaryColor: '#3B5998',
      shadow: true,
      size: 'md',
      symbol: 'A'
    })
  })
  .bindPopup('This is Guangzhou. My hometown!')
  .addTo(map);

}