const RZP_KEY = `${import.meta.env.VITE_RAZORPAY_KEY_ID}`;

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (
      document.querySelector(
        "script[src='https://checkout.razorpay.com/v1/checkout.js']"
      )
    ) {
      resolve(true); // Already loaded
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
export const razorpayCheckout = (order, user) => async (dispatch) => {
  const options = {
    key: RZP_KEY,
    amount: order.amount,
    currency: order.currency,
    name: "NutriXConnect",
    description: "Buying the plan",
    order_id: order.id,
    handler: async function (response) {
      console.log("Payment successful", response);
      alert("Payment successful");
    },
    theme: {
      color: "#F37254",
    },
  };
  try {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay loading is failed. Please try again");
      return;
    }
    const rzp = new Razorpay(options);
    rzp.open();
  } catch (e) {
    console.error(e);
    alert("Failed to initiate Razorpay. Please try again.");
  }
};
