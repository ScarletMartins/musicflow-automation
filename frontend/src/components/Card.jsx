export default function Card({ children }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        {children}
      </div>
    );
  }
  