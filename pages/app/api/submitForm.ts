import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from 'prisma';

const prisma = new PrismaClient();

/**
 * Generic function that can be used to POST data using prisma
 * @param req 
 * @param res 
 * @returns 
 */
export default async function dataRequester(req: NextApiRequest, res: NextApiResponse) {
    //only enable post as for the sake of this we dont need other methods
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const formEntry = await prisma.formEntry.create({
      data: req.body,
    });

    return res.status(201).json({ success: true, data: formEntry });
  } catch (error) {
    console.error('Error submitting form:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}