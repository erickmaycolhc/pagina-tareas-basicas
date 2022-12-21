// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getListTask } from "../../database/dbTask";

type Data = {
  name: string;
  edad: number;
  ciudad: string;
  direction: string;
  telefono: number;
};
type Response = {
  code: number;
  message: string;
  data?: Data;
  // edad: any;
  // ciudad: string;
  // dirrecion: string;
  // telefono: number;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Response>
) {
  try {
    const data = await getListTask();

    console.log("gggggg ------> ", data);

    response.status(200).json({
      code: 200,
      message: "Salio perfecto",
      data: data,
    });
  } catch (error) {
    response.status(400).json({
      code: 400,
      message: "Ocurrio un error en el sistema, contactenos",
    });
  }
}
