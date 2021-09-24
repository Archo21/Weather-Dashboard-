moment().format("L")
var latitude
var longitude
var ApiKey = "4a093989cb6c6f9602f38de0b1bf3e1a"
var citySearch=document.getElementById("city-input");
var search=citySearch.value.trim()
//var cityNameEl = $("<h2>").text(response.name);
  //      var displayMainDate = cityNameEl.append(" " + mainDate);
    //    var tempEL = $("<p>").text("Tempraturer: " + response.main.temp);
      //  var humEl = $("<p>").text("Humidity: " + response.main.humidity);
        //var windEl = $("<p>").text("Wind Speed: " + response.wind.speed);
        //var currentweather = response.weather[0].main;
function fetchcoords (e){

    e.preventDefault()
    var url= "http://api.openweathermap.org/data/2.5/weather?q="+search+"lat&lon=5&appid="+ApiKey
    fetch(url)
    .then(function  (response){
return response.json()
 }).then(function(data){
     if(!data[0]){
         alert("location not found")
        
     }
     else{
         console.log(data[0]);
         latitude = data[0].lat
         longitude = dat[0].lon
weather()
     }

 })
 .catch(function(err){
     console.log(err);
 })
}
    function weather(){
   
     }







        function pageLoad () {
            var lastSearch = JSON.parse(localStorage.getItem("cityName"));
            var searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(lastSearch);
            var psearch = $("<div>");
            psearch.append(searchDiv)
            $("#searchhistory").prepend(psearch);
        }
        
        //Event deligation...
        $("#select-city").on("click", fetchcoords)
        

