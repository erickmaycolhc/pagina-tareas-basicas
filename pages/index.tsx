import { useEffect, useState } from "react";
import TaskLayout from "../components/layout/TaskLayout";

export default function Home() {
  //const [muestra, setActualizaElValor] = useState([]);
  const [task, setTask] = useState([]);

  useEffect(() => {
    const config: any = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const urlApi = "http://localhost:3000/api/task";

    fetch(urlApi, config)
      .then((responsesText: any) => {
        return responsesText.json();
      })
      .then((response: any) => {
        console.log("dddd ==> ", response);
        setTask(response.data);
      });

    //console.log(dbTask.listTask())
  }, []);

  return (
    <>
      <TaskLayout>
        {task.map((element) => {
          const { id, title, description } = element;
          return (
            <div className="father">
              <div className="main-0">
                <h1>{id}</h1>
              </div>
              <div className="main-1">
                <text className="zaa">{title}</text>
                <text className="zee">{description}</text>
              </div>
              <div className="main-2">
                <button className="boton">🗑️ Delete</button>
              </div>
            </div>
          );
        })}
      </TaskLayout>
    </>
  );
}
