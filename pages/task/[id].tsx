import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TaskLayout from "../../components/layout/TaskLayout";

type Itarea = {
  title: string;
  description: any;
  id?: string;
};
//field = campos
type Ierror = {
  field: string;
  message: string;
};

export default function TaskUpdate() {
  const router = useRouter();
  const [tarea, setTarea] = useState<Itarea>({
    title: "",
    description: "",
  });
  const [error, setError] = useState<Ierror[]>([]);
  const [data, setData] = useState();
  const handlerTitulo = (e: any) => {
    setTarea({
      ...tarea,
      title: e.target.value,
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

    if (tarea.title === "") {
      errorList.push({
        field: "titulo",
        message: "El campo titulo es requerido",
      });
    } else if (tarea.title.length < 4) {
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
      updateTask();
    }
  };

  const updateTask = () => {
    const objApi = {
      title: tarea.title,
      description: tarea.description,
    };
    //console.log("objApi ==> ", objApi);
    const config: any = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objApi),
    };
    const urlApi = process.env.HOST_NAME_API + "/task/" + tarea.id;
    console.log("urlApi ==> ", urlApi);

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

  const loadData = (id: string) => {
    const config: any = {
      method: "GET",
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
        console.log("mostrar dato del id ==> ", response.data);

        setTarea(response.data);
      });
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      console.log("query.id ==> ", router.query.id);
      loadData(router.query.id);
    }
  }, [router.query]);

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
            <div className="main-logo">Actualizar Task</div>
            <div className="main-title">
              <input
                type="text"
                placeholder="Titulo"
                value={tarea.title}
                onChange={(e) => {
                  handlerTitulo(e);
                }}
              />
            </div>
            <div className="main-description">
              <textarea
                placeholder="Write a description"
                value={tarea.description}
                onChange={(e) => {
                  handlerDescription(e);
                }}
              ></textarea>
            </div>
            <div className="boton-succes">
              <button className="boton" type="submit">
                Actualizar
              </button>
            </div>
          </div>
        </form>
        <div className="espacio">
          <hr />
        </div>
      </TaskLayout>
    </>
  );
}
