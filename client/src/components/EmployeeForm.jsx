import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DEPARTMENTS } from "../assets/assets";
import { Loader2Icon } from "lucide-react";

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isEditMode = !!initialData;
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl animate-fade-in"
    >
      {/* personal info */}
      <div className="card p-5 sm:p-6">
        <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div className="">
            <label className="block mb-2 font-medium" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              required
              defaultValue={initialData?.firstName}
              className="w-full"
            />
          </div>
          <div className="">
            <label className="block mb-2 font-medium" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              required
              defaultValue={initialData?.lastName}
              className="w-full"
            />
          </div>
          <div className="">
            <label className="block mb-2 font-medium" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              required
              defaultValue={initialData?.phone}
              className="w-full"
            />
          </div>
          <div className="">
            <label className="block mb-2 font-medium" htmlFor="joinDate">
              Join Date
            </label>
            <input
              type="date"
              name="joinDate"
              required
              defaultValue={
                initialData?.joinDate
                  ? new Date(initialData.joinDate).toISOString().split("T")[0]
                  : ""
              }
              className="w-full"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 font-medium" htmlFor="bio">
              Bio (optional)
            </label>
            <textarea
              name="bio"
              defaultValue={initialData?.bio}
              rows={3}
              placeholder="Write a brief description..."
              className="w-full resize-none"
            />
          </div>
        </div>
      </div>
      {/* Employment Details */}
      <div className="card p-5 sm:p-6">
        <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Employment Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div className="">
            <label className="block mb-2 font-medium" htmlFor="position">
              Department
            </label>
            <select
              name="department"
              defaultValue={initialData?.department || ""}
              className="w-full"
            >
              <option value="">Select a department</option>
              {DEPARTMENTS.map((deptName) => (
                <option key={deptName} value={deptName}>
                  {deptName}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label className="block mb-2 font-medium" htmlFor="department">
              position
            </label>
            <input
              type="text"
              name="position"
              required
              defaultValue={initialData?.position}
              className="w-full"
            />
          </div>
          <div className="">
            <label className="block mb-2 font-medium" htmlFor="department">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.basicSalary || 0}
              className="w-full"
            />
          </div>
          <div className="">
            <label className="block mb-2 font-medium" htmlFor="department">
              Allowances
            </label>
            <input
              type="number"
              name="allowances"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.allowances || 0}
              className="w-full"
            />
          </div>
          <div className="">
            <label className="block mb-2 font-medium" htmlFor="department">
              Deductions
            </label>
            <input
              type="number"
              name="deductions"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.deductions || 0}
              className="w-full"
            />
          </div>
          {isEditMode && (
            <div className="">
              <label className="block mb-2 font-medium" htmlFor="department">
                Status
              </label>
              <select
                name="EmployeeStatus"
                defaultValue={initialData?.EmployeeStatus}
                className="w-full"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>
      {/* Account settings */}
      <div className="card p-5 sm:p-6">
        <h3 className=" text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
          Account Setup
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
          <div className="sm:col-span-2">
            <label className="block mb-2 font-medium" htmlFor="firstName">
              Work Email
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue={initialData?.email}
              className="w-full"
            />
          </div>
          {!isEditMode && (
            <div className="">
              <label className="block mb-2 font-medium" htmlFor="firstName">
                Temporary Password
              </label>
              <input
                type="password"
                name="temporaryPassword"
                required
                className="w-full"
              />
            </div>
          )}
          {isEditMode && (
            <div className="">
              <label className="block mb-2 font-medium" htmlFor="firstName">
                Change password (optional)
              </label>
              <input
                type="password"
                name="Password"
                placeholder="Leave blank to keep current password"
                className="w-full"
              />
            </div>
          )}
          <div className="">
            <label className="block mb-2 font-medium" htmlFor="lastName">
              System Role
            </label>
            <select
              name="role"
              defaultValue={initialData?.role || "EMPLOYEE"}
              className="w-full"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="">
            <label className="block mb-2 font-medium" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              required
              defaultValue={initialData?.phone}
              className="w-full"
            />
          </div>
          <div className="">
            <label className="block mb-2 font-medium" htmlFor="joinDate">
              Join Date
            </label>
            <input
              type="date"
              name="joinDate"
              required
              defaultValue={
                initialData?.joinDate
                  ? new Date(initialData.joinDate).toISOString().split("T")[0]
                  : ""
              }
              className="w-full"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 font-medium" htmlFor="bio">
              Bio (optional)
            </label>
            <textarea
              name="bio"
              defaultValue={initialData?.bio}
              rows={3}
              placeholder="Write a brief description..."
              className="w-full resize-none"
            />
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center justify-center"
        >
          {loading && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
          {isEditMode ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
