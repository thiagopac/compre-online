const customColor1 = "#e74c3c";
const customColor2 = "#c4151c";
const dangerColor = "#ff0000";

export default {
  login: {
    backgroundColor: customColor2,
    buttonBackground: "#0057B8",
    textColor: "#fff",
    inputBorderColor: "#ddd",
    linkColor: "#0057B8",
  },
  button: {
    text: "#000",
    background: "#fff",
    tint: customColor1,
    tabIconDefault: "#ccc",
    tabIconSelected: customColor1,
  },
  tab: {
    activeTintColor: customColor1,
  },
  text: {
    primary: "#000",
    secondary: "#777",
  },
  category: {
    itemBackground: "#f0f0f0",
    textColor: customColor1,
  },
  menu: {
    backgroundColor: "#fff",
    textColor: "#000",
    borderColor: "#cccccc",
    logoutButtonColor: customColor2,
    iconTintColor: "#000",
  },
  productList: {
    backgroundColor: "#fff",
    borderColor: "#dfdfdf",
    priceColor: "#333",
    addButtonColor: "#000",
    badgeBackgroundColor: "rgba(0, 0, 0, 0.5)",
    badgeTextColor: "#fff",
  },
  productDetails: {
    backgroundColor: "#fff",
    textColor: "#000",
    selectedOptionBackground: "#000",
    selectedOptionText: "#fff",
    unselectedOptionBackground: "#f0f0f0",
    unselectedOptionText: "#000",
    buttonBackground: "#000",
    buttonText: "#fff",
    controlButtonBackground: "#ddd",
    controlTextColor: "#000",
    pageTitleColor: "#000",
  },
  cart: {
    removeProductButtonBackgroundColor: dangerColor,
  },
};
