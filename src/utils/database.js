import { db } from "../firebase";

class Database {
  constructor() {}

  /**
   * Singleton instance
   */
  static instance = new Database();

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
}

export default Database;
