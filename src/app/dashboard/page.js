"use client";
import ds from "./style.module.scss";

export default function Dashboard() {
  return (
    <>
      <div className={ds.cardWrap}>
        <div className={ds.setting}>
          <h3 className="p-5">setting zone</h3>
          <div
            draggable={true}
            className={`${ds.cv1}`}
            onDragStart={(e) => {
              console.log("start", e);
            }}
            onDragEnd={(e) => {
              console.log("end", e);
            }}
            onDrop={(e) => {
              console.log("onDrop", e);
            }}
          >
            cv
          </div>
        </div>
        <div
          draggable={true}
          className={ds.map}
          onDrop={(e) => {
            console.log("onDrop", e);
          }}
        >
          <h3 className="p-5">map zone</h3>
        </div>
      </div>
    </>
  );
}
