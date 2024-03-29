import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import TaskLayout from "../components/layout/TaskLayout";

export default function Home() {
  //const [muestra, setActualizaElValor] = useState([]);
  const router = useRouter();
  const [task, setTask] = useState([]);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    const config: any = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const urlApi = process.env.HOST_NAME_API + "/task";

    fetch(urlApi, config)
      .then((responsesText: any) => {
        return responsesText.json();
      })
      .then((response: any) => {
        setTask(response.data);
      });
  };

  const handlerDelete = (id: string) => {
    // TODO: Eliminando tarea

    const config: any = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const urlApi = process.env.HOST_NAME_API + "/task/" + id;

    fetch(urlApi, config)
      .then((responsesText: any) => {
        return responsesText.json();
      })
      .then((response: any) => {
        loadData();
      });
  };
  const handlerUpdate = (id: string) => {
    router.push("/task/" + id);
  };

  return (
    <>
      <TaskLayout>
        {task !== undefined ? (
          task.map((element) => {
            const { id, title, description } = element;
            return (
              <div className="father" key={id}>
                <img
                  src="https://blog.flota.es/wp-content/uploads/2018/06/Edades-recomendadas-para-iniciar-a-tus-hijos-en-las-tareas-del-hogar.jpg"
                  width={100}
                  height={100}
                  alt=""
                />
                <div className="main-0">
                  <h1>{id}</h1>
                </div>
                <div className="main-1">
                  <p className="zaa">{title}</p>
                  <p className="zee">{description}</p>
                </div>
                <div className="main-2">
                  <button className="boton" onClick={() => handlerDelete(id)}>
                    🗑️ Delete
                  </button>
                  <button className="boton-2" onClick={() => handlerUpdate(id)}>
                    Actualizar
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </TaskLayout>
    </>
  );
}
