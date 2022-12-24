import { useEffect, useState } from "react";
import TaskLayout from "../components/layout/TaskLayout";
import { useRouter } from "next/router";

export default function Home() {
  //const [muestra, setActualizaElValor] = useState([]);
  const router = useRouter();
  const [task, setTask] = useState([]);
  useEffect(() => {
    loadData();

    //console.log(dbTask.listTask())
  }, []);
  const loadData = () => {
    const config: any = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const urlApi = process.env.HOST_NAME_API + "/task";
    console.log("urlApi ==> ", urlApi);
    fetch(urlApi, config)
      .then((responsesText: any) => {
        return responsesText.json();
      })
      .then((response: any) => {
        console.log("dddd ==> ", response);
        setTask(response.data);
      });
  };

  // useEffect(() => {
  //   const config: any = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const urlApi = process.env.HOST_NAME_API + "/task";

  //   fetch(urlApi, config)
  //     .then((gggg: any) => {
  //       return gggg.json();
  //     })
  //     .then((response: any) => {
  //       setTask(response.data);
  //     });

  //   //console.log(dbTask.listTask())
  // }, []);
  const handlerDelete = (id: string) => {
    // TODO: Eliminando tarea
    console.log("handlerDelete ==>", id);
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
        console.log("dddd ==> ", response);
        loadData();
      });
  };
  const handlerUpdate = (id: string) => {
    router.push("/task/" + id);
  };

  return (
    <>
      <TaskLayout>
        {task.map((element) => {
          const { id, title, description } = element;
          return (
            <div className="father" key={id}>
              <img
                src="https://economipedia.com/wp-content/uploads/Taylor.jpg"
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
        })}
      </TaskLayout>
    </>
  );
}
