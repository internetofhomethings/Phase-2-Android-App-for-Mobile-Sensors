// ----------------------------------------------
// Javascript/jquery for app startup index.html
// ----------------------------------------------
//
// -----------------------------------------------------------
// Set height of container to height of window
// min-height supports small devices that cannot fit
// entire container on 1 screen
// -----------------------------------------------------------
$(".contentContainer").css("min-height",$(window).height() );

// -----------------------------------------------------------
// Collapse menu after item is clicked
// -----------------------------------------------------------
$(".nav a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
   $(".collapse").collapse('hide');
});

// -----------------------------------------------------------
// Called when window is resized
// -----------------------------------------------------------
window.addEventListener('resize', function(event){

});

//------------------------------------------
// Globals
//------------------------------------------

options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0
};

var save2filestring = "csv"; //Global variable for sensor readings in csv format.
var gpssavestring = "";
var sensavestring = "";

//------------------------------------------
// Functions triggered after page loaded
//------------------------------------------
jQuery(window).load(function () {
	navigator.geolocation.watchPosition(onGeoSuccess, onGeoError, options);
});

//--------------------------------------------
// onGeoSuccess Geolocation
//--------------------------------------------
function onGeoSuccess(position) {
	if ( onGeoSuccess.busy == undefined ) {
		onGeoSuccess.busy = 0;
	}
	if(onGeoSuccess.busy == 0 ) {
		onGeoSuccess.busy = 1;
		var latt = position.coords.latitude.toFixed(7).toString();
		var long = position.coords.longitude.toFixed(7).toString();
		$("#Lat").html(latt.substring(0, 11));
		$("#Lon").html(long.substring(0, 12));
		$("#Speed").html(position.coords.speed);
		$("#Altitude").html(position.coords.altitude);
		$("#Heading").html(position.coords.heading);
		$("#GpsTimestamp").html(position.timestamp);
		gpssavestring = position.timestamp + "," 
		              + latt.substring(0, 11) 
		              + "," + long.substring(0, 12)
		              + "," + position.coords.speed
		              + "," + position.coords.altitude;
		updateWeatherSensorData();
		onGeoSuccess.busy = 0;
	}
	//save2filestring += "\n";
	//saveData2File();
}

//--------------------------------------------
// onGeoError Callback receives a PositionError object
//--------------------------------------------
function onGeoError(error) {
	$("#GpsTimestamp").html( 'Failed GPS');
}

//--------------------------------------------
//Update WeatherSensor Data
//--------------------------------------------
function updateWeatherSensorData() {
	requestURL = "http://192.168.22.1:9703/?request=GetSensors";
	if ( updateWeatherSensorData.timeout == undefined ) {
		updateWeatherSensorData.timeout = 0;
		updateWeatherSensorData.busy = 0;
	}
	//Get Weather Sensor Value
	$.ajax({
		url: requestURL,
		error: function(error){
			if(updateWeatherSensorData.timeout++ <10) {
				setTimeout(updateWeatherSensorData, 1000);
			}
			else {
				updateWeatherSensorData.timeout = 0;
			}
		},
		success: function(thedata){
		    if(updateWeatherSensorData.busy == 0) {
		        updateWeatherSensorData.busy = 1;
				$("#tempBaro").html(thedata.B_Temperature);
				$("#presBaro").html(thedata.B_Pressure);
				$("#humidity").html(thedata.DH_Humidity);
				$("#systime").html(thedata.SYS_Time);
				$("#sysheap").html(thedata.SYS_Heap);
				$("#sysloop").html(thedata.SYS_Loopcnt);
				sensavestring = "," + thedata.B_Temperature 
								+ "," + thedata.DH_Temperature
								+ "," + thedata.B_Pressure
								+ "," + thedata.DH_Humidity
								+ "," + thedata.SYS_Time
								+ "," + thedata.SYS_Heap
								+ "," + thedata.SYS_Loopcnt + "\n";
		        saveData2File();
		        updateWeatherSensorData.busy = 0;
		    }
			updateWeatherSensorData.timeout = 0;
		},
		timeout: 7000 // sets timeout to 7 seconds
	});
}
//--------------------------------------------
//Update Save Data to File 
//--------------------------------------------
function saveData2File() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}
function gotFS(fileSystem) {
    fileSystem.root.getFile("mydata/dsa.csv", {create: true, exclusive: false}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
    if(gotFileWriter.started == undefined) {
        gotFileWriter.started = 0;
        gotFileWriter.tosave = "initial";
    }
    if(gotFileWriter.started!=1234) {
        if(writer.length>0) {
            writer.truncate(0);
        }
	    writer.seek(0);
	    writer.write("timestamp,lat,lon,spd,alt,btmp,dtmp,bp,dh,syst,sysh,syslp\n");
        gotFileWriter.started=1234;
    }
    if(gotFileWriter.tosave != gpssavestring) {
        save2filestring = gpssavestring + sensavestring;
        gotFileWriter.tosave = gpssavestring; 
        writer.seek(writer.length);
        writer.write(save2filestring);
    }
}

function fail(error) {
    //console.log(error.code);
}

//--------------------------------------------
//Update GUI Clock
//--------------------------------------------
function updateClock() {
	var now = new Date(), // current date
		months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var hour = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
		hour = hour < 10 ? '0' + hour : hour;
	var ampm = now.getHours() > 12 ? ' PM' : ' AM';
	var secd = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
	var minu = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
		time = hour + ':' + minu + ':' + secd + ampm;
		timeloc =time + '  California, USA';
		// a cleaner way than string concatenation
		date = [now.getDate(),
				months[now.getMonth()],
				now.getFullYear()].join(' ');

	// set the content of the element with the ID date & time
	 $(".date").html("Date: " + date);
	 $(".time").html("Time: " + timeloc);
	 $("#timenow").html(time);
	 //saveData2File();
}


//--------------------------------------------
//Periodic tasks (1 sec interval)
//--------------------------------------------

window.setInterval(function() {
	updateClock();
}, 1000);

//--------------------------------------------
// Cordova is ready (Callback)
//--------------------------------------------
function onDeviceReady() {
	//alert('ready /n');
}

