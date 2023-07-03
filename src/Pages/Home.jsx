import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTask,
  deleteTask,
  getAllTask,
  setAllTask,
  updateTaskStatus,
} from "../Redux/Action";
import {
  ADD_NEW_TASK_REQ,
  DELETE_TASK_REQ,
  GET_ALL_TASK_REQ,
  UPDATE_TASK_STATUS_REQ,
} from "../Redux/ActionType";
import { logout } from "../Redux/authReducer/authActions";
import "./Table.css";
const InitialData = {
  title: " ",
  status: false,
  _id: "",
};

const Home = () => {
  const token2 = JSON.parse(sessionStorage.getItem("token"));
  const AllTasks = useSelector((store) => store.tasks.AllTasks);
  const LoadingType = useSelector((store) => store.tasks.LoadingType);
  // const [taskToShow,setTaskToShow]=useState([])

  const [updatingData, setUpdatingData] = useState({});

  const [taskName, setTaskName] = useState({
    title: "",
    status: false,
  });

  const [edit, setEdit] = useState({
    title: " ",
    status: false,
    _id: "",
  });
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const Dispatch = useDispatch();
  const handleAddTask = async (e) => {
    e.preventDefault();

    let newTask = { ...taskName };

    await Dispatch(addNewTask(token2, newTask));
    Dispatch(getAllTask(token2));
    setTaskName(InitialData);
  };
  const handleDeleteTask = (id) => {
    console.log("id in homepage", id);
    Dispatch(deleteTask(id));
  };
  const handleToggleStatus = async (data) => {
    //   console.log(data)
    let updatedData = {
      ...data,
      status: !data.status,
    };
    // console.log("data 1",updatingData)
    await setUpdatingData(updatedData);
    //    await console.log("data 2",updatingData)
    await Dispatch(updateTaskStatus(updatedData));
    //    console.log("data 3",updatingData)
  };
  // console.log(AllTasks)

  const handleEditing = (id) => {
    setEdit({
      ...edit,
      _id: id,
    });
  };

  const handleSaveEdit = (e, item) => {
    e.preventDefault();
    console.log(e);
    let editedData = {
      title: edit.title != "" || " " ? edit.title : e.target.value,
      status: item.status,
      _id: item._id,
    };
    // console.log(item)
    Dispatch(updateTaskStatus(editedData));
    Dispatch(getAllTask(token2));
    setEdit(InitialData);
  };
  function sortAndFilterArray(array, text) {
    // Filter objects that do not contain the input text
    const filteredArray = array.filter((obj) =>
      obj.title.toLowerCase().includes(text)
    );

    // Sort the filtered array alphabetically based on the title
    const sortedArray = filteredArray.sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    return sortedArray;
  }

  useEffect(() => {
    console.log("Loading Type is :", LoadingType);
    // Dispatch(getAllTask())
    // let data =AllTasks.filter((el)=>el.title.toLowerCase().includes(searchText))
    const sortedAndFilteredArray = sortAndFilterArray(
      AllTasks,
      searchText.toLocaleLowerCase()
    );

    if (searchText.length) {
      // Dispatch(getAllTask())

      Dispatch(setAllTask(sortedAndFilteredArray));
    } else {
      console.log("token from add task", token2);
      Dispatch(getAllTask(token2));
    }
    setSearchData(sortedAndFilteredArray);
  }, [searchText.length, Dispatch]);

  // console.log(AllTasks,token2)
  console.log(LoadingType);
  console.log(updatingData);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "right", width: "100%" }}>
        <button onClick={() => Dispatch(logout())}>Log Out from here</button>
      </div>
      <h1>Add Task</h1>

      <div className="form-container">
        <h2> Add Task</h2>

        <form id="add_task_input">
          <div className="form-group">
            <input
              type="text"
              placeholder="task name"
              value={taskName.title}
              onChange={(e) =>
                setTaskName({ ...taskName, title: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              disabled={LoadingType == ADD_NEW_TASK_REQ}
              value={
                LoadingType == ADD_NEW_TASK_REQ ? "Adding Task..." : "All Tasks"
              }
              onClick={handleAddTask}
            />
          </div>
        </form>
      </div>

      <div
        style={{
          display: "grid",
          gap: "4px",
          border: "1px solid gray",
          margin: "2rem",
        }}
      >
        <div
          style={{
            width: "100%",
            border: "1px solid teal",
            backgroundColor: "gray",
          }}
        >
          <div id="search-task">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            {/* <div id="search-data">
                            {
                              searchData?.map((el)=>{
                                    return <div key={el._id}>
                                        {el.title}
                                        </div>
                                })
                            }

                        </div> */}
          </div>
        </div>
        <table id="myTable">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {AllTasks.map((item, index) => (
              <tr key={index}>
                <td>
                  <h3>{index + 1}</h3>
                </td>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  {
                    <form
                      style={{ width: "100%" }}
                      onSubmit={(e) => handleSaveEdit(e, item)}
                    >
                      {edit._id !== item._id && (
                        <p
                          style={{ marginLeft: "1rem" }}
                          onClick={() => handleEditing(item._id)}
                        >
                          {item.title}
                        </p>
                      )}
                      {edit._id == item._id && (
                        <input
                          autoFocus
                          onBlur={(e) => handleSaveEdit(e, item)}
                          onFocus={(e) =>
                            setEdit({
                              ...edit,
                              title: e.target.value,
                              _id: item._id,
                            })
                          }
                          type="text"
                          value={edit.title == " " ? item.title : edit.title}
                          onChange={(e) =>
                            setEdit({
                              ...edit,
                              title: e.target.value,
                              _id: item._id,
                            })
                          }
                          style={{
                            padding: ".5rem",
                            background: "0",
                            border: "none",
                            fontSize: "24px0",
                            textAlign: "center",
                            marginLeft: "1rem",
                            width: "100%",
                          }}
                        />
                      )}
                    </form>
                  }
                </td>

                <td
                  style={
                    item.status ? { color: "#4CAF50" } : { color: "#3463ff" }
                  }
                >
                  {LoadingType == UPDATE_TASK_STATUS_REQ &&
                  updatingData._id == item._id
                    ? "Changing..."
                    : ` ${item.status ? "Complete" : "Incomplete"}`}
                </td>
                <td>
                  <button
                    onClick={() => handleToggleStatus(item)}
                    disabled={LoadingType == UPDATE_TASK_STATUS_REQ}
                  >
                    Toggle Status
                  </button>
                  <button onClick={() => handleDeleteTask(item._id)}>
                    {LoadingType == DELETE_TASK_REQ ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {LoadingType == GET_ALL_TASK_REQ && <h1>Loading...</h1>}
      </div>
    </div>
  );
};

export default Home;
