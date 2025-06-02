import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Alert } from "react-bootstrap";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAdd = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task }]);
      setTask("");
      setShowAddAlert(true);
      setTimeout(() => setShowAddAlert(false), 1500);
    }
  };

  const handleDelete = () => {
    if (deleteIndex !== null) {
      const updated = [...tasks];
      updated.splice(deleteIndex, 1);
      setTasks(updated);
      setShowConfirmDelete(false);
      setDeleteIndex(null);
    }
  };

  const handleComplete = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
    setShowCongrats(true);
    setTimeout(() => setShowCongrats(false), 2000);
  };

  const filteredTasks = tasks.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        body {
          background-color: #000;
          color: #fff;
          font-style: italic;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h2 {
          color: #FFEA00;
          font-size: 3rem;
          text-align: center;
          text-shadow: 0 0 2px #FFEA00, 0 0 4px #FFEA00;
          margin: 20px 0;
        }

        .neon-input-small {
          width: 180px;
          border-radius: 20px;
          background-color: #111;
          color: #FFEA00;
          padding: 8px 20px;
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          border: none;
        }

        .neon-input-small:hover,
        .neon-input-small:focus {
          box-shadow: 0 0 20px #FFEA00;
          outline: none;
        }

        .add-input {
          border-radius: 20px;
          background-color: #111;
          color: #FFEA00;
          padding: 10px 16px;
          font-size: 14px;
          border: none;
          width: 240px;
          height: 40px;
          margin-right: 8px;
        }

        .add-input:focus {
          outline: none;
          box-shadow: 0 0 10px #FFEA00, 0 0 20px #FFEA00;
        }

        .btn-add {
          background-color: #000;
          color: #FFEA00;
          border-radius: 20px;
          font-size: 14px;
          padding: 10px 16px;
          border: none;
          height: 40px;
          transition: 0.2s;
        }

        .btn-add:hover {
          background-color: #FFEA00;
          color: #000;
          box-shadow: 0 0 15px #FFEA00;
        }

        .list-group-item {
          background-color: #111;
          color: #fff;
          border: none;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 30px;
          position: relative;
        }

        .list-group-item::before {
          content: "•";
          position: absolute;
          left: 10px;
          color: #FFEA00;
          font-size: 20px;
        }

        .btn-delete, .btn-complete {
          background-color: #000;
          border: none;
          margin-left: 10px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
          transition: 0.2s;
        }

        .btn-delete {
          color: #FF4C4C;
        }

        .btn-complete {
          color: #00FF00;
        }

        .btn-delete:hover {
          background-color: #FF4C4C;
          color: #000;
          box-shadow: 0 0 15px #FF4C4C;
        }

        .btn-complete:hover {
          background-color: #00FF00;
          color: #000;
          box-shadow: 0 0 15px #00FF00;
        }

        .highlighted-task {
          background-color: #222;
          box-shadow: 0 0 15px #FFEA00;
          transition: 0.3s ease-in-out;
        }

        /* RESPONSIVE STYLES */

        @media (max-width: 576px) {
          .neon-input-small {
            position: static;
            width: 90vw;
            margin: 10px auto 30px auto;
            display: block;
            box-sizing: border-box;
          }

          .add-input {
            width: 90vw !important;
            margin-right: 0 !important;
            margin-bottom: 8px;
            height: 40px;
          }

          .btn-add {
            width: 90vw !important;
            border-radius: 20px;
            height: 40px;
          }

          .d-flex.justify-content-center.mt-4 {
            flex-direction: column !important;
            align-items: center;
          }
        }
      `}</style>

      <div className="container py-5">
        <h2>📝 To-Do List</h2>

        <input
          type="text"
          placeholder="Search..."
          className="neon-input-small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="d-flex justify-content-center mt-4">
          <input
            type="text"
            className="add-input"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button className="btn btn-add" onClick={handleAdd}>
            Add
          </button>
        </div>

        <ul className="list-group mt-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((item, index) => {
              const isHighlighted =
                search.trim() !== "" &&
                item.text.toLowerCase().includes(search.toLowerCase());

              return (
                <li
                  key={index}
                  className={`list-group-item ${isHighlighted ? "highlighted-task" : ""}`}
                >
                  <span>{item.text}</span>
                  <div>
                    <button
                      className="btn-complete"
                      onClick={() => handleComplete(index)}
                    >
                      Complete
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => {
                        setDeleteIndex(index);
                        setShowConfirmDelete(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="list-group-item text-center text-muted">
              No tasks found
            </li>
          )}
        </ul>

        {/* Popup - Task Added */}
        {showAddAlert && (
          <Alert
            variant="success"
            className="position-fixed top-0 start-50 translate-middle-x mt-3"
            style={{ zIndex: 1050 }}
          >
            Task added successfully!
          </Alert>
        )}

        {/* Popup - Confirm Delete */}
        <Modal
          show={showConfirmDelete}
          onHide={() => setShowConfirmDelete(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Popup - Task Complete */}
        {showCongrats && (
          <Alert
            variant="success"
            className="position-fixed bottom-0 start-50 translate-middle-x mb-3"
            style={{ zIndex: 1050 }}
          >
            🎉 Congratulations on completing the task!
          </Alert>
        )}
      </div>
    </>
  );
}

export default App;
