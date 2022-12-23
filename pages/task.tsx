// import TaskLayout from "../components/layout/TaskLayout";

// export default function Task() {
//   return (
//     <>
//       <TaskLayout>
//         <div className="goku">
//           <div className="midel">
//             <div className="gohan">Create a Task</div>
//             <div className="raa">
//               <input type="text" placeholder=" White a title"></input>
//             </div>
//             <div className="ree">
//               <textarea placeholder="White a description"></textarea>
//             </div>
//             <div className="rii">
//               <button className="botol" type="submit">
//                 Enviar
//               </button>
//             </div>
//           </div>
//         </div>
//       </TaskLayout>
//     </>
//   );
// }
import { useRouter } from "next/router";
import { useState } from "react";
import TaskLayout from "../components/layout/TaskLayout";

type Itarea = {
  titulo: string;
  description: any;
};
//field = campos
type Ierror = {
  field: string;
  message: string;
};
export default function Task() {
  const router = useRouter();
  const [tarea, setTarea] = useState<Itarea>({
    titulo: "",
    description: "",
  });
  const [error, setError] = useState<Ierror[]>([]);
  const [data, setData] = useState(false);
  const handlerTitulo = (e: any) => {
    setTarea({
      ...tarea,
      titulo: e.target.value,
    });
  };
  const handlerDescription = (e: any) => {
    setTarea({
      ...tarea,
      description: e.target.value,
    });
  };

  const subiDiv = (e: any) => {
    //e.prevenDefault();
    e.preventDefault();

    let errorList = [];

    if (tarea.titulo === "") {
      errorList.push({
        field: "titulo",
        message: "El campo titulo es requerido",
      });
    } else if (tarea.titulo.length < 4) {
      errorList.push({
        field: "titulo",
        message: "El campo title tiene que tener mas de 4 caracteres",
      });
    }
    if (tarea.description === "") {
      errorList.push({
        field: "titulo",
        message: "El campo description es requerido",
      });
    } else if (tarea.description.length < 4) {
      errorList.push({
        field: "description",
        message: "El campo description tiene que tener mas de 4 caracteres",
      });
    }
    // validando si existe error
    if (errorList.length > 0) {
      setError(errorList);
    } else {
      setError([]);
      setData(true);
      // encargado de registrar la tarea
      saveTask();
    }
  };

  const saveTask = () => {
    const objApi = {
      title: tarea.titulo,
      description: tarea.description,
    };
    //console.log("objApi ==> ", objApi);
    const config: any = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objApi),
    };
    const urlApi = "http://localhost:3000/api/task";

    fetch(urlApi, config)
      .then((responsesText: any) => {
        console.log("responsesText ==> ", responsesText);
        return responsesText.json();
      })
      .then((response: any) => {
        console.log("dddd ==> ", response);
        router.push("/");
      });
  };

  return (
    <>
      <TaskLayout>
        <form onSubmit={(e) => subiDiv(e)}>
          <div className="error-block">
            <ul className="style-fond">
              {error.map((err) => {
                return <li key={err.message}>{err.message}</li>;
              })}
            </ul>
          </div>

          <div className="father-succes">
            <div className="main-logo">Create a Task</div>
            <div className="main-title">
              <input
                type="text"
                placeholder="Write a title"
                onChange={(e) => {
                  handlerTitulo(e);
                }}
              />
            </div>
            <div className="main-description">
              <textarea
                placeholder="Write a description"
                onChange={(e) => {
                  handlerDescription(e);
                }}
              ></textarea>
            </div>
            <div className="boton-succes">
              <button className="boton" type="submit">
                Enviar
              </button>
            </div>
          </div>
        </form>
        <div className="espacio">
          <hr />
        </div>
      </TaskLayout>
      {data === true ? (
        <>
          <div className="grup-div">
            <h3>Resultados</h3>
            <div>
              <div className="color-1">tarea: {tarea?.titulo}</div>
              <div className="color-2">description: {tarea?.description}</div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
