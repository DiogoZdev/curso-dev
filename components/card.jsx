export function Card({ title, text, isOk }) {
  return (
    <>
      <style>{`
        .card {
          padding: 1rem;
          border-radius: 15px;
          margin: 1rem 0;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        }

        .circle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: ${isOk ? "#4CAF50" : "red"};
        }

        h2 {
          font-size: 1.5rem;
        }

      `}</style>

      <div className="card">
        <div className="circle"></div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
  </>
  )
}
