import { createStorage } from "../database/firebase/storage";

class StorageController {
  constructor(name, adress) {
    this.name = name;
    this.adress = adress;
    this.products = [];
    this.id = "";
  }

  async getLocation() {
    // eslint-disable-next-line no-undef
    var geocoder = new google.maps.Geocoder(this.adress);
    let location;
    await geocoder.geocode(
      { address: this.adress },
      function (results, status) {
        if (status !== "INVALID_REQUEST") {
          location = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
        }
      }
    );
    return location;
  }

  async create() {
    const location = await this.getLocation();
    this.id = await createStorage(this.name, location, this.adress);
    return this.id;
  }
}

export default StorageController;
