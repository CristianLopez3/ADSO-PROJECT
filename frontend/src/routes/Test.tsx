import ProtectedRoute from "@/components/Auth/ProtectedRoute";

const Test = () => {
  return (
    <ProtectedRoute>
      <h1
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "2rem",
          marginTop: "1rem",
        }}>This is for test cases.</h1>
    </ProtectedRoute>
  )
};

export default Test;