import ls from "./style.module.scss";

export default function ListPage() {
  return (
    <>
      <div className={ls.wrap}>
        <div className={ls.imgCard}>img</div>
        <div className={ls.textCard}>text</div>
      </div>
    </>
  );
}
