import TaskLayout from "../components/layout/TaskLayout";
import { useEffect, useState } from "react";

export default function Listado() {
  const [task, setTask] = useState([]);
  useEffect(() => {
    const config: any = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const UrlApi = "http://localhost:3000/api/task";

    fetch(UrlApi, config)
      .then((responsesText: any) => {
        return responsesText.json();
      })
      .then((response: any) => {
        console.log("gggggg=>", response);
        setTask(response.data);
      });
  }, []);
  //   return (
  //     <TaskLayout>
  //       {task.map((element) => {
  //         const { id, title, description } = element;
  //         return (
  //           <div className="father">
  //             <div className="main-0">
  //               <h1>{id}</h1>
  //             </div>
  //             <div className="main-1">
  //               <text className="zaa">{title}</text>
  //               <text className="zee">{description}</text>
  //             </div>
  //             <div className="main-2">
  //               <button className="boton">🗑️ Delete</button>
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </TaskLayout>
  //   );
  return (
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
  );
}
