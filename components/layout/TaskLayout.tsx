import Link from "next/link";

type Props = {
  children: React.ReactNode;
};
export default function TaskLayout({ children }: Props) {
  return (
    <>
      <div className="papa">
        <div className="centro">
          <div className="izquierda">
            <Link href={"/"} className="boton izquierdo">
              Task App
            </Link>
          </div>
          <div className="derecha">
            <Link href={"task"} className="boton derecho">
              + Add Task
            </Link>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
