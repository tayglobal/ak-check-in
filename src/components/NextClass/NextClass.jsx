import "./NextClass.css";
import { useCheckInContext } from "../../context/CheckInContext";
import {
  filterStudentsByClass,
  checkStudentsStatus,
} from "../../utils/studentSorting";
import Clock from "../Clock";
import logo from "../../assets/logo192.png";

const NextClass = () => {
  const { nextClassData, students, lightMode } = useCheckInContext();

  const {
    start_time = "00:00",
    title = "No Next Class",
    id,
    icon,
  } = nextClassData || {};
  const currentClassStudents = filterStudentsByClass(students, id);
  const { totalCount } = checkStudentsStatus(currentClassStudents);

  return (
    <div className="next-class-container">
      <div className="clock-container">
        <Clock />
      </div>
      <div
        className={`next-class box ${
          lightMode
            ? "light-bg-primary light-box-shadow"
            : "dark-bg-primary dark-box-shadow"
        }`}
      >
        <img
          src={icon ? icon : logo}
          style={{ width: "30px" }}
          alt="next class icon"
        />
        <p style={{ margin: "6px" }}>
          <strong>{title}</strong>
          <br />
          starts at {start_time}
          <br />
          Signed up: {totalCount}
        </p>
      </div>
    </div>
  );
};

export default NextClass;
