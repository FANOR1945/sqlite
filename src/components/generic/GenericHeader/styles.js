import { useMemo } from "react";

export default function useStyles(theme = "medical") {
  return useMemo(() => {
    const base = {
        
      root: {
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        display: "flex",
        justifyContent: "center",
      },
      content: {
        maxWidth: "1200px",
        width: "100%",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      left: {
        display: "flex",
        alignItems: "center",
        gap: "2rem",
      },
      title: {
        margin: 0,
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "#2c3e50",
      },
      nav: {
        display: "flex",
        gap: "1rem",
      },
      navBtn: {
        background: "none",
        border: "none",
        fontSize: "1rem",
        fontWeight: 500,
        cursor: "pointer",
        padding: "0.5rem 0.75rem",
        color: "#34495e",
        transition: "color 0.2s ease, transform 0.2s ease",
      },
      right: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      },
      authBtn: {
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: 500,
        border: "1px solid transparent",
        transition: "all 0.2s ease",
      },
      userMenu: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      },
      hamburger: {
  display: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
  background: "none",
  border: "none",
  color: theme === "medical" ? "white" : "#34495e",
},
mobileMenu: {
  display: "none",
  flexDirection: "column",
  gap: "1rem",
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  background: theme === "medical" ? "linear-gradient(135deg, #2ecc71, #27ae60)" : "white",
  padding: "1rem 2rem",
  zIndex: 9999,
}
    };

    const themes = {
      medical: {
        root: {
          ...base.root,
          background: "linear-gradient(135deg, #2ecc71, #27ae60)",
          color: "white",
        },
        title: { ...base.title, color: "white" },
        navBtn: { ...base.navBtn, color: "white" },
      },
      auth: {
        root: {
          ...base.root,
          background: "linear-gradient(135deg, #3498db, #2980b9)",
          color: "white",
        },
        title: { ...base.title, color: "white" },
        navBtn: { ...base.navBtn, color: "white" },
      },
    };

    return { ...base, ...(themes[theme] || {}) };
  }, [theme]);
}
