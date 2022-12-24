// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getListTask, saveTask } from "../../database/dbTask";

type Data = {
  titulo: string;
  description: any;
};
type Response = {
  field: number;
  message: string;
  data?: Data;
  // edad: any;
  // ciudad: string;
  // dirrecion: string;
  // telefono: number;
};

export default async function Task(
  request: NextApiRequest,
  response: NextApiResponse<Response>
) {
  switch (request.method) {
    case "GET":
      return getLitApi(request, response);
    case "POST":
      return save(request, response);

    default:
      return response.status(400).json({
        field: 400,
        message: "Bad request",
      });
  }
}

const getLitApi = async (
  request: NextApiRequest,
  response: NextApiResponse<Response>
) => {
  try {
    const regresoDato = await getListTask();

    response.status(200).json({
      field: 200,
      message: "Salio perfecto",
      data: regresoDato,
    });
  } catch (error) {
    response.status(400).json({
      field: 400,
      message: "Ocurrio un error en el sistema, contactenos",
    });
  }
};

const save = async (
  request: NextApiRequest,
  response: NextApiResponse<Response>
) => {
  try {
    const { title, description } = request.body;

    const responseDB = await saveTask(title, description);

    response.status(200).json({
      field: 200,
      message: "Salio perfecto",
    });
  } catch (error) {
    response.status(400).json({
      field: 400,
      message: "Ocurrio un error en el sistema, contactenos",
    });
  }
};
