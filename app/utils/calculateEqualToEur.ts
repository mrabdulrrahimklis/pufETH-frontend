export const calculateEqualToEur = (currency: string, amount: number) => {
  if (currency === "BTC") {
    return amount * parseFloat(localStorage.getItem("BTC") || "0");
  }

  if (currency === "CHF") {
    return amount * parseFloat(localStorage.getItem("CHF") || "0");
  }

  if (currency === "USD") {
    return amount * parseFloat(localStorage.getItem("USD") || "0");
  }
}