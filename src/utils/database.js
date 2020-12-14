import { db } from "../firebase";

class Database {
  
  /**
   * Singleton instance
   */
  constructor(){
    if(Database.instance == null){
      this.instance = this;
    }
    return Database.instance;
  }

  /**
   * Retrieve latest gps coordinate from the `Device Coordinates` collection
   * in Firebase
   * @returns GeoPoint
   */
  async getLatestMarker() {
    let latestGeoPoint = await db
      .collection("DeviceCoordinates")
      .doc("67a4d2ba4065c76e")
      .collection("LatLng")
      .orderBy("date-time", "desc")
      .limit(1)
      .get();
    return latestGeoPoint.docs[0].data();
  }

  /**
   * Upload the lat lngs of the geofence vertices to firebase.
   * @param {array} coordinates
   */
  async uploadGeofenceCoordinates(coordinates) {
    await db
      .collection("GeofencePoints")
      .doc("points")
      .set({ latLngArray: coordinates });
  }

  /**
   * Retrieve the geofencePoints array
   */
  async getGeofenceCoordinates() {
    try {
      const coordList = await db
        .collection("GeofencePoints")
        .doc("points")
        .get();
      const destructuredList = coordList.data().latLngArray;
      console.log(destructuredList);
      if (coordList !== null) {
        return destructuredList;
      } else return {};
    } catch (e) {
      console.log(e);
      return {};
    }
  }
}

const database = new Database();
Object.freeze(database);

export default database;
