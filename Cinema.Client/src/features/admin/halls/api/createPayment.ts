// Хардкодимо згідно з бекендом, де Online = 1
export const PaymentMethod = {
    Online: 1 
} as const;

export type PaymentMethodType = typeof PaymentMethod[keyof typeof PaymentMethod];

export interface PaymentResponse {
    value: string;      // 'data' для LiqPay
    signature: string;  // 'signature' для LiqPay
}

export const initializePayment = async (orderId: number, method: PaymentMethodType): Promise<PaymentResponse> => {
    const response = await fetch("/api/Payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            orderId: orderId,
            paymentMethod: method // Відправить 1
        })
    });

    if (!response.ok) throw new Error("Payment initialization failed");
    return response.json();
};

// Хелпер для редіректу залишається без змін
export const submitLiqPayForm = (data: string, signature: string) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.liqpay.ua/api/3/checkout';
    
    const inputs = { data, signature };
    Object.entries(inputs).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
};