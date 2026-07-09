import { Loader2Icon, LogInIcon, LogOut } from "lucide-react";
import React, { useState } from "react";

const CheckInButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAction();
    }, 1000);
  };

  if (todayRecord?.checkOut) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-8 bg-slate-50 border border-green-200 rounded-2xl text-center">
        <h3 className="text-lg font-bold text-slate-900">Work Day Completed</h3>
        <p>Great Job! See you tomorrow.</p>
      </div>
    );
  }
  const isCheckedIn = !!todayRecord?.checkedIn;
  return (
    <div className="absolute bottom-4 right-4 flex flex-col z-1">
      <button
        onClick={handleAttendance}
        disabled={loading}
        className={`w-full max-w-xs flex justify-between items-center gap-8 p-4 rounded-xl bg-linear-to-br text-white ${isCheckedIn ? "from-slate-700 to-slate-900" : "from-indigo-600 to-indigo-700"}`}
      >
        {loading ? (
          <Loader2Icon className="animate-spin size-7" />
        ) : isCheckedIn ? (
          <LogOut className="size-7" />
        ) : (
          <LogInIcon className="size-7" />
        )}
        <div className="relative flex flex-col items-center text-center">
          <h2 className="text-lg font-medium">
            {loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}
          </h2>
          <p className="text-xs opacity-80">
            {isCheckedIn ? "click to end your shift" : "Start your work day"}
          </p>
        </div>
      </button>
    </div>
  );
};

export default CheckInButton;
