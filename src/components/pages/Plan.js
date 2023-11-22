import React from "react";
import '../../App.css';
import './Plan.css';

const Plan = () => {

  const tasks = [
    {
      "heading": "API Endpoint",
      "detail": "Airedale cheeseburger ricotta who moved my cheese cauliflower " +
        "cheese cow cheese on toast fromage.",
      "category": "Development",
      "status": "Not Started"
    },
    {
      "heading": "Slack Integration",
      "detail": "Parmesan cheddar taleggio fromage frais cheesecake fondue " +
        "pepper jack red leicester.",
      "category": "Reading",
      "status": "In Progress"
    },
    {
      "heading": "Learn Go",
      "detail": "Danish fontina cheesy grin cut the cheese ricotta taleggio " +
        "fromage camembert de normandie cheesy.",
      "category": "Development",
      "status": "In Progress"
    },
    {
      "heading": "IAM on AWS",
      "detail": "Lancashire stinking bishop feta. Parmesan smelly cheese " +
        "ricotta cream cheese who moved my cheese.",
      "category": "Development",
      "status": "Not Started"
    }
  ];

  const getTaskCategoryClassName = (category) => {
    switch (category) {
      case "Development":
        return "category-dev"
      case "Reading":
        return "category-reading"
      default:
        break;
    }
  };

  const getTaskStatusClassName = (status) => {
    switch (status) {
      case "Not Started":
        return "status-notstarted"
      case "In Progress":
        return "status-inprogress"
      default:
        break;
    }
  }

  return (
    <>
      <section className='tasks'>
        {tasks.map(function(task, i) {
          return (
            <div key = {i} className='task'>
              <div className="head">{task.heading}</div>
              <div className="detail">{task.detail}</div>
              <div className="categorystatus">                
                <div className={getTaskCategoryClassName(task.category)}>{task.category}</div>
                <div className={getTaskStatusClassName(task.status)}></div>
              </div>
              <hr></hr>
            </div>
          )
        })}
      </section>
    </>
  );
}

export default Plan;