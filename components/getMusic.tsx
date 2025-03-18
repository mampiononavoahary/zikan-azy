
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

interface AudioFile {
  name: string;
  path: string;
  artist: string;
  artwork: string | null;
}

const useLocalMusic = () => {
  const [musicFiles, setMusicFiles] = useState<AudioFile[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      console.log("🔄 Demande de permission pour accéder aux fichiers média...");
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        console.warn("❌ Permission refusée.");
        setHasPermission(false);
        return;
      }

      setHasPermission(true);
      console.log("✅ Permission accordée !");

      let media = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
        first: 1000,
      });

      if (media.assets.length === 0) {
        console.warn("⚠️ Aucun fichier audio trouvé !");
      } else {
        console.log(`✅ ${media.assets.length} fichiers audio trouvés.`);
      }

      const formattedTracks = media.assets.map((track) => ({
        name: track.filename,
        path: track.uri,
        artist: "Local File",
        artwork: null, // Pas de require() ici
      }));

      setMusicFiles(formattedTracks);
      console.log("🎵 Musiques récupérées :", formattedTracks);
    })();
  }, []);

  return hasPermission === false ? null : musicFiles;
};

export default useLocalMusic;

