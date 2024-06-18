export default function Loading() {
  return (
    <div className="loading">
      <p>로딩...</p>
      <style jsx>{`
        .loading {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.8);
          z-index: 1000;
        }
      `}</style>
    </div>
  );
}
