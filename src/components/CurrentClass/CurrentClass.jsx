import "./CurrentClass.css";
import { useCheckInContext } from "../../context/CheckInContext";
import {
  filterStudentsByClass,
  checkStudentsStatus,
} from "../../utils/studentSorting";

const CurrentClass = () => {
  const { students, currentClassData } = useCheckInContext();

  const {
    title = "Classes unavailable",
    description,
    icon,
    id,
  } = currentClassData || {};
  const currentClassStudents = filterStudentsByClass(students, id);
  const { totalCount, checkedIn } = checkStudentsStatus(currentClassStudents);

  return (
    <div className="current-class-container box">
      <div className="title-container">
        <img
          src={icon}
          className={icon ? "current-icon" : 'hide'}
          alt="current class icon"
        />
        <h1 className="title">{title}</h1>
      </div>
      <p>{description}</p>
      <p>
        Signed up: <strong>{totalCount}</strong> / Checked in:{" "}
        <strong>{checkedIn.length}</strong>
      </p>
    </div>
  );
};

export default CurrentClass;
