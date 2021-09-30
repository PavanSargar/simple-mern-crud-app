import React, { useState, useEffect } from "react";
import Axios from "axios";

//React Bootstrap components
import { Button, Form, Container, Card, Row, Col } from "react-bootstrap";
import UpdateModal from "./Modal";

//bootstrap & custom css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");

  const [friendList, setFriendList] = useState([]);

  //fetching data in database when document loads
  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((response) => setFriendList(response.data))
      .catch((err) => console.log(err));
  }, []);

  //inserting friend
  const addFriend = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/insert", { name, age, description })
      .then((response) =>
        setFriendList([
          ...friendList,
          {
            _id: response.data._id,
            name: name,
            age: age,
            description: description,
          },
        ])
      )
      .catch(() => console.log("it didn't work!"));

    //clearing out input fields after adding freinds
    setName("");
    setAge("");
    setDescription("");
  };

  //updating freinds 
  const saveUpdatedData = (data) => {
    //holding data to dynamically update on frontend
    const newName = data.name;
    const newAge = data.age;
    const newDescription = data.description;

    Axios.put("http://localhost:3001/update", {
      newName: data.name,
      newAge: data.age,
      newDescription: data.description,
      id: data.id,
    }).then(() => {
      setFriendList(
        friendList.map((friend) => {
          //checking if the friend Id from database is equal to the one we are updating
          return friend._id === data.id
            ? {
                _id: data.id,
                name: newName,
                age: newAge,
                description: newDescription,
              }
            : friend;
        })
      );
    });
    console.log(data);
  };

  //delete freind
  const deleteFriend = (id) => {
    //simply delete with friend with it's id as params
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setFriendList(
        //filter and show only friends with ids which are not equal to clicked or id to delete
        friendList.filter((friend) => {
          return friend._id !== id;
        })
      );
    });
  };

  return (
    <Container className="app">
      <Container className="inputs">
        <h1>Your Friends List!</h1>
        <Form>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            className="input"
          />

          <Form.Control
            onChange={(e) => setAge(e.target.value)}
            value={age}
            type="number"
            placeholder="Age"
            className="input"
          />

          <Form.Control
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            type="text"
            value={description}
            className="input"
          />

          <Button
            disabled={!name || !age || !description}
            size="lg"
            variant="outline-light"
            onClick={addFriend}
          >
            Add
          </Button>
        </Form>
      </Container>

      <Container className="friend-list">
        <Row className="justify-content-md-center">
          <h2>Friends</h2>
          {friendList.map((friend) => {
            return (
              <Col xs={12} md={4}>
                <Card className="friend-card">
                  <Card.Body>
                    <Card.Title>{friend.name}</Card.Title>
                    <h5>{friend.age}</h5>
                    <Card.Text>{friend.description}</Card.Text>
                  {/* bootstrap cusotm modal component, getting data as a function params */}
                    <UpdateModal
                      id={friend._id}
                      onSaveUpdateData={saveUpdatedData}
                    />
                    <Button
                      onClick={() => deleteFriend(friend._id)}
                      className="friend-card-btn"
                      variant="outline-dark"
                      size="md"
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
}

export default App;
