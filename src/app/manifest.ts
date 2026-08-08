import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Smarter Release Engineering",
    short_name: "SRE",
    description: "Architecting, automating, and continuously improving software delivery systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#38bdf8",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
