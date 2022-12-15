import { useParams } from "react-router-dom";

function User() {
  let name = useParams().name;
  const updateRoom = async () => {
    try {
        //const response = await fetch(`http://192.168.1.109:3001/rooms/update/${name}`, {
      const response = await fetch(`http://localhost:3001/rooms/update/${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };


  return (
    <div>
      <h1>User: {name}</h1>
     
      <button onClick={updateRoom} >update</button>
    </div>
  );
}

export default User;
