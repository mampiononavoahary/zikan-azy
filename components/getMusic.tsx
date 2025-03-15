
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

interface AudioFile {
  name: string;
  path: string;
  artist: string;
  artwork: string;
}

const useLocalMusic = () => {
  const [musicFiles, setMusicFiles] = useState<AudioFile[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        console.warn("❌ Permission refusée pour accéder aux fichiers médias.");
        setHasPermission(false);
        return;
      }

      setHasPermission(true);

      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: 50, // Nombre de fichiers à récupérer
      });

      if (media.assets.length > 0) {
        const formattedTracks = media.assets.map(track => ({
          name: track.filename,
          path: track.uri,
          artist: "Local File",
          artwork: require("../assets/unknown_track.png"), // Image par défaut
        }));

        setMusicFiles(formattedTracks);
        console.log("✅ Musiques récupérées :", formattedTracks);
      }
    })();
  }, []);

  return hasPermission === false ? [] : musicFiles;
};

export default useLocalMusic;

