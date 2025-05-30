
import { MercadoPagoConfig, Preference, OAuth } from "mercadopago";
import { createClient } from "@supabase/supabase-js";
import { getProductById } from "./app/server/api";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
 

const apiMP = {
  user: {
    async fetch() {
      // Obtenemos los datos de la tabla 'admin' desde Supabase
      const { data, error } = await supabase
        .from('split')
        .select('*')
        .single();  // Asegura que solo devuelvas un objeto
    
      if (error) {
        throw new Error(`Error al obtener los datos del admin: ${error.message}`);
      }
      console.log("data:",data)
      console.log("marketplace:",data.marketplace)
      console.log("Hora del fetch:", new Date().toISOString());

      // Devolvemos los datos del usuario
      return data

    },
    
    async update(data) {
      // Actualizamos los datos en Supabase
      const { error } = await supabase
      .from('split')
      .update(data)  // Actualiza la fila existente con los datos proporcionados
      .eq('id', 1);  // Filtra para asegurar que actualizas la fila correcta (en este caso, la fila con id 1)
  
      if (error) {
        throw new Error(`Error al actualizar los datos del admin: ${error.message}`);
      }
  
      // Si quieres devolver los datos actualizados (opcional)
    
      return data;
    },
    async authorize() {
      // Obtenemos la url de autorización
      const url = new OAuth(mercadopago).getAuthorizationURL({
        options: {
          client_id: process.env.NEXT_PUBLIC_MP_CLIENT_ID,
          redirect_uri: `${process.env.APP_URL}/api/mercadopago/connect`,
        },
      });

      // Devolvemos la url
      return url;
    },
    async connect(code) {
      // Obtenemos las credenciales del usuario usando el code que obtuvimos de oauth
      const credentials = await new OAuth(mercadopago).create({
        body: {
          client_id: process.env.NEXT_PUBLIC_MP_CLIENT_ID,
          client_secret: process.env.MP_CLIENT_SECRET,
          code,
          redirect_uri: `${process.env.APP_URL}/api/mercadopago/connect`,
        },
      });

      // Devolvemos las credenciales
      return credentials;
    },
  },

  purchases: {
    async list() {
      // Realizamos la consulta a la tabla 'purchases'
      const { data, error } = await supabase
        .from('purchases')
        .select('*');
      
      if (error) {
        throw new Error(error.message);
      }
    
      
      return data; // Devolvemos los datos obtenidos
    },
    
    // Función para agregar una compra
    async add(dataClient,cart, totalPrice, id_payment, status_payment) {
      console.log("precio total:",totalPrice)
      // Agregamos la nueva compra a la tabla de 'purchases'
      const { error: insertError } = await supabase
        .from('purchases')
        .insert([
          {
          id_payment: id_payment,
          status: status_payment,
          total_price: totalPrice,
          products:cart,
          name: dataClient.name,
          document: Number(dataClient.document),
          cp: Number(dataClient.cp),
          street: dataClient.street,
          heigth_street: Number(dataClient.heigth_street),
          floor_departament: Number(dataClient.floor_departament),
          number_departament: dataClient.number_departament,
          email: dataClient.email,
          phone: Number(dataClient.phone)
          } 
        ]);
    
      if (insertError) {
        throw new Error(insertError.message);
      }
    },
    async submit(dataClient, marketplace) {
      console.log("data:",dataClient);
     
      const client = new MercadoPagoConfig({ accessToken: marketplace });
      // Generar los ítems a partir del carrito
      // Obtener los productos con detalles completos
      const cart = await Promise.all(
        JSON.parse(dataClient.products).map(async (product) => {
          const productData = await getProductById(product.id); // Obtener info desde la DB
          console.log("precio:",productData.price);
          return {
            id: productData.id,
            title: productData.name,
            unit_price: productData.price,
        quantity: product.quantity,
      };
    })
  );
    
      // Calcular el total y la comisión (10%)
      const totalPrice = cart.reduce((acc, product) => acc + product.unit_price * product.quantity, 0);
      const marketplaceFee = totalPrice * 0.1;
      console.log("cart:",cart);
    
      const preference = await new Preference(client).create({
        body: {
          items:cart,
          metadata:dataClient,
          marketplace_fee: marketplaceFee,
          back_urls: {
            success: `${process.env.BASE_URL}/api/payment-success?text=${encodeURIComponent(items)}`,
            failure: `${process.env.BASE_URL}/api/payment-failed`,
            pending: `${process.env.BASE_URL}/api/payment-pending`,
          },
          auto_return: "approved",
        },
      });

    
      return preference.init_point;


    }
   
    
  },
};

export default apiMP;
