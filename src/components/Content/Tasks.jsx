import React, { useState } from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import addDays from "date-fns/addDays";
import isToday from "date-fns/isToday";

const FORMAT = "dd/MM/yy";
const task_heading = {
    INBOX: 'Inbox',
    TODAY: "Today",
    NEXT_7: "Next 7 Days"
}

const TaskItems = ({ selectedTab, task }) => {
    let tasksToRender = [...task];
    if (selectedTab === "NEXT_7") {
        tasksToRender = tasksToRender.filter(
            (task) =>
                isAfter(task.date, new Date()) &&
                isBefore(task.date, addDays(new Date(), 7))
        );
    }

    if (selectedTab === 'TODAY') {
        tasksToRender = tasksToRender.filter(task => isToday(task.date));
    }
    return (
        <div className="tasks-item-container">
            {tasksToRender.map((task) =>
                <div className="task-item">
                    <p>{task.text}</p>
                    <p>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
                </div>)
            }
        </div>
    )
}
const AddTask = ({ onCancel, onAddTask }) => {
    const FORMAT = "dd/MM/yyyy";

    function formatDate(date, format, locale) {
        return dateFnsFormat(date, format, { locale });
    }

    const [date, setDate] = useState(null);
    const [task, setTask] = useState("");
    return (
        <div className='add-task-dialog'>
            <input value={task} onChange={(event) => setTask(event.target.value)} />
            <div className="add-task-actions-container">
                <div>

                    <button disabled={!task} className='add-btn'
                        onClick={() => {
                            onAddTask(task, date);
                            onCancel();
                            setTask("");
                        }}
                    >Add Task</button>

                    <button className='cancel-btn'
                        onClick={() => {
                            onCancel();
                            setTask("");
                        }}
                    >Cancel</button>
                </div>

                <DayPickerInput onDayChange={day => setDate(day)}
                    formatDate={formatDate}
                    format={FORMAT}
                    dayPickerProps={{
                        modifiers: {
                            disabled: [{ before: new Date() }],
                        },
                    }}
                    placeholder={`${dateFnsFormat(new Date(), FORMAT)}`} />

            </div>
        </div>
    )
}
const Tasks = ({ selectedTab }) => {

    const [showAddtask, setShowAddTask] = useState(false);
    const [task, setTask] = useState([]);

    const addNewTask = (text, date) => {
        const newTaskItem = { text, date: date || new Date() };
        setTask((prevState) => [...prevState, newTaskItem]);
    }

    return (
        <div className="tasks">
            <h2>{task_heading[selectedTab]}</h2>
            {selectedTab === 'INBOX' ?
                <div className='add-task-btn' onClick={() => setShowAddTask((prevState) => !prevState)}>
                    <span className="plus">+</span>
                    <span className="add-task-text">Add Task</span>
                </div>
                :
                null
            }
            {
                showAddtask && (<AddTask onCancel={() => setShowAddTask(false)} onAddTask={addNewTask} />)
            }
            {task.length > 0 ? (<TaskItems task={task} selectedTab={selectedTab} />) : <p>No task</p>}

        </div>
    )
}
export default Tasks