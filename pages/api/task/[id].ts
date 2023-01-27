import { NextApiRequest, NextApiResponse } from "next";
import {
  consultaPorId,
  deleteTaskDB,
  updateTaskDB,
} from "../../../database/dbTask";

type Data = {
  titulo: string;
  description: any;
};
type Response = {
  field: number;
  message: string;
  data?: Data;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Response>
) {
  switch (request.method) {
    case "DELETE":
      return deleteTask(request, response);
    case "PUT":
      return updateTask(request, response);
    case "GET":
      return getByIdTask(request, response);

    default:
      return response.status(400).json({
        field: 400,
        message: "Bad request",
      });
  }
}

const deleteTask = async (
  request: NextApiRequest,
  response: NextApiResponse<Response>
) => {
  const { id } = request.query;

  try {
    // TODO: Consultamos si existe el ID de la tarea
    const queryId = await consultaPorId(id);

    if (queryId.length > 0) {
      await deleteTaskDB(id);
      response.status(200).json({
        field: 200,
        message: "Se elimino correctamente",
      });
    } else {
      response.status(400).json({
        field: 400,
        message: "No se encontro una tarea",
      });
    }
  } catch (error) {
    response.status(400).json({
      field: 400,
      message: "Ocurrio un error en el sistema, contactenos",
    });
  }
};

const updateTask = async (
  request: NextApiRequest,
  response: NextApiResponse<Response>
) => {
  const { id } = request.query;

  try {
    const { title, description } = request.body;

    const response = await updateTaskDB(id, title, description);

    response.status(200).json({
      field: 200,
      message: "Se actualizo con exito",
    });
  } catch (error) {
    response.status(400).json({
      field: 400,
      message: "Ocurrio un error en el sistema, contactenos",
    });
  }
};

const getByIdTask = async (
  request: NextApiRequest,
  response: NextApiResponse<Response>
) => {
  const { id } = request.query;

  try {
    // TODO: Consultamos si existe el ID de la tarea
    const queryId = await consultaPorId(id);

    response.status(200).json({
      field: 200,
      message: "Se actualizo con exito",
      data: queryId[0],
    });
  } catch (error) {
    response.status(400).json({
      field: 400,
      message: "Ocurrio un error en el sistema, contactenos",
    });
  }
};
