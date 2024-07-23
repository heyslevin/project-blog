"use client";

import React from "react";
import { Sun, Moon } from "react-feather";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./DarkLightToggle.module.css";
import { DARK_TOKENS, LIGHT_TOKENS } from "@/constants";
import Cookie from "js-cookie";

function DarkLightToggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    const root = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

    Cookie.set("color-theme", nextTheme, { expires: 1000 });

    root.setAttribute("data-color-theme", nextTheme);
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button className={styles.action} onClick={toggleTheme}>
      {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
