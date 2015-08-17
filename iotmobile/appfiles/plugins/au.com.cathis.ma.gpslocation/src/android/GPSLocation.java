package au.com.cathis.ma;

//Cordova imports

//Android imports
import android.location.LocationListener;
import android.location.LocationManager;
import android.util.Log;


public class CarrierPlugin extends CordovaPlugin implement LocationListener {
  public LocationListener locationListener;
  public String latitude, longitude;


	getCurrentPosition();
        callbackContext.success(latitude);
      System.err.println("Exception: " + e.getMessage());

  public void getCurrentPosition() {
    locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, this);
  }

  @Override
  public void onLocationChanged(Location location) {
    latitude = String.valueOf(location.getLatitude());
    longitude = String.valueOf(location.getLongitude());
  }
 
  @Override
  public void onProviderDisabled(String provider) {
    Log.d("Latitude","disable");
  }
 
  @Override
  public void onProviderEnabled(String provider) {
    Log.d("Latitude","enable");
  }
 
  @Override
  public void onStatusChanged(String provider, int status, Bundle extras) {
    Log.d("Latitude","status");
  }