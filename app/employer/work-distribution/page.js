"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

const WORK_TYPES = ["Web Dev", "Android Dev", "Frontend", "Backend","Social Media","Management"];

export default function WorkDistribution() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedWork, setSelectedWork] = useState("");
  const [action, setAction] = useState("allocate"); // 'allocate' or 'deallocate'
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(true);

  const fetchEmployees = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();

    // Check user role from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "employer") {
      setIsAuthorized(false);
      router.push("/"); // Redirect to home if not authorized
      return;
    }

    // Filter to show only employees
    const employeeList = data.filter((user) => user.role === "employee");
    setEmployees(employeeList);
  };

  useEffect(() => {
    fetchEmployees();
  }, [router]);

  const handleAction = async () => {
    const response = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: selectedEmployee,
        work: selectedWork,
        action,
      }),
    });
  
    if (response.ok) {
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.email === selectedEmployee
            ? { ...employee, work: action === "allocate" ? selectedWork : "" }
            : employee
        )
      );
      toast.success(
        `Work ${action === "allocate" ? "Allocated" : "Deallocated"}`
      );
    } else {
      toast.error("Something went wrong, please try again.");
    }
  
    setAction("allocate"); // Reset action to default
    setSelectedEmployee("");
    setSelectedWork("");
  };
  // UseEffect to refresh the employee list when work is allocated or deallocated
  useEffect(() => {
    if (selectedEmployee && selectedWork) {
      fetchEmployees();
    }
  }, [selectedEmployee, selectedWork]);

  const handleEditClick = (email, work) => {
    setSelectedEmployee(email);
    setSelectedWork(work || ""); // Set work if already assigned
  };

  if (!isAuthorized) return null; // Optionally, you can display a loading spinner here

  return (
    <div className="flex w-full md:px-20 px-2 justify-center items-center py-12">
      <div className="p-4 bg-white rounded-xl h-full border-t-8 w-full border-t-blue-400 shadow-lg">
        <h2 className="text-2xl mb-4 flex w-full justify-center">Work List</h2>

        <Table>
          <TableCaption>A list of work Assigned Employees.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">Employee</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center hidden md:table-cell">
                Age
              </TableHead>
              <TableHead className="text-right "> <span className="pr-4">Work Assignment</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((user) => (
              <TableRow key={user.email} className="mb-4 p-2 border rounded">
                <TableCell className="font-medium truncate">
                  {user.name}
                </TableCell>
                <TableCell className="text-center truncate max-w-[120px]">
                  {user.email}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {user.age}
                </TableCell>
                <TableCell className="text-center  flex flex-row justify-end items-center  ">
                  <span
                    className={`${
                      user.work
                        ? "bg-blue-100 px-3 py-1 rounded-xl font-medium text-blue-800"
                        : ""
                    } `}
                  >
                    {user.work || "No Work Assigned"}
                  </span>
                  <Popover className=" justify-items-end ">
                    <PopoverTrigger className="pl-3 text-right">
                      <Button
                        onClick={() => handleEditClick(user.email, user.work)}
                      >
                        Edit
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className=" bg-white rounded p-2">
                        <h2 className="text-xl font-medium text-blue-500 mb-4">
                          {user.name}
                        </h2>
                        <Select
                          value={selectedWork}
                          onValueChange={(value) => setSelectedWork(value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a work type" />
                          </SelectTrigger>
                          <SelectContent>
                            {WORK_TYPES.map((work) => (
                              <SelectItem key={work} value={work}>
                                {work}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="mb-4 flex flex-row gap-3 pt-4 w-full ">
                          <Button
                            variant="outline"
                            className={` bg-white text-black w-full py-2 px-4 rounded  hover:border-blue-200 ${
                              action === "allocate"
                                ? "border-2 border-blue-500"
                                : ""
                            }`}
                            style={{ backgroundColor: "white" }}
                            onClick={() => setAction("allocate")}
                          >
                            Allocate
                          </Button>
                          <Button
                            variant="outline"
                            className={`bg-white text-black w-full py-2 px-4 rounded hover:border-blue-200 ${
                              action === "deallocate"
                                ? "border-2 border-blue-500"
                                : ""
                            }`}
                            onClick={() => setAction("deallocate")}
                            style={{ backgroundColor: "white" }}
                          >
                            Deallocate
                          </Button>
                        </div>
                        <Button
                          className="bg-blue-600 hover:bg-blue-500 text-white font-medium  px-4 rounded"
                          onClick={handleAction}
                        >
                          Confirm
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
