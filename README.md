<h2><strong>Android-App-for-Mobile-Sensors</strong></h2>

This project is an Android App developed using standard Web technologies:

    -HTML5
    -CSS
    -JAVASCRIPT

This project was built using Cordova Android Platform

Version: 3.6.4

and Eclipse

Version: 4.2.1.v20130118-173121-9MF7GHYdG0B5kx4E_SkfZV-1mNjVATf67ZAb7
Build id: M20130204-1200

The App is designed to interface with an ESP8266 using the following Github code:

https://github.com/internetofhomethings/Phase-1-ESP8266-Web-Server-for-Mobile-Sensors

The Smartphone hosting this App needs to be connected to the ESP8266 via Wifi. Once the ESP8266
is running, the Smartphone should connect to the ESP8266 using the following SSID:

ESP8266N4

For the initial release, a GUI will be displayed upon App launch with the following 13 parameters:

1. Baro Temperature
2. Baro Pressure
3. Humidity
4. System Time
5. System Heap
6. System Iterations
7. Latitude
8. Longitude
9. Heart Rate
10. Speed
11. Altitude
12. Heading
13. GPS Timestamp

Revision History:

Initial Release:         July 13, 2015. 

Phase 2: Data Recorder:  August 16, 2015 
Change: Data Recorder added to save data points to a file on an Android device SDCard. The default file saved is:

<SDCARD>/mydata/dsa.csv

Each time the app is run, the default data file is overwritten. The file name should be renamed from the prior
run if it is to be preserved.

Data is saved in CSV format every time a new GPS data set is received. The following fields are saved to the CSV file:

<table>
<tr>
<th>Field</th>
<th>Units</th>
</tr>
<tr>
<td>1. UTC</td>
<td>Milliseconds</td>
</tr>
<tr>
<td>2. Latitude</td>
<td>Degrees</td>
</tr>
<tr>
<td>3. Longitude</td>
<td>Degrees</td>
</tr>
<tr>
<td>4. Speed</td>
<td>Mph</td>
</tr>
<tr>
<td>5. Altitude</td>
<td>Feet</td>
</tr>
<tr>
<td>6. Temperature</td>
<td>Degrees F</td>
</tr>
</table>
7. Tempreature (Humid Sensr) - Degrees F
8. Barometric Pressure       - inches Hg
9. Humidity                  - Percent
10.ESP8266 System time       - Seconds
11.ESP8266 Free Heap         - Bytes
12.ESP8266 loop() iteration  - Loops




