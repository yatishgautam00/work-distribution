'use client';

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
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
          setIsAuthorized(false);
          router.push("/"); // Redirect to login page if not logged in
          return;
        }

        const employeeList = data.filter((user) => user.role === "employee");
        setEmployees(employeeList);
        setIsAuthorized(true);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setIsAuthorized(false);
        router.push("/"); // Redirect to login page on error
      }
    };

    fetchEmployees();

    // Polling every 30 seconds instead of 5 seconds
    const intervalId = setInterval(fetchEmployees, 30000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [router]);

  if (!isAuthorized) {
    return <div className="text-center">Loading...</div>; // Optionally, display a loading spinner or message
  }

  return (
    <div className="flex w-full md:px-20 px-2 justify-center items-center py-12">
      <div className="p-4 bg-white rounded-xl h-full border-t-8 w-full border-t-blue-400 shadow-lg">
        <h2 className="text-2xl mb-4 flex w-full justify-center">Work List</h2>

        <Table>
          <TableCaption>A list of work assigned to employees.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">Employee</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center hidden md:table-cell">Age</TableHead>
              <TableHead className="text-center">Work</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">No employees found.</TableCell>
              </TableRow>
            ) : (
              employees.map((user) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
