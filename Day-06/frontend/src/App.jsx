import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [userData, setuserData] = useState([]);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");

  const getApihandler = () => {
    axios.get("http://localhost:3000/user").then((res) => {
      // console.log(res.data);
      setuserData(res.data.userDataFetch);
    });
  };

  const handler = (e) => {
    e.preventDefault();
    console.log("form submiited");

    axios
      .post("http://localhost:3000/user", {
        name,
        surname,
        age,
        course,
      })
      .then((res) => {
        console.log(res.data);

        getApihandler();

        setName("");
        setSurname("");
        setAge("");
        setCourse("");
      });
  };

  const deletehandler = (userId) => {
    axios.delete("http://localhost:3000/user/" + userId).then((res) => {
      console.log(res.data);
      getApihandler();
    });

    // console.log(userId)
  };

  useEffect(() => {
    getApihandler();
  }, []);

  return (
    <div className="flex flex-wrap h-screen w-screen bg-black text-white overflow-hidden">
      <form
        onSubmit={handler}
        className="flex flex-col gap-5 h-fit w-fit border-2 border-white"
      >
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="border-2 border-white px-2 m-2"
          type="text"
          name=""
          placeholder="enter you name"
        />
        <input
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
          }}
          className="border-2 border-white px-2 m-2"
          type="text"
          name=""
          placeholder="enter you surname"
        />
        <input
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
          className="border-2 border-white px-2 m-2"
          type="number"
          name=""
          placeholder="enter you age"
        />
        <input
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
          }}
          className="border-2 border-white px-2 m-2"
          type="text"
          name=""
          placeholder="enter you course"
        />

        <button className="text-lg mt-2 bg-amber-400 border-none w-full">
          Submit
        </button>
      </form>

      {userData.map((user, idx) => {
        return (
          <div
            key={idx}
            className="flex items-center justify-center flex-col  text-center m-8 h-[300px] w-[200px] bg-white text-black rounded-xl "
          >
            <h2 className="text-2xl">{user.name}</h2>
            <h2 className="text-2xl">{user.surname}</h2>
            <h2 className="text-2xl">{user.age}</h2>
            <h2 className="text-2xl">{user.course}</h2>

            <button
              onClick={() => {
                deletehandler(user._id);
              }}
              className="text-white border-none px-4 py-2 bg-rose-500 mt-5 rounded active:scale-95 cursor-pointer"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
