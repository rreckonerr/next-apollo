import { hex2Rgba } from "./index";

// const color = {
//   primary: "#9e9e9e",
//   primaryLight: "#cfcfcf",
//   primaryDark: "#707070",
//   secondary: "#f44336",
//   secondaryLight: "#ff7961",
//   secondaryDark: "#ba000d",
//   postBackground: "#ffffff",
//   fontOnDark: "#ffffff",
//   fontOnLight: "#000000",
//   black: "#000000",
//   white: "#ffffff"
// };

const color = {
  primary: "#673ab7",
  primaryLight: "#9a67ea",
  primaryDark: "#320b86",

  secondary: "#26c6da",
  secondaryLight: "#6ff9ff",
  secondaryDark: "#0095a8",

  postBackground: "#ffffff",

  fontOnDark: "#ffffff",
  fontOnLight: "#000000"
};

// const color = {
//   primary: "#4caf50",
//   primaryLight: "#80e27e",
//   primaryDark: "#087f23",

//   secondary: "#ffeb3b",
//   secondaryLight: "#ffff72",
//   secondaryDark: "#c8b900",

//   postBackground: "#ffffff",

//   fontOnDark: "#ffffff",
//   fontOnLight: "#000000"
// };

export const theme = {
  color,
  elevation: {
    property: "box-shadow",
    transition: {
      duration: "280ms",
      effect: "cubic-bezier(.4, 0, .2, 1)"
    },
    colors: {
      umbra: () => hex2Rgba(color.black, 0.2),
      penumbra: () => hex2Rgba(color.black, 0.14),
      ambient: () => hex2Rgba(color.black, 0.12)
    }
  }
};
