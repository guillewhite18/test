import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log(req.body);

      const response = await axios.post('https://5eed24da4cbc340016330f0d.mockapi.io/api/newsletter', req.body);
      res.status(200).json({ message: 'Datos enviados con éxito', data: response.data });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || 'Error al enviar los datos';
        console.error('Error al enviar los datos:', error);
        res.status(500).json({ error: errorMessage });
      } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected error' });
      }
    }
  } else {
    res.status(405).end();
  }
}
