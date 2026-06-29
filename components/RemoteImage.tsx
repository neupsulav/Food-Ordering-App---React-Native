import { Image } from "react-native";
import React, { ComponentProps, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type RemoteImageProps = {
  path?: string | null;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, "source">;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!path) return;

    // If it's a direct local URI (e.g. from ImagePicker), display it directly
    const isLocalUri =
      path.startsWith("file://") ||
      path.startsWith("content://") ||
      path.startsWith("data:");

    if (isLocalUri) {
      setImage(path);
      return;
    }

    let isMounted = true;

    (async () => {
      if (!isMounted) return;
      setImage("");

      // If path is a full Supabase URL, extract the relative file path for download.
      // E.g., https://.../product_images/filename.jpg -> filename.jpg
      let relativePath = path;
      if (path.startsWith("http")) {
        const parts = path.split("product_images/");
        if (parts.length > 1) {
          relativePath = parts[1];
        }
      }

      const { data, error } = await supabase.storage
        .from("product_images")
        .download(relativePath);

      if (error) {
        console.log("Error downloading image from supabase:", error.message);
        // Fallback: If download fails but path is a full URL, load it directly
        if (path.startsWith("http") && isMounted) {
          setImage(path);
        }
      }

      if (data && isMounted) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          if (isMounted) {
            setImage(fr.result as string);
          }
        };
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [path]);

  return <Image source={{ uri: image || fallback }} {...imageProps} />;
};

export default RemoteImage;
