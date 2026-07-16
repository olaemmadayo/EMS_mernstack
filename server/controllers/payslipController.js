import Employee from "../models/Employee.js";
import Payslip from "../models/Payslip.js";

//create payslip
//POST /api/payslips
export const createPayslip = async (req, res) => {
  try {
    const { employeeId, month, year, basicSalary, allowances, deductions } =
      req.body;
    if (
      !employeeId ||
      month === undefined ||
      year === undefined ||
      basicSalary === undefined ||
      basicSalary === null ||
      basicSalary === ""
    ) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const monthNumber = Number(month);
    const yearNumber = Number(year);
    const basicSalaryNumber = Number(basicSalary);
    const allowancesNumber = Number(allowances || 0);
    const deductionsNumber = Number(deductions || 0);

    if (
      !Number.isInteger(monthNumber) ||
      monthNumber < 1 ||
      monthNumber > 12 ||
      !Number.isInteger(yearNumber) ||
      yearNumber < 1 ||
      !Number.isFinite(basicSalaryNumber) ||
      !Number.isFinite(allowancesNumber) ||
      !Number.isFinite(deductionsNumber) ||
      basicSalaryNumber < 0 ||
      allowancesNumber < 0 ||
      deductionsNumber < 0
    ) {
      return res.status(400).json({ error: "Invalid payslip values" });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee || employee.isDeleted) {
      return res.status(404).json({ error: "Active employee not found" });
    }

    const netSalary =
      basicSalaryNumber + allowancesNumber - deductionsNumber;

    const payslip = await Payslip.create({
      employeeId,
      month: monthNumber,
      year: yearNumber,
      basicSalary: basicSalaryNumber,
      allowances: allowancesNumber,
      deductions: deductionsNumber,
      netSalary,
    });
    return res.json({ success: true, data: payslip });
  } catch (error) {
    return res.status(500).json({ error: "failed" });
  }
};
//get payslip
//GET /api/payslips
export const getPayslips = async (req, res) => {
  try {
    const session = req.session;
    const isAdmin = session.role === "ADMIN";
    if (isAdmin) {
      const payslips = await Payslip.find()
        .populate("employeeId")
        .sort({ createdAt: -1 });
      const data = payslips.map((p) => {
        const obj = p.toObject();
        return {
          ...obj,
          id: obj._id.toString(),
          employee: obj.employeeId,
          employeeId: obj.employeeId?._id?.toString(),
        };
      });
      return res.json({ data });
    } else {
      const employee = await Employee.findOne({ userId: session.userId });
      if (!employee) return res.status(404).json({ error: "Not found" });
      if (employee.isDeleted) {
        return res.status(403).json({ error: "Your account is deactivated" });
      }
      const payslips = await Payslip.find({ employeeId: employee._id }).sort({
        createdAt: -1,
      });
      return res.json({ data: payslips });
    }
  } catch (error) {
    return res.status(500).json({ error: "failed" });
  }
};

//get payslip by ID
//GET /api/payslips/:id
export const getPayslipById = async (req, res) => {
  try {
    const session = req.session;
    const query = { _id: req.params.id };

    if (session.role !== "ADMIN") {
      const employee = await Employee.findOne({
        userId: session.userId,
        isDeleted: { $ne: true },
      });
      if (!employee) {
        return res.status(403).json({ error: "Employee access is unavailable" });
      }
      query.employeeId = employee._id;
    }

    const payslip = await Payslip.findOne(query)
      .populate("employeeId")
      .lean();
    if (!payslip) return res.status(404).json({ error: "Not found" });
    const result = {
      ...payslip,
      id: payslip._id.toString(),
      employee: payslip.employeeId,
    };
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "failed" });
  }
};
