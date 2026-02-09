export const PaymentMethod = {
    Online: 1 
} as const;

export type PaymentMethodType = typeof PaymentMethod[keyof typeof PaymentMethod];

export interface PaymentResponse {
    // Змінюємо назви полів, щоб вони відповідали JSON з твого логу
    checkoutUrl: string;           // Це твоя 'data' (Base64)
    externalTransactionId: string; // Це твоя 'signature'
    paymentStatus: string;
    amount: number;
}

export const initializePayment = async (orderId: number, method: PaymentMethodType): Promise<PaymentResponse> => {
    // Додаємо /initialize, бо твій контролер чекає саме цей шлях
    const response = await fetch("/api/Payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            orderId: orderId,
            paymentMethod: method 
        })
    });

    if (!response.ok) throw new Error("Payment initialization failed");
    return response.json();
};

export const submitLiqPayForm = (data: string, signature: string) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://www.liqpay.ua/api/3/checkout";
    form.acceptCharset = "utf-8";
    form.target = "_blank";
    const dataInput = document.createElement("input");
    dataInput.type = "hidden";
    dataInput.name = "data";
    dataInput.value = data; 
    form.appendChild(dataInput);

    const signatureInput = document.createElement("input");
    signatureInput.type = "hidden";
    signatureInput.name = "signature";
    signatureInput.value = signature; 
    form.appendChild(signatureInput);

    document.body.appendChild(form);
    form.submit();
};