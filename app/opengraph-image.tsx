import { ImageResponse } from "next/og";
import { person } from "@/data/resume";

export const alt = `${person.name} · ${person.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const subtitle = `${person.role}. ${person.headline}`;
  const footerRight = "Full-stack · GenAI · Data";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0A0F1C",
          color: "#E9EEF7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#34D399",
              color: "#06140F",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            {person.initials}
          </div>
          <div style={{ display: "flex", marginLeft: 20, fontSize: 28, color: "#34D399" }}>
            {person.availability}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700 }}>{person.name}</div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 40, color: "#98A3B8", maxWidth: 960 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#98A3B8" }}>
          <div style={{ display: "flex" }}>{person.location}</div>
          <div style={{ display: "flex", color: "#F59E0B" }}>{footerRight}</div>
        </div>
      </div>
    ),
    size
  );
}
