import paypal from "paypal-rest-sdk"

paypal.configure({
    mode : 'sandbox',
    client_id : 'AfWr3mJx4yFPuvKPseI8bLml0KADNaNCSHGHOOgBFV23gn8vorhMqhZzceHOQVxgE52-qLHYdvTYFzdT',
    client_secret : 'EKj1AQIANXiq5ZlUu8MajznJKlIJhiCnRoo9K5GF_cnA501vJjRAlQNF8LeXfxE5kQJfTw3AQDaU2gRN',
})

export default paypal