import CheckInButton from "../components/attendance/CheckInButton";
import Loading from "../components/Loading";
import { useState, useEffect, useCallback } from "react";
import { dummyAttendanceData } from "../assets/assets";
import AttendanceStats from "../components/attendance/AttendanceStats";
import AttendanceHistory from "../components/attendance/AttendanceHistory";

const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    setHistory(dummyAttendanceData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
  const todayRecords = history.find(
    (r) => new Date(r.date).setHours(0, 0, 0, 0) === today.toDateString(),
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">
          track your work hours and daily checking
        </p>
      </div>
      {isDeleted ? (
        <div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
          <p className="text-sm text-rose-600">
            You can no longer clock in or out because your employee records have
            been deleted. Please contact your administrator for further
            assistance.
          </p>
        </div>
      ) : (
        <div className="mb-8">
          <CheckInButton todayRecord={todayRecords} onAction={fetchData} />
        </div>
      )}

      <AttendanceStats history={history} />
      <AttendanceHistory history={history} />
    </div>
  );
};

export default Attendance;
