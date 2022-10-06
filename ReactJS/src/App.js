import React, { Component } from 'react';
import "./App.css"

class Home extends Component {
  
  state = {
    show: false,
    data: [],
    rating: 1,
  }
  componentDidMount = () => {
    // Write your code here
    this.handleGetData()
  }
    
  handleGetData = async () => {
    // Write your code here
    const courses = await fetch("http://localhost:8001/courses/get")
          .then(response => response.json())

    this.setState({ data: courses })
  }

  handleApply = async (id) => {
    // Write your code here
      await fetch("http://localhost:8001/courses/enroll/" + id, {
          method: "POST"
      })
  };

  handleRating = (e) => {
    // Write your code here
    this.setState({ rating: e.target.value })
  }

  handleAddRating = async (id) => {
    // Write your code here
      await fetch("http://localhost:8001/courses/rating/" + id, {
          method: "PATCH",
          body: JSON.stringify({
              rating: this.state.rating
          }),
          headers: JSON.stringify({ "Content-Type": "application/json" })
      })
  }

  handleDrop = async (id) => {
    // Write your code here
      await fetch("http://localhost:8001/courses/drop/" + id, {
          method: "DELETE"
      })
  }

  render() {
    return (
      <div className="home">
        <header>
            <h2>ABC Learning</h2>
        </header>
        {/* write your code here */
            this.state.data.map((course, index) => (
                <div className="cardContainer" key={index}>
                    <div className="card">
                    <ul>
                        <div className="header">
                        <li>{course.courseName}</li>
                        <li>{course.courseDept}</li>
                        <li>{course.description}</li>
                                               
                        <li>
                        <li>Rate: 
                            <select className="rating" name="rating" 
                                onChange={this.handleRating}
                                value={this.state.rating}
                            >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            </select>
                            <button className="rate"
                                onClick={() => this.handleAddRating(course._id)}
                            >Add</button>
                        </li>
                            <button className="drop" onClick={() => this.handleDrop(course._id)}>Drop Course</button>
                            <button className="btn" onClick={() => this.handleApply(course._id)}>Apply</button>
                        </li> 
                        <div className="footer">
                        <li>{course.duration} hrs . {course.noOfRatings} Ratings . {course.rating}/5</li>
                        </div>
                        </div>
                    </ul>
                    </div>
                </div>
            )) 
          }
      </div>
    );
  }
}

export default Home;
