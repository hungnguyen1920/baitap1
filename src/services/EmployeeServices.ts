import { useEffect, useState } from "react";
import { Employee } from "../types/Employee";

export class EmployeeServices {
  public async getEmployees(): Promise<Employee[]> {
    try {
      const response = await fetch("http://blackntt.net:88/api/v1/employees");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Employee[] = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      throw error;
    }
  }

  public async getEmployeeById(id: number): Promise<Employee> {
    try {
      const response = await fetch(
        `http://blackntt.net:88/api/v1/employee/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Employee = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch employee:", error);
      throw error;
    }
  }

  public async createEmployee(employee: Employee): Promise<Employee> {
    try {
      const response = await fetch("http://blackntt.net:88/api/v1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Employee = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create employee:", error);
      throw error;
    }
  }

  public async updateEmployee(employeeId: number): Promise<Employee> {
    try {
      const response = await fetch(
        `http://blackntt.net:88/api/v1/update/${employeeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeId),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Employee = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to update employee:", error);
      throw error;
    }
  }

  public async deleteEmployee(employeeId: number): Promise<void> {
    try {
      const response = await fetch(
        `http://blackntt.net:88/api/v1/delete/${employeeId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to delete employee:", error);
      throw error;
    }
  }
}

const employeeServices = new EmployeeServices();
export default employeeServices;
