import { postItem } from "../../../../api/api";

export const PaymentMethod = {
    Online: 1,
    Cash: 2
} as const;

export type PaymentMethodType = typeof PaymentMethod[keyof typeof PaymentMethod];

export interface TicketShortDto {
    id: number;
    seatNumber: number;
    row: number;
}

export interface PaymentDetailsDto {
    paymentId: number;
    amount: number;
    paymentDate: string;
    paymentStatus: number;
    paymentMethod: PaymentMethodType;
    externalTransactionId: string; 
    orderId: number;
    checkoutUrl: string;           
    signature?: string;            
    tickets: TicketShortDto[];
}

export const initializePayment = async (orderId: number, method: PaymentMethodType): Promise<PaymentDetailsDto> => {
    const response = await postItem<any, PaymentDetailsDto>("Payment/initialize", {
        orderId: orderId,
        paymentMethod: method
    });

    return (response as any).data || response;
};


export const submitLiqPayForm = (payment: PaymentDetailsDto) => {
  // LiqPay Checkout URL завжди сталий для API 3
  const LIQPAY_API_URL = "https://www.liqpay.ua/api/3/checkout";

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = LIQPAY_API_URL; // Відправляємо на справжній LiqPay, а не на те, що в JSON
  form.target = '_blank'; // Відкрити в новій вкладці

  // Поле 'data': у твоєму випадку це те, що прийшло в 'checkoutUrl'
  const dataInput = document.createElement('input');
  dataInput.type = 'hidden';
  dataInput.name = 'data'; 
  dataInput.value = payment.checkoutUrl; 
  form.appendChild(dataInput);

  // Поле 'signature': у твоєму випадку це те, що прийшло в 'externalTransactionId'
  const sigInput = document.createElement('input');
  sigInput.type = 'hidden';
  sigInput.name = 'signature';
  sigInput.value = payment.externalTransactionId; 
  form.appendChild(sigInput);

  document.body.appendChild(form);
  form.submit();
  
  // Видаляємо форму з документа
  setTimeout(() => {
    document.body.removeChild(form);
  }, 100);
};