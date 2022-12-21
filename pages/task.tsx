import TaskLayout from "../components/layout/TaskLayout";

export default function Task() {
  return (
    <>
      <TaskLayout>
        <div className="goku">
          <div className="midel">
            <div className="gohan">Create a Task</div>
            <div className="raa">
              <input type="text" placeholder=" White a title"></input>
            </div>
            <div className="ree">
              <textarea placeholder="White a description"></textarea>
            </div>
            <div className="rii">
              <button className="botol" type="submit">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </TaskLayout>
    </>
  );
}
