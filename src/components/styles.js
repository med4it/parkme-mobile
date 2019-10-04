export const buttonText = {
  textTransform: "uppercase",
  color: "white"
};

export const underlinedTextButton = {
  textDecorationLine: "underline",
  textTransform: "uppercase"
};

export const smallButtonText = {
  ...buttonText,
  fontSize: 11
};

export const regularButton = {
  marginVertical: 15
};

export const flatButton = {
  border: 0,
  borderRadius: 0,
  borderWidth: 0,
  padding: 3
};

export const colors = {
  blue: "#0a629d",
  lightGrey: "#666",
  veryLightGrey: "#888"
};

export const textInputTheme = {
  dark: false,
  colors: {
    primary: "white",
    accent: "white",
    background: "rgba(255,255,255, 0.1)",
    surface: "white",
    text: "white",
    placeholder: "white"
  }
};

export const whiteButtonTheme = {
  dark: false,
  colors: {
    primary: "rgba(255,255,255, 1)",
    accent: "rgba(255,255,255, 1)",
    background: "rgba(255,255,255, 1)",
    surface: "rgba(255,255,255, 1)",
    text: "black",
    roundness: 0
  }
};
