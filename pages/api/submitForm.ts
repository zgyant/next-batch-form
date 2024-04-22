import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

//init a PrismaClient
const prisma = new PrismaClient();

/**
 * Function to generate random uuid based on the quantity
 * @param quantity 
 * @returns 
 */
function generateSerialNumbers(quantity:number) {
  const serialNumbers = [];
  for (let i = 0; i < quantity; i++) {
    const serialNumber = uuidv4();
    serialNumbers.push(serialNumber);
  }
  return serialNumbers;
}

/**
 * Generic function that can be used to POST data using prisma
 * @param req 
 * @param res 
 * @returns 
 */
export default async function submitForm(req: NextApiRequest, res: NextApiResponse) {
    //only enable post for the shake of this we dont need other methods
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    //insert in batches table
    const formEntry = await prisma.Batches.create({
      data: {
        model: req.body.model,
        licenseLevel: req.body.licenseLevel,
        quantity: req.body.quantity,
        comment: req.body.comment,
        formDate: req.body.formDate,
      },
    });

    //Generate unique serial numbers for each machine number entry
    const serialNumbers = generateSerialNumbers(req.body.quantity);

    //Create entries in the 'MachineNumbers' table
    const machineNumberEntries = await Promise.all(
      serialNumbers.map((serialNumber: any) =>
        prisma.MachineNumber.create({
          data: {
            serialNumber: serialNumber,
            batch: { connect: { id: formEntry.id } },
          },
        })
      )
    );

    return res.status(201).json({ success: true, data: machineNumberEntries });
  } catch (error) {
    console.error('Error submitting form:', error);

    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {

    await prisma.$disconnect();
  }
}