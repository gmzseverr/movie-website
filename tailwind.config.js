const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // <-- BURADAN EMİN OLUN!
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Heroui kullanmadığınız için burayı temiz tutabilirsiniz:
    // "./node_modules/@heroui/theme/dist/components/(alert|button|dropdown|input|menu|modal|navbar|scroll-shadow|table|ripple|spinner|divider|popover|form|checkbox|spacer).js",
  ],
  theme: {
    extend: {
      colors: {
        lightBg: "#F8F8F8",
        darkBg: "#1A1A1A",
        cardLight: "#FFFFFF",
        cardDark: "#2A2A2A",
        textPrimary: "#333333",
        textSecondary: "#4A5568",
        textDarkPrimary: "#E4E4E4",
        textDarkSecondary: "#A0AEC0",
        accent: "#FF6347",
        accentHover: "#FFA07A",
        accentDark: "#FF6B6B",
        accentDarkHover: "#FF8787",
        secondaryAccent: "#ADD8E6",
        secondaryAccentDark: "#7FB3D5",
        success: "#A5D6A7",
        successDark: "#81C784",
        borderLight: "#E0E0E0",
        borderDark: "#444444",
      },
    },
  },
  plugins: [],
};
