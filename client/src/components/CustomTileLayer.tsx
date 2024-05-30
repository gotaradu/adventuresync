import L from "leaflet";
import "leaflet/dist/leaflet.css";
import localforage from "localforage";

localforage.config({
  name: "mapTileCache",
  storeName: "tiles",
  driver: localforage.INDEXEDDB,
});

const cacheTile = async (url: string, tileBlob: Blob): Promise<void> => {
  const existingTile = await localforage.getItem<Blob>(url);
  if (!existingTile) {
    localforage.setItem(url, tileBlob);
  }
};

const getTile = async (url: string): Promise<string | null> => {
  const cachedTile = await localforage.getItem<Blob>(url);
  return cachedTile ? URL.createObjectURL(cachedTile) : null;
};

class CachedTileLayer extends L.TileLayer {
  createTile(
    coords: L.Coords,
    done: (error: any, tile: HTMLImageElement) => void
  ): HTMLImageElement {
    const tile = document.createElement("img");
    const url = this.getTileUrl(coords);

    tile.alt = "You are offline";

    if (navigator.onLine) {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch tile: ${response.statusText}`);
          }
          return response.blob();
        })
        .then((tileBlob) => {
          tile.src = URL.createObjectURL(tileBlob);
          cacheTile(url, tileBlob);
          tile.onload = () => done(null, tile);
        })
        .catch((error) => done(error, tile));
    } else {
      getTile(url)
        .then((cachedUrl) => {
          if (cachedUrl) {
            tile.src = cachedUrl;
          } else {
            tile.src = "";
          }
          done(null, tile);
        })
        .catch((error) => done(error, tile));
    }

    return tile;
  }
}

const cachedTileLayer = (url: string, options?: L.TileLayerOptions) => {
  return new CachedTileLayer(url, options);
};

export { CachedTileLayer, cachedTileLayer };
