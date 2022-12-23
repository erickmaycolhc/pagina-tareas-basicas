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
    const url = "http://localhost:3000/api/task";

    fetch(url, config)
      .then((gggg: any) => {
        return gggg.json();
      })
      .then((response: any) => {
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
            <div className="father" key={id}>
              <div className="main-0">
                <h1>{id}</h1>
              </div>
              <div className="main-1">
                <p className="zaa">{title}</p>
                <p className="zee">{description}</p>
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
