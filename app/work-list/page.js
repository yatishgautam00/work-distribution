"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function WorkList() {
  const [employees, setEmployees] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();

      // Check user role from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        setIsAuthorized(false);
        router.push("/"); // Redirect to login page if not logged in
        return;
      }

      // Filter to show only employees
      const employeeList = data.filter((user) => user.role === "employee");
      setEmployees(employeeList);
      setIsAuthorized(true);
    };

    fetchEmployees();

    // Polling every 5 seconds
    const intervalId = setInterval(fetchEmployees, 5000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [router]);

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
              <TableHead className="text-center hidden md:table-cell">Age</TableHead>
              <TableHead className="text-center">Work</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((user) => (
              <TableRow key={user.email}>
                <TableCell className="font-medium truncate">{user.name}</TableCell>
                <TableCell className="text-center truncate max-w-[120px]">{user.email}</TableCell>
                <TableCell className="text-center hidden md:table-cell">{user.age}</TableCell>
                <TableCell className="text-center truncate">
                  <span className={`${user.work ? "bg-blue-100 px-3 py-1 rounded-xl font-medium text-blue-700" : ""}`}>
                    {user.work || "No Work Assigned"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
